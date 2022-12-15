import { Session, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { playerMovementDataDto } from './dto/player.dto';
import { WsExceptionFilter } from './filter/ws.filter';
import { movementValidationPipe } from './pipes/movement.pipe';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { signupDataDto } from 'src/auth/dto/user-data.dto';
import { Cron } from '@nestjs/schedule';
import { sleepySocket } from './socket.type';
import { v1 } from 'uuid';
import {
  directionOptions,
  stateOptions,
  userStateOptions,
  initPositionByRoomName,
} from './enum/player.enum';

@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  pingInterval: 5000,
  pingTimeout: 3000,
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  socketIdByUser = new Map();
  walkCountByUser = new Map();

  constructor(
    private readonly authService: AuthService,
    private event: EventEmitter2
  ) {}

  /** room 안의 유저들을 불러옵니다. */
  public getRoomUserData(roomName: string) {
    const roomUser = [];
    if (!this.server.sockets.adapter.rooms.has(roomName)) return [];
    this.server.sockets.adapter.rooms.get(roomName).forEach(socketId => {
      roomUser.push(this.server.sockets.sockets.get(socketId)['userData']);
    });

    return roomUser;
  }

  public handleConnection(client: sleepySocket): void {
    const key = client.handshake?.headers?.authorization;
    const roomName = client.handshake?.headers?.room;
    const userData = this.authService.verify(key);
    if (!userData || !roomName) {
      client.disconnect();
      return;
    }

    if (this.socketIdByUser.get(userData.id)) {
      this.server.sockets.sockets
        .get(this.socketIdByUser.get(userData.id))
        .disconnect();
    }

    client.userData = {
      ...userData,
      x: 800,
      y: 800,
      direction: directionOptions.RIGHT,
      state: stateOptions.WAIT,
      userState: userStateOptions.ON,
      walk: this.walkCountByUser.get(userData.id) / 10 || 0,
      roomName: roomName + '',
      callingRoom: '',
    };

    this.socketIdByUser.set(userData.id, client.id);
    client.join(roomName);
    client.to(roomName).emit('userCreated', client.userData);
    this.server
      .to(client.id)
      .emit('userInitiated', this.getRoomUserData(roomName + ''));
  }

  public handleDisconnect(client: sleepySocket): void {
    this.server.emit('userLeaved', client.userData);
    this.event.emit('walkSave', client.userData);
    this.socketIdByUser.delete(client.userData.id);
  }

  @Cron('58 23 * * *', { name: 'walkSaveScheduler' })
  walkSaveScheduler() {
    this.event.emit('saveWalkCount', [...this.walkCountByUser]);
    this.walkCountByUser.clear();
  }

  @SubscribeMessage('userDataChanged')
  handleUserDataChanged(
    @ConnectedSocket() client: sleepySocket,
    @MessageBody(ValidationPipe) payload: signupDataDto
  ) {
    client.userData = { ...client.userData, ...payload };
    client
      .to(client.userData.roomName)
      .emit('userDataChanged', client.userData);
  }

  @SubscribeMessage('getUserState')
  handleGetUserState(client: sleepySocket, payload) {
    const { targetUserId } = payload;
    const targetUserSocket = this.server.sockets.sockets.get(
      this.socketIdByUser.get(targetUserId)
    );
    return targetUserSocket ? targetUserSocket['userData']['userState'] : 'off';
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('move')
  handleMove(
    @ConnectedSocket() client: sleepySocket,
    @MessageBody(movementValidationPipe)
    payload: playerMovementDataDto
  ) {
    this.walkCountByUser.set(
      client.userData.id,
      (this.walkCountByUser.get(client.userData.id) ?? 0) + 1
    );
    client.userData.walk = Math.floor(
      this.walkCountByUser.get(client.userData.id) / 10
    );
    client.userData = { ...client.userData, ...payload };
    this.server.to(client.userData.roomName).emit('move', client.userData);
  }

  @SubscribeMessage('publicChat')
  handleMessage(client: sleepySocket, payload: any): void {
    const msgPayload = {
      fromUserId: client.userData.id,
      nickname: client.userData.nickname,
      timestamp: Date.now(),
      message: payload.message || '',
    };

    client.to(client.userData.roomName).emit('publicChat', msgPayload);
  }

  @SubscribeMessage('privateChat')
  handleDirectMessage(client: sleepySocket, payload: any): void {
    const { targetUserId, message } = payload;

    const msgPayload = {
      fromUserId: client.userData.id,
      nickname: client.userData.nickname,
      timestamp: Date.now(),
      message: message || '',
    };
    this.event.emit('saveChat', { ...msgPayload, targetUserId });

    client
      .to(this.socketIdByUser.get(targetUserId))
      .emit('privateChat', msgPayload);
  }

  @SubscribeMessage('chatRoomEntered')
  handleChatRoomEntered(client: sleepySocket, payload: any) {
    this.event.emit('createChatRoom', {
      fromUserId: client.userData.id,
      ...payload,
    });
  }

  @SubscribeMessage('chatRoomLeaved')
  handleChatRoomLeaved(client: sleepySocket, payload: any) {
    this.event.emit('leaveChatRoom', {
      fromUserId: client.userData.id,
      ...payload,
    });
  }

  @SubscribeMessage('callRequested')
  handleCallRequested(client: sleepySocket, payload: any) {
    //  프론트가 통화중인 상태였다면, 이미 갖고있는 uuid를 보내주고, 아니면 새로 생성해서 보내줌
    // uuid와 callee 필요!!
    const { calleeUserId, callingRoom } = payload;
    const callerUserId = client.userData.id;
    const callerSocket = client;
    const calleeSocket = this.server.sockets.sockets.get(
      this.socketIdByUser.get(calleeUserId)
    );

    // on, off, busy, callRequesting
    callerSocket.join(callingRoom);
    calleeSocket.join(callingRoom);

    // 두 사람의 상태 변경
    callerSocket.userData.userState = userStateOptions.BUSY;
    calleeSocket['userData']['userState'] = userStateOptions.CALL_REQUESTING;
    // 두사람의 전화중인 room 변경
    callerSocket.userData.callingRoom = callingRoom;
    calleeSocket['userData']['callingRoom'] = callingRoom;

    // 받는 사람한테, 전화오고 있다고 알림
    callerSocket.to(calleeSocket.id).emit('callRequested', {
      callerUserId,
      callerNickname: callerSocket.userData.nickname,
      callingRoom,
    });

    // 모두에게 두 사람이 전화 중이라고 알리기
    this.server.to(client.userData.roomName).emit('userStateChanged', {
      userIdList: [calleeUserId, callerUserId],
      userState: 'busy',
    });
    // 해당 방에 callingRoom 변화 감지
    this.server.to(callingRoom).emit('callingRoomUserStateChanged', {
      callingRoomUserData: this.getRoomUserData(callingRoom),
    });
  }

  // 건 사람이 마음 바뀜 끊음. => 상대방만 on으로 변경
  @SubscribeMessage('callCanceled')
  handleCallCanceled(client: sleepySocket, payload: any) {
    const { calleeUserId } = payload;
    const callerUserId = client.userData.id;
    const callerSocket = client;
    const calleeSocket = this.server.sockets.sockets.get(
      this.socketIdByUser.get(calleeUserId)
    );

    callerSocket.to(calleeSocket.id).emit('callCanceled', {
      callerUserId,
      callerNickname: callerSocket.userData.nickname,
    });
  }

  @SubscribeMessage('callLeaved')
  handleCallLeaved(client: sleepySocket) {
    const leavingUserId = client.userData.id;
    const callingRoom = client.userData.callingRoom;

    client.leave(callingRoom);
    client.userData.callingRoom = '';

    // 전 세계 사람들에게 알려주기
    this.server.to(client.userData.roomName).emit('userStateChanged', {
      userIdList: [leavingUserId],
      userState: 'on',
    });
    // 해당 방에 callingRoom 변화 감지
    this.server.to(callingRoom).emit('callingRoomUserStateChanged', {
      callingRoomUserData: this.getRoomUserData(callingRoom),
    });
  }

  @SubscribeMessage('callRejected')
  handleCallRejected(client: sleepySocket, payload: any) {
    const { callerUserId } = payload;
    const calleeUserId = client.userData.id;
    const calleeSocket = client;
    const callerSocketId = this.socketIdByUser.get(callerUserId);

    calleeSocket.to(callerSocketId).emit('callRejected', {
      calleeUserId,
      calleeNickname: calleeSocket.userData.nickname,
    });
  }

  // 전화 수락!!
  @SubscribeMessage('callEntered')
  handleCallEntered(client: sleepySocket, payload: any) {
    const { callerUserId } = payload;
    const calleeUserId = client.userData.id;
    const calleeSocket = client;
    const callerSocket = this.server.sockets.sockets.get(
      this.socketIdByUser.get(callerUserId)
    );
    const callingRoom = client.userData.callingRoom;

    client.userData.userState = userStateOptions.BUSY;

    // 상대방에게 받았다는 것을 일려주기 위한 것
    calleeSocket.to(callerSocket.id).emit('callEntered', {
      calleeUserId,
    });

    client.to(callingRoom).emit('newbieEntered', {
      newbieId: calleeUserId,
    });

    this.server.to(callingRoom).emit('callingRoomUserStateChanged', {
      callingRoomUserData: this.getRoomUserData(callingRoom),
    });
  }

  @SubscribeMessage('disconnecting')
  handleDisconnecting(client: sleepySocket) {
    client.disconnect();
  }

  // socket.emit('newOffer', { offer, senderUserId: user.id, newbieId });
  @SubscribeMessage('newOffer')
  handleNewOffer(client: sleepySocket, payload: any) {
    const { offer, senderUserId, newbieId } = payload;

    this.server.to(this.socketIdByUser.get(newbieId)).emit('newOffer', {
      offer,
      senderUserId,
    });
  }

  // socket.emit('newAnswer', { answer, senderUserId });
  @SubscribeMessage('newAnswer')
  handleNewAnswer(client: sleepySocket, payload: any) {
    const { answer, senderUserId } = payload;
    this.server
      .to(this.socketIdByUser.get(senderUserId))
      .emit('remoteAnswer', { answer, newbieId: client.userData.id });
  }

  @SubscribeMessage('newIce')
  handleNewIce(client: sleepySocket, payload: any) {
    ``;
    const callingRoom = client.userData.callingRoom;

    const { iceCandidates } = payload;
    client.to(callingRoom).emit('remoteIce', { iceCandidates });
  }
  // 미니게임 친구들과 함께 하기 지정방!

  @SubscribeMessage('createNewGameRoom')
  handleCreateNewGameRoom(client: sleepySocket, payload: any) {
    const { gameRoomId } = payload;
    // 방장이 방을 만들어서 타운에서 대기하고 있고! 이 방에 대기를 거는 사람들을 계속 뿌려줘야함!
    client.join(gameRoomId);
    this.server.to(gameRoomId).emit('gameRoomUserListChanged', {
      userList: this.getRoomUserData(gameRoomId),
    });
  }

  @SubscribeMessage('joinGameRoom')
  handleJoinGameRoom(client: sleepySocket, payload: any) {
    const { gameRoomId } = payload;
    const gameRoom = this.server.sockets.adapter.rooms.get(gameRoomId);
    if (gameRoom && gameRoom.size < 4) {
      // 잘 들어갔다고 알려줄거야
      client.join(gameRoomId);
      this.server.to(client.id).emit('gameAlert', {
        status: 'JOIN_ROOM_SUCCESS',
        message: gameRoomId,
      });
      this.server.to(gameRoomId).emit('gameRoomUserListChanged', {
        userList: this.getRoomUserData(gameRoomId),
      });
    } else {
      this.server.to(client.id).emit('gameAlert', {
        status: 'ROOM_NOT_EXIST',
        message: '해당하는 방이 없습니다.',
      });
    }
  }

  public roomChange(
    userSocketId: string,
    prevRoomName: string,
    nextRoomName: string,
    nextRoomType: string
  ): void {
    const user = this.server.sockets.sockets.get(userSocketId);
    user.join(nextRoomName);
    user.leave(prevRoomName);

    this.server.to(prevRoomName).emit('userLeaved', user['userData']);
    user['userData'] = {
      ...user['userData'],
      x: initPositionByRoomName[nextRoomType].x,
      y: initPositionByRoomName[nextRoomType].y,
      roomName: nextRoomName,
    };

    this.server.to(nextRoomName).emit('userCreated', user['userData']);
    this.server
      .to(userSocketId)
      .emit('userInitiated', this.getRoomUserData(nextRoomName + ''));
  }

  @SubscribeMessage('readyGame')
  handlereadyGame(client: sleepySocket, payload: any) {
    const { gameRoomId } = payload;

    // 게임 룸으로 이동이되도, 서로 보이거나 하려면 그안에 가서도 userIni creatd ????
    this.server.to(gameRoomId).emit('gameAlert', {
      status: 'READY_GAME',
      message: '대기열 유저를 게임으로 전환시켜주세요.',
    });
  }

  @SubscribeMessage('startGame')
  handleStartGame(client: sleepySocket, payload: any) {
    console.log('startGame');
    const { gameRoomId, gameType } = payload;

    this.roomChange(client.id, 'town', gameRoomId, gameType);

    this.server.to(gameRoomId).emit('gameAlert', {
      status: 'START_GAME',
      message: '3초 뒤에 게임을 시작하세요.',
    });
    this.server.to(client.id).emit('move', client.userData);
  }

  // 게임 중에 한명이! 나가는 거
  @SubscribeMessage('leaveGame')
  handleLeaveGame(client: sleepySocket, payload: any) {
    const { gameRoomId } = payload;
    this.roomChange(client.id, gameRoomId, 'town', 'town');
  }

  // 게임 대기열에서 나감
  @SubscribeMessage('leaveGameWatingList')
  handleLeaveGameWatingList(client: sleepySocket, payload: any) {
    const { gameRoomId } = payload;

    client.leave(gameRoomId);
    this.server.to(gameRoomId).emit('gameRoomUserListChanged', {
      userList: this.getRoomUserData(gameRoomId),
    });
  }

  @SubscribeMessage('winnerEmitter')
  handleWinnerEmitter(client: sleepySocket, payload: any) {
    const { gameRoomId, gameType, gameTime } = payload;
    const winnerUserData = client.userData;

    const otherPlayerData = this.getRoomUserData(gameRoomId).filter(
      userData => userData.id != winnerUserData.id
    );

    this.server.to(gameRoomId).emit('finishGame', {
      winnerUserData,
      otherPlayerData,
      gameType,
      gameTime,
    });
  }

  @SubscribeMessage('enterRandomGameRoom')
  handleRandomEnterGameRoom(client: sleepySocket, payload: any) {
    const { gameType } = payload;
    const waitingRoomName = `waitingRoom_${gameType}`;
    client.join(waitingRoomName);
    // 게임별 랜덤 대기열에 추가해주고 있음!!
    // 게임별 랜덤 대기열에 이미 기다리고 있는 사람이 있을 수가 있으니까 ??? 이것도 안으로 브로드 캐스팅 필요
    // 우리가 갖고 있는 함수 쓰자!
    this.server.to(waitingRoomName).emit('gameRoomUserListChanged', {
      userList: this.getRoomUserData(waitingRoomName),
    });

    if (this.server.sockets.adapter.rooms.get(waitingRoomName).size >= 4) {
      const uuid = v1();
      this.server.to(waitingRoomName).emit('gameRoomUserListChanged', {});

      const { gameRoomId } = payload;

      // 게임 룸으로 이동이되도, 서로 보이거나 하려면 그안에 가서도 userIni creatd ????
      this.server.to(gameRoomId).emit('gameAlert', {
        status: 'READY_GAME',
        message: gameRoomId,
      });
    }
  }
}

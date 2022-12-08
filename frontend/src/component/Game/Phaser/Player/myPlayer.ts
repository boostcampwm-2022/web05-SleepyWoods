import { Socket } from 'socket.io-client';
import {
  sortHeldDirection,
  changePosition,
  changeState,
  calcMoveToPos,
  changeDirection,
} from '../../util';
import { Player } from './player';

export class MyPlayer extends Player {
  socket: Socket;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    id: string,
    hair: string,
    nickname: string,
    socket: Socket
  ) {
    super(scene, x, y, id, hair, nickname);

    this.socket = socket;

    if (this.character) {
      this.scene.cameras.main.startFollow(this.character, true);
    }
  }

  checkAndSetState(state: string, time: number = 0) {
    if (this.isChangeState) this.state = state;

    if (time) {
      this.isChangeState = false;
      setTimeout(() => (this.isChangeState = true), time);
    }
  }

  update() {
    const prevState = this.state;

    if (!this.isCanMove) {
      this.state = 'wait';
      this.scene.input.keyboard.removeAllKeys(true);
    } else {
      const cursors = this.scene.input.keyboard.createCursorKeys();
      const keyR = this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.R
      );
      const keyShift = this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SHIFT
      );
      const keySpace = this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );

      // motion
      if (keyR.isDown) {
        this.speed = 1.5;
        this.checkAndSetState('roll', 100);
      } else if (keyShift.isDown) {
        this.speed = 1.2;
        this.checkAndSetState('run');
      } else if (keySpace.isDown) {
        this.speed = 1;
        this.checkAndSetState('jump', 500);
      } else {
        this.speed = 1;
        this.checkAndSetState('walk');
      }

      sortHeldDirection(this, cursors);
      if (this.heldDirection.length) {
        const move: any = calcMoveToPos(this, this.heldDirection);
        this.getBody().setVelocity(move.x * this.speed, move.y * this.speed);

        if (move.x !== 0) {
          const direction = move.x > 0 ? 'right' : 'left';
          changeDirection(this, direction);
        }

        changePosition(this, move.x * this.speed, move.y * this.speed);
      } else {
        this.checkAndSetState('wait');
      }
    }

    if (prevState !== this.state) changeState(this);

    if (prevState !== this.state || this.heldDirection.length) {
      this.socket.emit('move', {
        state: this.state,
        direction: this.direction,
        x: this.x,
        y: this.y,
      });
    }
  }
}

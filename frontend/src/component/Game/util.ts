import { MyPlayer } from './Phaser/Player/myPlayer';
import { OtherPlayer } from './Phaser/Player/otherPlayer';

const responsiveness = 5;

export const actions = [
  'wait',
  'walk',
  'run',
  'roll',
  'jump',
  'attack',
  'swimming',
];

export const spriteInfo = [
  { action: 'wait', start: 1, end: 9 },
  { action: 'walk', start: 1, end: 8 },
  { action: 'run', start: 1, end: 8 },
  { action: 'roll', start: 2, end: 5 },
  { action: 'jump', start: 1, end: 9 },
  { action: 'attack', start: 1, end: 10 },
  { action: 'swimming', start: 1, end: 10 },
];

export const hairInfo = [
  'nohair',
  'longhair',
  'mophair',
  'shorthair',
  'spikeyhair',
  'bowlhair',
  'curlyhair',
];

export const changeState = (player: MyPlayer | OtherPlayer) => {
  if (!player.character || !player.hair || !player.dust || !player.tool) return;

  player.character.play(`character-${player.state}`);
  player.hair.play(`${player.hairName}-${player.state}`);

  if (player.state === 'run' || player.state === 'roll') {
    player.dust.visible = true;
    player.dust.play('dust');
  } else {
    player.dust.visible = false;
    player.dust.stop();
  }
  if (player.state === 'wait') {
    player.tool.visible = false;
    player.tool.stop();
  } else {
    player.tool.visible = true;
    player.tool.play(`tool-${player.state}`);
  }
};

export const changeDirection = (
  player: MyPlayer | OtherPlayer,
  direction: string
) => {
  if (!player.character || !player.hair || !player.dust || !player.tool) return;
  if (player.direction === direction) return;

  player.character.toggleFlipX();
  player.hair.toggleFlipX();
  player.dust.toggleFlipX();
  player.tool.toggleFlipX();

  player.direction = direction;
};

export const calcMoveToPos = (
  player: MyPlayer | OtherPlayer,
  dir: string[]
) => {
  if (!player.character || !player.hair || !player.dust || !player.tool) return;

  const move = { x: 0, y: 0 };
  const leftIdx = dir.indexOf('left');
  const rightIdx = dir.indexOf('right');
  const upIdx = dir.indexOf('up');
  const downIdx = dir.indexOf('down');

  if (leftIdx !== rightIdx) {
    move.x = leftIdx < rightIdx ? responsiveness : -responsiveness;
  }
  if (upIdx !== downIdx) {
    move.y = upIdx < downIdx ? responsiveness : -responsiveness;
  }

  if (move.x && move.y) {
    move.x /= Math.abs(1.3);
    move.y /= Math.abs(1.3);
  }

  return move;
};

export const changePosition = (
  player: MyPlayer | OtherPlayer,
  x: number,
  y: number
) => {
  if (
    !player.character ||
    !player.hair ||
    !player.dust ||
    !player.tool ||
    !player.nicknameText
  )
    return;

  player.x += x;
  player.y += y;

  player.character.setPosition(player.x, player.y);
  player.hair.setPosition(player.x, player.y);
  player.tool.setPosition(player.x, player.y);

  player.nicknameText.x = player.x - player.nickname.length * 3.5;
  player.nicknameText.y = player.y + 25;

  const editPosNum = player.direction === 'left' ? 25 : -25;
  player.dust.setPosition(player.x + editPosNum, player.y + 5);
};

export const sortHeldDirection = (player: MyPlayer, cursors: any) => {
  const directions = ['left', 'right', 'up', 'down'];

  directions.forEach((dir: string) => {
    const idx = player.heldDirection.indexOf(dir);

    if (cursors[dir].isDown && idx === -1) {
      player.heldDirection.push(dir);
    } else if (cursors[dir].isUp && idx > -1) {
      player.heldDirection.splice(idx, 1);
    }
  });
};

export const emitter = new Phaser.Events.EventEmitter();

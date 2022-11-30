const responsiveness = 5;

export const changeState = (player: any) => {
  if (!player.character || !player.hair) return;

  player.character.play(`character-${player.state}`);
  player.hair.play(`${player.hairName}-${player.state}`);

  if (player.state === 'run' || player.state === 'roll') {
    player.dust.visible = true;
    player.dust.play('dust');
  } else {
    player.dust.visible = false;
    player.dust.stop();
  }
};

export const changeDirection = (player: any, moveX: number) => {
  if (!player.character || !player.hair) return;
  if (player.direction === 'left' && moveX <= 0) return;
  if (player.direction === 'right' && moveX >= 0) return;

  player.character.toggleFlipX();
  player.hair.toggleFlipX();
  player.dust.toggleFlipX();

  player.direction = player.direction === 'left' ? 'right' : 'left';
};

export const calcMoveToPos = (player: any, dir: string[]) => {
  if (!player.character || !player.hair) return;

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

export const changePosition = (player: any, x: number, y: number) => {
  if (!player.character || !player.hair) return;

  player.x += x;
  player.y += y;

  changeDirection(player, x);

  player.character.setPosition(player.x, player.y);
  player.hair.setPosition(player.x, player.y);
  player.nicknameText.x = player.x - player.nickname.length * 3.5;
  player.nicknameText.y = player.y + 25;

  const editPosNum = player.direction === 'left' ? 25 : -25;
  player.dust.setPosition(player.x + editPosNum, player.y + 5);
};

export const sortHeldDirection = (scene: any, cursors: any) => {
  const directions = ['left', 'right', 'up', 'down'];

  directions.forEach((dir: string) => {
    const idx = scene.heldDirection.indexOf(dir);

    if (cursors[dir].isDown && idx === -1) {
      scene.heldDirection.push(dir);
    } else if (cursors[dir].isUp && idx > -1) {
      scene.heldDirection.splice(idx, 1);
    }
  });
};

export const emitter = new Phaser.Events.EventEmitter();

const responsiveness = 5;

export const changeState = (scene: any) => {
  if (!scene.character || !scene.hair) return;

  scene.character.play(`character-${scene.state}`);
  scene.hair.play(`hair-${scene.state}`);

  if (scene.state === 'run' || scene.state === 'roll') {
    scene.dust.visible = true;
    scene.dust.play('dust');
  } else {
    scene.dust.visible = false;
    scene.dust.stop();
  }
};

export const changeDirection = (scene: any, moveX: number) => {
  if (!scene.character || !scene.hair) return;
  if (scene.direction === 'left' && moveX <= 0) return;
  if (scene.direction === 'right' && moveX >= 0) return;

  scene.character.toggleFlipX();
  scene.hair.toggleFlipX();
  scene.dust.toggleFlipX();

  scene.direction = scene.direction === 'left' ? 'right' : 'left';
};

export const calcMoveToPos = (scene: any, dir: string[]) => {
  if (!scene.character || !scene.hair) return;

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

export const changePosition = (scene: any, x: number, y: number) => {
  if (!scene.character || !scene.hair) return;

  scene.x += x * scene.speed;
  scene.y += y * scene.speed;

  changeDirection(scene, x);
  scene.character.setPosition(scene.x, scene.y);
  scene.hair.setPosition(scene.x, scene.y);

  const editPosNum = scene.direction === 'left' ? 25 : -25;
  scene.dust.setPosition(scene.x + editPosNum, scene.y + 5);
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

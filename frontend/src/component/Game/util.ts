const responsiveness = 5;

const moveObj: { [key: string]: number[] } = {
  left: [-responsiveness, 0],
  right: [responsiveness, 0],
  up: [0, -responsiveness],
  down: [0, responsiveness],
};

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

export const changeDirection = (scene: any) => {
  if (!scene.character || !scene.hair) return;

  scene.character.toggleFlipX();
  scene.hair.toggleFlipX();
  scene.dust.toggleFlipX();

  scene.direction = scene.direction === 'left' ? 'right' : 'left';
};

export const changePosition = (scene: any, dir: string) => {
  if (!scene.character || !scene.hair) return;

  const [x, y] = moveObj[dir];
  scene.x += x * scene.speed;
  scene.y += y * scene.speed;

  scene.character.setPosition(scene.x, scene.y);
  scene.hair.setPosition(scene.x, scene.y);

  const editPosNum = scene.direction === 'left' ? 25 : -25;
  scene.dust.setPosition(scene.x + editPosNum, scene.y + 5);
};

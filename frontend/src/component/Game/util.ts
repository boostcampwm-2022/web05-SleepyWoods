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
};

export const changeDirection = (scene: any) => {
  if (!scene.character || !scene.hair) return;

  scene.character.toggleFlipX();
  scene.hair.toggleFlipX();

  scene.direction = scene.direction === 'left' ? 'right' : 'left';
};

export const changePosition = (scene: any, dir: string) => {
  if (!scene.character || !scene.hair) return;

  const [x, y] = moveObj[dir];
  scene.x += x * scene.speed;
  scene.y += y * scene.speed;

  scene.character.setPosition(scene.x, scene.y);
  scene.hair.setPosition(scene.x, scene.y);
};

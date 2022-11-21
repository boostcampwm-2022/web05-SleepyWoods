import { changeDirection, changePosition, changeState } from '../../util';

export class Player extends Phaser.GameObjects.Sprite {
  character: Phaser.GameObjects.Sprite | undefined;
  hair: Phaser.GameObjects.Sprite | undefined;
  state: string = 'right';
  direction: string = 'wait';
  x: number;
  y: number;
  speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'character');
    this.direction = 'right';
    this.state = 'wait';
    this.x = -25;
    this.y = 400;
    this.speed = 1;

    this.character = this.scene.add.sprite(this.x, this.y, 'character-wait');
    this.character.setScale(3);

    this.hair = this.scene.add.sprite(this.x, this.y, 'hair-wait');
    this.hair.setScale(3);

    changeState(this);

    this.scene.cameras.main.startFollow(this.character, true);
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys();
    const keyR = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    );
    const prevState = this.state;

    // motion
    if (keyR.isDown) {
      this.speed = 1.5;
      this.state = 'roll';
    } else {
      this.speed = 1;
      this.state = 'walk';
    }

    // direction
    if (cursors.left.isDown) {
      changePosition(this, 'left');
      if (this.direction === 'right') changeDirection(this);
    } else if (cursors.right.isDown) {
      changePosition(this, 'right');
      if (this.direction === 'left') changeDirection(this);
    } else if (cursors.up.isDown) {
      changePosition(this, 'up');
    } else if (cursors.down.isDown) {
      changePosition(this, 'down');
    } else this.state = 'wait';

    if (prevState !== this.state) changeState(this);
  }
}

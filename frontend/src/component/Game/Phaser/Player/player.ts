import { changeState } from '../../util';

export class Player extends Phaser.GameObjects.Sprite {
  character: Phaser.GameObjects.Sprite | undefined;
  hair: Phaser.GameObjects.Sprite | undefined;
  dust: Phaser.GameObjects.Sprite | undefined;
  direction: string;
  isChangeState: boolean;
  state: string;
  x: number;
  y: number;
  speed: number;
  heldDirection: string[];
  hairName: string;
  nickname: string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    hair: string,
    nickname: string
  ) {
    super(scene, 0, 0, 'character');
    this.direction = 'right';
    this.state = 'wait';
    this.isChangeState = true;
    this.hairName = hair;
    this.nickname = nickname;
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.heldDirection = [];

    this.character = this.scene.add.sprite(this.x, this.y, 'character-wait');
    this.character.setScale(3);

    this.hair = this.scene.add.sprite(this.x, this.y, 'hair-wait');
    this.hair.setScale(3);

    this.dust = this.scene.add.sprite(this.x - 20, this.y + 5, 'dust');
    this.dust.setScale(3);

    changeState(this);
  }
}

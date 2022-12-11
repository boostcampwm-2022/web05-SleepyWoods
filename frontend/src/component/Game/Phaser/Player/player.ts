import { changeState } from '../../util';

export class Player extends Phaser.Physics.Arcade.Sprite {
  character: Phaser.GameObjects.Sprite | undefined;
  hair: Phaser.GameObjects.Sprite | undefined;
  dust: Phaser.GameObjects.Sprite | undefined;
  tool: Phaser.GameObjects.Sprite | undefined;
  nicknameText: Phaser.GameObjects.Text | undefined;
  direction: string;
  isChangeState: boolean;
  isCanMove: boolean;
  isAttack: boolean;
  state: string;
  x: number;
  y: number;
  speed: number;
  heldDirection: string[];
  hairName: string;
  nickname: string;
  id: string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    id: string,
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
    this.id = id;
    this.isCanMove = true;
    this.isAttack = false;

    this.character = this.scene.add.sprite(this.x, this.y, 'character-wait');
    this.character.setScale(3);

    this.hair = this.scene.add.sprite(this.x, this.y, `${this.hairName}-wait`);
    this.hair.setScale(3);

    this.tool = this.scene.add.sprite(this.x, this.y, 'attackTool');
    this.tool.setScale(3);

    this.dust = this.scene.add.sprite(this.x - 20, this.y + 5, 'dust');
    this.dust.setScale(3);

    this.nicknameText = this.scene.add.text(
      this.x - this.nickname.length * 3.5,
      this.y + 25,
      this.nickname,
      {
        color: '#000',
        font: '700 14px Arial',
        align: 'center',
      }
    );

    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true).setSize(30, 50);

    changeState(this);
  }

  delete() {
    this.character?.destroy();
    this.hair?.destroy();
    this.tool?.destroy();
    this.nicknameText?.destroy();
    this.dust?.destroy();
  }

  updateNickname(nickname: string) {
    this.nicknameText?.setText(nickname);
  }

  updateHair(hair: string) {
    this.hairName = hair;
    changeState(this);
  }

  getBody() {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}

import { MyPlayer } from '../Phaser/Player/myPlayer';
import { OtherPlayer } from '../Phaser/Player/otherPlayer';

export default class Maze extends Phaser.Scene {
  background?: Phaser.Tilemaps.TilemapLayer;
  otherLayer?: Phaser.Tilemaps.TilemapLayer;
  myPlayer?: MyPlayer;
  otherPlayer: { [key: string]: OtherPlayer };

  constructor() {
    super('Maze');

    this.otherPlayer = {};
  }

  init(data: any) {
    this.myPlayer = new MyPlayer(
      this,
      1000,
      1500,
      data.myPlayer.id,
      data.myPlayer.hairName,
      data.myPlayer.nickname,
      data.socket
    );

    this.myPlayer.fixState(true, 'swimming', 1);
  }

  create() {
    this.cameras.main.setBounds(0, 0, 2000, 2000);

    const map = this.make.tilemap({ key: 'maze' });
    const tileset3 = map.addTilesetImage('tileset3', 'tileset3');

    map.createLayer('root', tileset3, 0, 0).setScale(2.5);
    this.background = map
      .createLayer('background', tileset3, 0, 0)
      .setScale(2.5);
    this.otherLayer = map.createLayer('other', tileset3, 0, 0).setScale(2.5);
    const goalLayer = map.createLayer('goal', tileset3, 0, 0).setScale(2.5);

    this.background.setCollisionByProperty({ collides: true });
    this.otherLayer.setCollisionByProperty({ collides: true });

    if (this.myPlayer) {
      this.physics.add.collider(this.myPlayer, this.background);
      this.physics.add.collider(this.myPlayer, this.otherLayer);
    }

    this.physics.world.setBounds(
      0,
      0,
      this.otherLayer.width * 2.5,
      this.otherLayer.height * 2.5
    );
  }

  update() {
    this.myPlayer?.update();
  }
}

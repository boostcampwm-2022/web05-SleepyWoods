import mazeJSON from '../../../assets/tilemaps/maze/maze.json';
import tileset3 from '../../../assets/tilemaps/maze/tileset3.png';
import { MyPlayer } from '../Phaser/Player/myPlayer';
import { OtherPlayer } from '../Phaser/Player/otherPlayer';

export default class Maze extends Phaser.Scene {
  backgroundLayer?: Phaser.Tilemaps.TilemapLayer;
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
  }

  preload() {
    this.load.tilemapTiledJSON('maze', mazeJSON);
    this.load.image('tileset3', tileset3);
  }

  create() {
    this.cameras.main.setBounds(0, 0, 2000, 2000);

    const map = this.make.tilemap({ key: 'maze' });
    const tileset3 = map.addTilesetImage('tileset3', 'tileset3');
    const rootLayer = map.createLayer('root', tileset3, 0, 0).setScale(2.5);
    const goalLayer = map.createLayer('goal', tileset3, 0, 0).setScale(2.5);
    this.backgroundLayer = map
      .createLayer('background', tileset3, 0, 0)
      .setScale(2.5);
    this.otherLayer = map.createLayer('other', tileset3, 0, 0).setScale(2.5);

    this.backgroundLayer.setCollisionByProperty({ collides: true });
    this.otherLayer.setCollisionByProperty({ collides: true });

    if (this.myPlayer) {
      this.physics.add.collider(this.myPlayer, this.backgroundLayer);
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

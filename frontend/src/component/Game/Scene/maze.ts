import townJSON from '../../../assets/tilemaps/town.json';
import town from '../../../assets/tilemaps/town.png';

export default class Maze extends Phaser.Scene {
  townLayer?: Phaser.Tilemaps.TilemapLayer;
  constructor() {
    super('Maze');
  }

  init(data: any) {
    console.log(data);
  }

  preload() {
    this.load.tilemapTiledJSON('map', townJSON);
    this.load.image('tileset', town);
  }

  create() {
    this.cameras.main.setBounds(0, 0, 2000, 2000);

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('town', 'tileset');
    this.townLayer = map.createLayer('town', tileset, 0, 0).setScale(2.5);
    this.townLayer.setCollisionByProperty({ collides: true });

    this.physics.world.setBounds(
      0,
      0,
      this.townLayer.width * 2.5,
      this.townLayer.height * 2.5
    );
  }
}

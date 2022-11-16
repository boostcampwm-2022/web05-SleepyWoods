export default class Game extends Phaser.Scene {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }

  preload() {
    this.load.image('background', './src/assets/background.png');
  }

  create() {
    this.add.image(200, 200, 'background').setScale(3);
  }

  update() {
    
  }
}

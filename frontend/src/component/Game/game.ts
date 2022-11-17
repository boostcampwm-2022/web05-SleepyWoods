const responsiveness = 5;
const moveObj: { [key: string]: number[] } = {
  left: [-responsiveness, 0],
  right: [responsiveness, 0],
  up: [0, -responsiveness],
  down: [0, responsiveness],
};

export default class Game extends Phaser.Scene {
  character: Phaser.GameObjects.Sprite | undefined;
  hair: Phaser.GameObjects.Sprite | undefined;
  state: string = 'right';
  direction: string = 'wait';
  x: number;
  y: number;
  temp: string;

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.character;
    this.hair;
    this.temp = 'right';
    this.direction = 'right';
    this.state = 'wait';
    this.x = -25;
    this.y = 400;
  }

  preload() {
    this.load.image('background', './src/assets/background.png');

    this.load.spritesheet(
      'character-wait',
      './src/assets/character/waiting/base_waiting_strip9.png',
      { frameWidth: 96, frameHeight: 64 }
    );

    this.load.spritesheet(
      'hair-wait',
      './src/assets/character/waiting/bowlhair_waiting_strip9.png',
      { frameWidth: 96, frameHeight: 64 }
    );

    this.load.spritesheet(
      'character-walk',
      './src/assets/character/walking/base_walk_strip8.png',
      { frameWidth: 96, frameHeight: 64 }
    );

    this.load.spritesheet(
      'hair-walk',
      './src/assets/character/walking/bowlhair_walk_strip8.png',
      { frameWidth: 96, frameHeight: 64 }
    );

    this.load.spritesheet(
      'character-roll',
      './src/assets/character/roll/base_roll_strip10.png',
      { frameWidth: 96, frameHeight: 64 }
    );

    this.load.spritesheet(
      'hair-roll',
      './src/assets/character/roll/bowlhair_roll_strip10.png',
      { frameWidth: 96, frameHeight: 64 }
    );
  }

  create() {
    this.add.image(0, 0, 'background').setScale(3);

    this.anims.create({
      key: 'character-wait',
      frames: this.anims.generateFrameNumbers('character-wait', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'hair-wait',
      frames: this.anims.generateFrameNumbers('hair-wait', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'character-walk',
      frames: this.anims.generateFrameNumbers('character-walk', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'hair-walk',
      frames: this.anims.generateFrameNumbers('hair-walk', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'character-roll',
      frames: this.anims.generateFrameNumbers('character-roll', {
        start: 0,
        end: 8,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'hair-roll',
      frames: this.anims.generateFrameNumbers('hair-roll', {
        start: 0,
        end: 8,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.character = this.add.sprite(-25, 400, 'character-wait');
    this.character.setScale(3);

    this.hair = this.add.sprite(-25, 400, 'hair-wait');
    this.hair.setScale(3);

    this.changeState();

    this.cameras.main.startFollow(this.character, true);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    const keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    const prevState = this.state;

    if (cursors.left.isDown) {
      this.state = 'walk';
      this.changePosition('left');
      if (this.direction === 'right') this.changeDirection();
      this.direction = 'left';
    } else if (cursors.right.isDown) {
      this.state = 'walk';
      this.changePosition('right');
      if (this.direction === 'left') this.changeDirection();
      this.direction = 'right';
    } else if (cursors.up.isDown) {
      this.state = 'walk';
      this.changePosition('up');
    } else if (cursors.down.isDown) {
      this.state = 'walk';
      this.changePosition('down');
    } else this.state = 'wait';

    if (keyR.isDown) {
      this.changePosition(this.temp);
      this.state = 'roll';
    }

    if (prevState !== this.state) this.changeState();
  }

  changeState() {
    if (!this.character || !this.hair) return;

    this.character.play(`character-${this.state}`);
    this.hair.play(`hair-${this.state}`);
  }

  changeDirection() {
    if (!this.character || !this.hair) return;

    this.character.toggleFlipX();
    this.hair.toggleFlipX();
  }

  changePosition(dir: string) {
    this.temp = dir;
    if (!this.character || !this.hair) return;

    const [x, y] = moveObj[dir];
    this.x += x;
    this.y += y;

    this.character.setPosition(this.x, this.y);
    this.hair.setPosition(this.x, this.y);
  }
}

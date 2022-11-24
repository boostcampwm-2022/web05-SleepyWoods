import {
  sortHeldDirection,
  changePosition,
  changeState,
  calcMoveToPos,
} from '../../util';
import { Player } from './player';

export class MyPlayer extends Player {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    if (this.character) {
      this.scene.cameras.main.startFollow(this.character, true);
    }
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys();
    const keyR = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    );
    const keyShift = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    const prevState = this.state;

    // motion
    if (keyR.isDown) {
      this.speed = 1.5;
      this.state = 'roll';
    } else if (keyShift.isDown) {
      this.speed = 1.2;
      this.state = 'run';
    } else {
      this.speed = 1;
      this.state = 'walk';
    }

    sortHeldDirection(this, cursors);
    if (this.heldDirection.length) {
      const move: any = calcMoveToPos(this, this.heldDirection);
      changePosition(this, move.x, move.y);
    } else this.state = 'wait';

    if (prevState !== this.state) changeState(this);
  }
}

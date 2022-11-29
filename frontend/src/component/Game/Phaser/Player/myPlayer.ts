import {
  sortHeldDirection,
  changePosition,
  changeState,
  calcMoveToPos,
} from '../../util';
import { Player } from './player';

export class MyPlayer extends Player {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    hair: string,
    nickname: string
  ) {
    super(scene, x, y, hair, nickname);

    if (this.character) {
      this.scene.cameras.main.startFollow(this.character, true);
    }
  }

  checkAndSetState(state: string, time: number = 0) {
    if (this.isChangeState) this.state = state;

    if (time) {
      this.isChangeState = false;
      setTimeout(() => (this.isChangeState = true), time);
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
    const keySpace = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    const prevState = this.state;

    // motion
    if (keyR.isDown) {
      this.speed = 1.5;
      this.checkAndSetState('roll', 100);
    } else if (keyShift.isDown) {
      this.speed = 1.2;
      this.checkAndSetState('run');
    } else if (keySpace.isDown) {
      this.speed = 1;
      this.checkAndSetState('jump', 500);
    } else {
      this.speed = 1;
      this.checkAndSetState('walk');
    }

    sortHeldDirection(this, cursors);
    if (this.heldDirection.length) {
      const move: any = calcMoveToPos(this, this.heldDirection);
      changePosition(this, move.x, move.y);
    } else {
      this.checkAndSetState('wait');
    }

    if (prevState !== this.state) changeState(this);
  }
}

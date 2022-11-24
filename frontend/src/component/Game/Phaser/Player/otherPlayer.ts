import { changePosition, changeState } from '../../util';
import { Player } from './player';

export class OtherPlayer extends Player {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
  }

  update(state: string, x: number, y: number) {
    const prevState = this.state;
    this.state = state;

    if (this.x !== x || this.y !== y) changePosition(this, x, y);
    if (prevState !== this.state) changeState(this);
  }
}

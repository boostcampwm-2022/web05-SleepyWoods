import { changePosition, changeState } from '../../util';
import { Player } from './player';

export class OtherPlayer extends Player {
  constructor(scene: Phaser.Scene, data: any) {
    super(scene, data.x, data.y, data.id, data.characterName, data.nickname);
  }
  update(state: string, x: number, y: number) {
    const prevState = this.state;
    this.state = state;

    if (this.x !== x || this.y !== y)
      changePosition(this, x - this.x, y - this.y);
    if (prevState !== this.state) changeState(this);
  }
}

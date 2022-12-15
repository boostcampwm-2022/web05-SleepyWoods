import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { directionOptions, stateOptions } from '../enum/player.enum';

export class playerMovementDataDto {
  @IsNotEmpty()
  @IsNumber()
  x: number;

  @IsNotEmpty()
  @IsNumber()
  y: number;

  @IsNotEmpty()
  @IsString()
  direction: directionOptions;

  @IsNotEmpty()
  @IsString()
  state: stateOptions;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class playerMovementDataDto {
  @IsNotEmpty()
  @IsNumber()
  x: number;

  @IsNotEmpty()
  @IsNumber()
  y: number;

  @IsNotEmpty()
  @IsString()
  direction: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}

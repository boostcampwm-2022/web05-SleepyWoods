import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { playerMovementDataDto } from '../dto/player.dto';
import { directionOptions, stateOptions } from '../enum/player.enum';

export class movementValidationPipe implements PipeTransform {
  readonly directionOptions: string[] = Object.values(directionOptions);
  readonly stateOptions: string[] = Object.values(stateOptions);

  transform(value: playerMovementDataDto, metadata: ArgumentMetadata) {
    if (!this.isValid(value)) {
      throw new BadRequestException(`${value} INVALID PARAMS.`);
    }
    return value;
  }

  private isValid(value: playerMovementDataDto): boolean {
    return (
      this.directionOptions.includes(value['direction']) &&
      this.stateOptions.includes(value['state'])
    );
  }
}

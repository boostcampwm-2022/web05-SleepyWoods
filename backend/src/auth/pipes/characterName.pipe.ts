import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { signupDataDto } from '../dto/user-data.dto';

const hairName: { [key: string]: string } = {
  '-1': 'nohair',
  0: 'longhair',
  1: 'mophair',
  2: 'shorthair',
  3: 'spikeyhair',
  4: 'bowlhair',
  5: 'curlyhair',
};

export class characterNameValidationPipe implements PipeTransform {
  readonly characterOptions = Object.values(hairName);
  transform(value: signupDataDto, metadata: ArgumentMetadata) {
    const characterNameInput = value.characterName;

    if (!this.isValid(characterNameInput)) {
      throw new BadRequestException(
        `${characterNameInput} can't be the character name.`
      );
    }
    return value;
  }

  private isValid(value: string): boolean {
    return this.characterOptions.includes(value);
  }
}

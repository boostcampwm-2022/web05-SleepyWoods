import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { socialPlatform } from '../user.enum';

export class socialPlatformValidationPipe implements PipeTransform {
  readonly socialOptions: string[] = Object.values(socialPlatform);
  transform(value: string, metadata: ArgumentMetadata) {
    try{
      value = value.toLowerCase();
    }catch(e){
      throw new BadRequestException(`${value} can't be the social`);
    }

    if (!this.isValid(value)) {
      throw new BadRequestException(`${value} can't be the social`);
    }
    return value;
  }

  private isValid(value: string): boolean {
    return this.socialOptions.includes(value);
  }
}

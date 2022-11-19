import { IsString } from 'class-validator';
import { socialPlatform } from '../user.enum';

export class UserDataDto {
  @IsString()
  id: string;

  @IsString()
  social: socialPlatform;
}

export class UserDataFromSocialDto {
  @IsString()
  id: string;

  @IsString()
  profileImg: string;
}

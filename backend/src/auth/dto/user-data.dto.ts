import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { socialPlatform } from '../user.enum';

export class UserDataDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  social: socialPlatform;

  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  characterName: string;
}

export class UserIdentifierDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  social: socialPlatform;
}

export class UserDataFromSocialDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  profileImg: string;
}

export class signupDataDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  @Matches(/^[a-zA-z0-9ㄱ-ㅎㅏ-ㅣ가-힣 ]*$/, {
    message: '특수문자는 불가합니다.',
  })
  nickname: string;

  @IsNotEmpty()
  @IsString()
  characterName: string;
}

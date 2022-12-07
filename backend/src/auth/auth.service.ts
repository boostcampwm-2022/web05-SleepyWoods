import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { UserDataDto, UserDataFromSocialDto } from './dto/user-data.dto';
import { socialPlatform } from './user.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService
  ) {}

  async jwtTokenGenerator(userData: UserDataDto) {
    return {
      accessToken: this.jwtService.sign(userData),
    };
  }

  verify(accessToken: string) {
    try {
      const userData = this.jwtService.verify(accessToken);
      if(!userData.nickname){
        return false;
      }
      return userData;
    } catch (e) {
      return false;
    }
  }

  async socialOauth(social: socialPlatform, code: string): Promise<string> {
    const socialOauthUrl = {
      [socialPlatform.NAVER]: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_OAUTH_CLIENT_ID}&client_secret=${process.env.NAVER_OAUTH_SECRET}&redirect_uri=${process.env.SERVER_URL}/user/callback/naver
      &code=${code}&state=RANDOM_STATE`,
      [socialPlatform.KAKAO]: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_url=${process.env.SERVER_URL}/user/callback/kakao&code=${code}`,
      [socialPlatform.GOOGLE]: `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&client_secret=${process.env.GOOGLE_OAUTH_SECRET}&redirect_uri=${process.env.SERVER_URL}/user/callback/google&grant_type=authorization_code`,
    };

    const socialOauthResponse = await firstValueFrom(
      this.httpService.post(socialOauthUrl[social])
    );
    return socialOauthResponse.data.access_token;
  }

  async socialProfileSearch(
    social: socialPlatform,
    access_token: string
  ): Promise<UserDataFromSocialDto> {
    const socialProfileSearchApiUrl = {
      [socialPlatform.NAVER]: 'https://openapi.naver.com/v1/nid/me',
      [socialPlatform.KAKAO]: 'https://kapi.kakao.com/v2/user/me',
      [socialPlatform.GOOGLE]: 'https://www.googleapis.com/oauth2/v2/userinfo',
    };

    try {
      const socialProfileSearchApiResponse = await firstValueFrom(
        this.httpService.get(socialProfileSearchApiUrl[social], {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
      );

      const socialProfileData = socialProfileSearchApiResponse.data;
      const returnData: UserDataFromSocialDto = {
        id: '',
        profileImg: '',
      };

      switch (social) {
        case socialPlatform.NAVER:
          returnData.id = socialProfileData.response.id;
          returnData.profileImg = socialProfileData.response.profile_image;
          return returnData;
        case socialPlatform.KAKAO:
          returnData.id = socialProfileData.id;
          returnData.profileImg =
            socialProfileData.kakao_account.profile.profile_image_url;
          return returnData;
        case socialPlatform.GOOGLE:
          returnData.id = socialProfileData.id;
          returnData.profileImg = socialProfileData.picture;
          return returnData;
        default:
          throw new NotFoundException();
      }
    } catch (e) {
      throw new NotFoundException(
        'OAUTH에서 해당 사용자를 조회할 수 없습니다.'
      );
    }
  }
}

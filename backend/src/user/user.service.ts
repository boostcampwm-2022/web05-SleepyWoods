import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { socialPlatform } from './user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private httpService: HttpService
  ) {}

  async createUser(signupData: any) {
    const saveResult = await this.userRepository.save(signupData);
    console.log(saveResult);
    return saveResult;
  }

  async naverOauth(code: string, state: string) {
    const api_url =
      'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
      process.env.NAVER_OAUTH_CLIENT_ID +
      '&client_secret=' +
      process.env.NAVER_OAUTH_SECRET +
      '&redirect_uri=' +
      'http://localhost:3333/user/callback/naver' +
      '&code=' +
      code +
      '&state=' +
      state;

    const naverOauthResponse = await firstValueFrom(
      this.httpService.get(api_url, {
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_OAUTH_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_OAUTH_SECRET,
        },
      })
    );

    const { access_token } = naverOauthResponse.data;
    return access_token;
  }

  async naverProfileSearch(access_token: string) {
    const url = 'https://openapi.naver.com/v1/nid/me';
    const naverProfileApiResponse = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      })
    );

    const { id, profile_image, email } = naverProfileApiResponse.data.response;
    console.log();
    return { id, profile_image, email };
  }

  async findUser(social: socialPlatform, id: string): Promise<User> {
    const findResult = await this.userRepository.findOneBy({ id, social });
    return findResult;
  }
}

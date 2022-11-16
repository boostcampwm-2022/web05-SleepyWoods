import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { socialPlatform } from './user.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('login')
  loginRedirect(@Query('social') social: socialPlatform, @Res() res: Response) {
    const naverOauthUrl =
      'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
      process.env.NAVER_OAUTH_CLIENT_ID +
      '&redirect_uri=' +
      'http://localhost:3333/user/callback/naver' +
      '&state=' +
      'RANDOM_STATE';

    const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=http://localhost:3333/user/callback/kakao&response_type=code`;
    const googleOauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=http://localhost:3333/user/callback/google&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}`;

    switch (social) {
      case socialPlatform.NAVER:
        res.redirect(naverOauthUrl);
        break;
      case socialPlatform.KAKAO:
        res.redirect(kakaoOauthUrl);
        break;
      case socialPlatform.GOOGLE:
        res.redirect(googleOauthUrl);
        break;
    }
  }

  @Get('callback/google')
  async googleCallback(@Query('code') code: string, @Res() res: Response) {
    const access_token = await this.userService.googleOauth(code);
    const googleProfile = await this.userService.googleProfileSearch(
      access_token
    );
    const userData = await this.userService.findUser(
      socialPlatform.GOOGLE,
      googleProfile.id
    );
    if (!userData) {
      return res.redirect('http://localhost:5173/signup'); // 가입으로 보내요
    } else {
      return res.redirect('http://localhost:5173'); // 쿠기 생성해서 메인으로 보내요
    }
  }

  @Get('callback/kakao')
  async kakaoCallback(@Query('code') code: string, @Res() res: Response) {
    const access_token = await this.userService.kakaoOauth(code);
    const kakaoProfile = await this.userService.kakaoProfileSearch(
      access_token
    );
    console.log(kakaoProfile);
    const userData = await this.userService.findUser(
      socialPlatform.KAKAO,
      kakaoProfile.id
    );
    if (!userData) {
      return res.redirect('http://localhost:5173/signup'); // 가입으로 보내요
    } else {
      return res.redirect('http://localhost:5173'); // 쿠기 생성해서 메인으로 보내요
    }
  }

  @Get('callback/naver')
  async naverCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response
  ) {
    const access_token = await this.userService.naverOauth(code, state);
    const naverProfile = await this.userService.naverProfileSearch(
      access_token
    );
    const userData = await this.userService.findUser(
      socialPlatform.NAVER,
      naverProfile.id
    );
    if (!userData) {
      return res.redirect('http://localhost:5173/signup'); // 가입으로 보내요
    } else {
      return res.redirect('http://localhost:5173'); // 쿠기 생성해서 메인으로 보내요
    }
  }

  @Post()
  signUp(@Query('social') social: string, @Body() signupData: object) {
    this.userService.createUser({
      id: signupData['id'],
      nickname: signupData['nickname'],
      character_name: signupData['character_name'],
      email: 'rkd@@',
      social,
    });
  }
}

/**
 * sleepywoods/user post
 */

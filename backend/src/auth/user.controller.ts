import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { socialPlatform } from './user.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get('test1')
  @UseGuards(AuthGuard('criticalGuard'))
  test1() {
    return 'test1';
  }

  @Get('test2')
  @UseGuards(AuthGuard('looseGuard'))
  test2() {
    return 'test2';
  }
  @Get('login')
  loginRedirect(@Query('social') social: socialPlatform, @Res() res: Response) {
    const socialOauthUrl = {
      [socialPlatform.NAVER]: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_OAUTH_CLIENT_ID}&redirect_uri=${process.env.SERVER_URL}/user/callback/naver&state=RANDOM_STATE`,
      [socialPlatform.KAKAO]: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.SERVER_URL}/user/callback/kakao&response_type=code`,
      [socialPlatform.GOOGLE]: `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=${process.env.SERVER_URL}/user/callback/google&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}`,
    };
    res.redirect(socialOauthUrl[social]);
  }

  @Get('callback/:social')
  async socialCallback(
    @Query('code') code: string,
    @Param('social') social: socialPlatform,
    @Res() res: Response
  ) {
    const accessToken = await this.userService.socialOauth(social, code);
    const userSocialProfile = await this.userService.socialProfileSearch(
      social,
      accessToken
    );

    const userData = await this.userService.findUser({
      id: userSocialProfile.id,
      social: social,
    });

    const jwt = await this.authService.jwtTokenGenerator(
      userSocialProfile.id,
      social
    );

    res.cookie('accessToken', jwt.accessToken);

    if (!userData) {
      //신규 유저
      return res.redirect(process.env.CLIENT_URL + '/signup'); // 가입으로 보내요
    } else {
      // 기존 유저
      return res.redirect(process.env.CLIENT_URL); // 쿠기 생성해서 메인으로 보내요
    }
  }

  @Post()
  signUp(@Body() signupData: object) {
    // jwt안에 값 추출로직
    this.userService.createUser({
      id: signupData['id'],
      nickname: signupData['nickname'],
      character_name: signupData['character_name'],
      social: signupData['social'],
    });
  }
}

/**
 * 
accessToken : 1일 짜리 
  - 모든 중요한 기능 접근할 때 확인,
    - 만료 : refreshToken 요구 .
  - header 에 담김

refreshToken : 14일 짜리
  - 자동 로그인
  - cookie에 refreshToken 발급 
  - refresh 토큰 만료 : 소셜 로그인 다시 요구.
    - accessToken 도 같이 발급


 */

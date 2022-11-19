import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { signupDataDto, UserDataDto } from './dto/user-data.dto';
import { socialPlatformValidationPipe } from './pipes/social-platform.pipe';
import { socialPlatform } from './user.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get('login')
  loginRedirect(
    @Query('social', socialPlatformValidationPipe) social: socialPlatform,
    @Res() res: Response
  ): void {
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
  ): Promise<void> {
    const accessToken = await this.authService.socialOauth(social, code);
    const userSocialProfile = await this.authService.socialProfileSearch(
      social,
      accessToken
    );

    const userData = await this.userService.findUser({
      id: userSocialProfile.id,
      social: social,
    });

    const jwt = await this.authService.jwtTokenGenerator({
      id: userSocialProfile.id,
      social,
    });

    res.cookie('accessToken', jwt.accessToken);

    if (!userData) {
      //신규 유저
      res.redirect(process.env.CLIENT_URL + '/signup'); // 가입으로 보내요
    } else {
      // 기존 유저
      res.redirect(process.env.CLIENT_URL); // 쿠기 생성해서 메인으로 보내요
    }
  }

  @Post()
  @UseGuards(AuthGuard('looseGuard'))
  signUp(
    @Body('signupData', ValidationPipe) signupData: signupDataDto,
    @Req() req: any,
    @Res() res: Response
  ): void {
    const { id, social }: UserDataDto = req.user;
    // body안에 nickname, characterName FE에 전송 요청
    this.userService.createUser({
      id,
      social,
      nickname: signupData['nickname'],
      characterName: signupData['characterName'],
    });
    res.redirect(process.env.CLIENT_URL);
  }

  @Get('/logout')
  logout(@Res() res: Response): void {
    res.cookie('accessToken', '', {
      maxAge: 0,
    });
    res.redirect(process.env.CLIENT_URL);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import {
  signupDataDto,
  UserDataDto,
  UserIdentifierDto,
} from './dto/user-data.dto';
import { characterNameValidationPipe } from './pipes/characterName.pipe';
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
    // 1단계 : 소셜에 유저 정보 받아오기
    const accessToken = await this.authService.socialOauth(social, code);
    const userSocialProfile = await this.authService.socialProfileSearch(
      social,
      accessToken
    );

    // 2단계 : 우리 유저 인지 확인하기
    const userData = await this.userService.findUser({
      id:
        social === socialPlatform.KAKAO
          ? `k${userSocialProfile.id}`
          : userSocialProfile.id,
      social: social,
    });
    // 탈퇴 감지 로직
    if (userData && userData.deleted) {
      throw new UnauthorizedException('여길 어디 다시와.');
    }

    const jwt = await this.authService.jwtTokenGenerator({
      id:
        social === socialPlatform.KAKAO
          ? `k${userSocialProfile.id}`
          : userSocialProfile.id,
      social,
      nickname: userData?.nickname,
      characterName: userData?.characterName,
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

  @Get('auth')
  @UseGuards(AuthGuard('criticalGuard'))
  authorization(@Req() req: any) {
    const { id, nickname, characterName }: UserDataDto = req.user;
    return { id, nickname, characterName };
  }

  @Post()
  @UseGuards(AuthGuard('looseGuard'))
  async signUp(
    @Body('signupData', ValidationPipe, characterNameValidationPipe)
    signupData: signupDataDto,
    @Req() req: any,
    @Res() res: Response
  ) {
    const { id, social }: UserDataDto = req.user;
    // body안에 nickname, characterName FE에 전송 요청

    await this.userService.createUser({
      id:
        social === socialPlatform.KAKAO && !id.startsWith('k') ? `k${id}` : id,
      social,
      nickname: signupData['nickname'],
      characterName: signupData['characterName'],
    });

    const jwt = await this.authService.jwtTokenGenerator({
      id:
        social === socialPlatform.KAKAO && !id.startsWith('k') ? `k${id}` : id,
      social,
      nickname: signupData['nickname'],
      characterName: signupData['characterName'],
    });

    res.cookie('accessToken', jwt.accessToken);
    res.status(200).send('회원가입 완료!!');
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.cookie('accessToken', '', {
      maxAge: 0,
    });
    res.status(200).send('로그아웃 되었습니다.');
  }

  @Delete()
  @UseGuards(AuthGuard('criticalGuard'))
  deleteUser(@Req() req: any, @Res() res: any) {
    const { id, social }: UserIdentifierDto = req.user;

    res.cookie('accessToken', '', {
      maxAge: 0,
    });

    this.userService.deleteUser({ id, social });
    res.status(200).send('캐릭터가 삭제 되었습니다.');
  }
}

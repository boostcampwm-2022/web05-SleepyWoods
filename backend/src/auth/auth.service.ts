import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { socialPlatform } from 'src/user/user.enum';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async jwtTokenGenerator(id: string, social: socialPlatform) {
    //callback_결과에 따른 JWT 생성 로직
    return {
      accessToken: this.jwtService.sign({ id, social }),
    };
  }
}

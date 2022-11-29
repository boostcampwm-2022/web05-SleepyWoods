import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDataDto } from './dto/user-data.dto';

@Injectable()
export class criticalJwtStrategy extends PassportStrategy(
  Strategy,
  'criticalGuard'
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        request => {
          return request?.cookies?.accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: UserDataDto): Promise<UserDataDto> {
    if (!payload.nickname) {
      throw new UnauthorizedException(
        '서버에 해당 유저가 존재하지 않습니다. 가입을 완료해주세요.'
      );
    }

    return payload;
  }
}

@Injectable()
export class looseJwtStrategy extends PassportStrategy(Strategy, 'looseGuard') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        request => {
          return request?.cookies?.accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: UserDataDto): Promise<UserDataDto> {
    return payload;
  }
}

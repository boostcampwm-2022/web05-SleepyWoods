import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'criticalGuard') {
  constructor(private userService: UserService) {
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

  // db 참조 하는 guard
  async validate(payload: any) {
    const { id, social } = payload;
    const user: User = await this.userService.findUser({ id, social });

    if (!user) {
      throw new UnauthorizedException('');
    }
    return true;
  }
}

@Injectable()
export class JwtStrategy2 extends PassportStrategy(Strategy, 'looseGuard') {
  constructor(private userService: UserService) {
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

  // db 참조 하는 guard
  async validate(payload: any) {
    return true;
  }
}

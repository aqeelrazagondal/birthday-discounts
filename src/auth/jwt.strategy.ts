import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interface/jwt-payload.interface';
import { config } from '../../config/config.development';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret || 'secret',
    });
  }

  /**
   * Validate the payload
   * @param payload
   */
  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}

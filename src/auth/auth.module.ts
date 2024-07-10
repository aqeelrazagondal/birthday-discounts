import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { config } from '../../config/config.development';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: config.jwtPrivateKey,
      signOptions: { expiresIn: config.expiresIn },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

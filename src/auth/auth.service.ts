import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * Sign in a user with email and password and return an access token
   * @param email
   * @param pass
   */
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new UnauthorizedException(
        'User not found with this username/email',
      );
    await this.verifyPassword(pass, user.password);

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * Verify password hash with plain password and throw error if not valid
   * @param plainPassword
   * @param hashedPassword
   */
  verifyPassword(plainPassword: string, hashedPassword: string) {
    const isValid = bcrypt.compareSync(plainPassword, hashedPassword);

    // if password is incorrect
    if (!isValid) throw new UnauthorizedException('Password is incorrect');
  }

  /**
   * Validate a user with email and password and return the user
   * @param email
   * @param password
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
}

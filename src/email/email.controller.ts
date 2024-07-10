// src/email/email.controller.ts
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { EmailService } from './email.service';
import { User } from '../user/entities/user.entity';
import { Promo } from '../promo/entities/promo.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseTransformer } from '../common/response-transformer.interceptor';

@ApiTags('Email TEST APIs')
@UseInterceptors(ResponseTransformer)
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({ summary: 'Test send birthday CRON' })
  @ApiResponse({
    status: 201,
    description: 'Birthday email sent successfully.'
  })
  //JUST FOR TESTING PURPOSES
  @Get('send-birthday/:userId')
  async sendBirthdayEmail(@Param('userId') userId: number) {
    const user = await User.findByPk(userId);
    const promo = await Promo.findOne({ where: { userId: user.id } });

    if (user && promo) {
      await this.emailService.sendBirthdayEmail(user, promo);
      return { message: 'Birthday email sent successfully' };
    } else {
      return { message: 'User or Promo not found' };
    }
  }
}

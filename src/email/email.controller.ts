// src/email/email.controller.ts
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseTransformer } from '../common/response-transformer.interceptor';
import { UserService } from '../user/user.service';
import { PromoService } from '../promo/promo.service';

@ApiTags('Email TEST APIs')
@UseInterceptors(ResponseTransformer)
@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly promoService: PromoService,
  ) {}

  @ApiOperation({ summary: 'Test send birthday CRON' })
  @ApiResponse({
    status: 201,
    description: 'Birthday email sent successfully.',
  })
  //JUST FOR TESTING PURPOSES
  @Get('send-birthday/:userId')
  async sendBirthdayEmail(@Param('userId') userId: number) {
    const user = await this.userService.findOne(userId);
    const promo = await this.promoService.findPromoByUserId(user.id);
    if (user && promo) {
      await this.emailService.sendBirthdayEmail(user, promo);
      return { message: 'Birthday email sent successfully' };
    } else {
      return { message: 'User or Promo not found' };
    }
  }
}

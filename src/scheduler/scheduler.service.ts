// src/scheduler/scheduler.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { PromoService } from '../promo/promo.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly promoService: PromoService,
  ) {}

  /**
   * Send birthday emails to users whose birthday is in the next week
   * CRON IS SET TO RUN EVERY DAY AT MIDNIGHT
   */
  @Cron('0 0 * * *') // Runs every day at midnight
  async handleCron() {
    const users: User[] =
      await this.userService.findUsersWithUpcomingBirthdays();
    for (const user of users) {
      await this.emailService.sendBirthdayEmail(
        user,
        await this.promoService.findPromoByUserId(user.id),
      );
    }
  }
}

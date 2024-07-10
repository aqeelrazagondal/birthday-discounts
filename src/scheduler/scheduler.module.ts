// src/scheduler/scheduler.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from '../email/email.module';
import { SchedulerService } from './scheduler.service';
import { UserModule } from '../user/user.module';
import { PromoModule } from '../promo/promo.module';

@Module({
  imports: [ScheduleModule.forRoot(), UserModule, EmailModule, PromoModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}

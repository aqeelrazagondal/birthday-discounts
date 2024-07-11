import { Module } from '@nestjs/common';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PromoModule } from './promo/promo.module';
import { SuggestionModule } from './suggestion/suggestion.module';
import { SeedService } from './seed/seed.service';
import { SeedModule } from './seed/seed.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { config } from '../config/config.development';
import { SendgridService } from './email/sendgrid.service';
import { PurchaseHistoryModule } from './purchase-history/purchase-history.module';
import { ProductPreferenceModule } from './product-preference/product-preference.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: +config.ttl,
        limit: +config.limit,
      },
    ]),
    PassportModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    PromoModule,
    SuggestionModule,
    SeedModule,
    EmailModule,
    AuthModule,
    SchedulerModule,
    PurchaseHistoryModule,
    ProductPreferenceModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService, JwtStrategy, SendgridService],
  exports: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailController } from './email.controller';
import { User } from '../user/entities/user.entity';
import { Promo } from '../promo/entities/promo.entity';
import { SuggestedProduct } from '../suggestion/entities/suggestion.entity';
import { Product } from '../product/entities/product.entity';
import { SuggestionModule } from '../suggestion/suggestion.module';
import { SendgridService } from "./sendgrid.service";

@Module({
  imports: [
    SequelizeModule.forFeature([User, Promo, SuggestedProduct, Product]),
    SuggestionModule,
  ],
  providers: [EmailService, SendgridService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}

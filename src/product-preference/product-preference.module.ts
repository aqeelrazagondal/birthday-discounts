import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductPreference } from './entities/product-preference.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductPreference])],
})
export class ProductPreferenceModule {}

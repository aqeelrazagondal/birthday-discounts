import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PurchaseHistory } from './entities/purchase-history.entity';

@Module({
  imports: [SequelizeModule.forFeature([PurchaseHistory])],
})
export class PurchaseHistoryModule {}

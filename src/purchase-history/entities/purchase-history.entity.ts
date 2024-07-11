import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  Index,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

interface PurchaseHistoryAttributes {
  id?: number;
  userId: number;
  productId: number;
  purchaseDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
@Table({
  tableName: 'purchase-history',
  timestamps: true,
})
export class PurchaseHistory
  extends Model<PurchaseHistoryAttributes>
  implements PurchaseHistoryAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({
    name: 'PRIMARY',
    using: 'BTREE',
    order: 'ASC',
    unique: true,
  })
  id?: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  purchaseDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;
}

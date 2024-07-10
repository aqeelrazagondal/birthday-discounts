import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

interface SuggestedProductAttributes {
  id?: number;
  userId: number;
  productId: number;
}
@Table({
  tableName: 'suggested_products',
  timestamps: true,
})
export class SuggestedProduct
  extends Model<SuggestedProductAttributes>
  implements SuggestedProductAttributes
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

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}

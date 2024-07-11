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

interface ProductPreferenceAttributes {
  id?: number;
  userId: number;
  productId: number;
  preferenceScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}
@Table({
  tableName: 'product-preference',
  timestamps: true,
})
export class ProductPreference
  extends Model<ProductPreferenceAttributes>
  implements ProductPreferenceAttributes
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
    type: DataType.FLOAT,
    allowNull: false,
  })
  preferenceScore: number;
}

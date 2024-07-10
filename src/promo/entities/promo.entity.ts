// src/promos/promo.model.ts
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  Index,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

interface PromoAttributes {
  id?: number;
  userId: number;
  code: string;
  expiryDate: Date;
}
@Table({
  tableName: 'promos',
  timestamps: true,
})
export class Promo extends Model<PromoAttributes> implements PromoAttributes {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiryDate: Date;
}

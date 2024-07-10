import {
  BeforeCreate,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Index,
  AfterFind,
} from 'sequelize-typescript';
import { Promo } from '../../promo/entities/promo.entity';
import { SuggestedProduct } from '../../suggestion/entities/suggestion.entity';
import * as bcrypt from 'bcrypt';

export interface userAttributes {
  id?: number;
  name: string;
  email: string;
  dob: Date;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
@Table
export class User
  extends Model<userAttributes, userAttributes>
  implements userAttributes
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dob: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password?: string;

  @HasMany(() => Promo)
  promos?: Promo[];

  @HasMany(() => SuggestedProduct)
  suggestedProducts?: SuggestedProduct[];

  @BeforeCreate
  static async hashPassword(instance: User) {
    if (!instance.password) return;
    const salt = await bcrypt.genSalt(10, 'a');
    instance.password = await bcrypt.hash(instance.password, salt);
  }

  @AfterFind
  static async removePassword(instance: User) {
    if (!instance.password) return;
    delete instance.password;
  }
}

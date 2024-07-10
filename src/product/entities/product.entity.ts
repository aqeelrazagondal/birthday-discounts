import { Column, DataType, Index, Model, Table } from "sequelize-typescript";

export interface ProductAttributes {
  id?: number;
  name: string;
  price: number;
  description: string;
}
@Table({
  tableName: 'products',
  timestamps: true,
})
export class Product
  extends Model<ProductAttributes, ProductAttributes>
  implements ProductAttributes
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
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;
}

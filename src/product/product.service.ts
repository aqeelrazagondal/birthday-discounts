import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  /**
   * Create a new product
   * @param createProductDto
   */
  async create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }
  /**
   * Find all products
   */
  findAll() {
    return this.productModel.findAll({});
  }
  /**
   * Find a product by id
   * @param id
   */
  findOne(id: number) {
    return this.productModel.findByPk(id);
  }

  /**
   * Update a product by id
   * @param id
   * @param updateProductDto
   */
  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productModel.update(updateProductDto, { where: { id } });
  }

  /**
   * Remove a product by id
   * @param id
   */
  remove(id: number) {
    return this.productModel.destroy({ where: { id } });
  }
}

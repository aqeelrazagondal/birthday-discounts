import { Injectable } from '@nestjs/common';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../product/entities/product.entity';
import { Promo } from './entities/promo.entity';

@Injectable()
export class PromoService {
  constructor(
    @InjectModel(Promo)
    private promoModel: typeof Promo,
  ) {}
  /**
   * Create a new promo
   * @param createPromoDto
   */
  async create(createPromoDto: CreatePromoDto) {
    return this.promoModel.create(createPromoDto);
  }
  /**
   * Find all promos
   */
  async findAll() {
    return this.promoModel.findAll({});
  }

  /**
   * Find a promo by id
   * @param id
   */
  async findOne(id: number) {
    return this.promoModel.findByPk(id);
  }

  /**
   * Update a promo by id
   * @param id
   * @param updatePromoDto
   */
  async update(id: number, updatePromoDto: UpdatePromoDto) {
    return this.promoModel.update(updatePromoDto, { where: { id } });
  }

  /**
   * Remove a promo by id
   * @param id
   */
  remove(id: number) {
    return this.promoModel.destroy({ where: { id: id } });
  }

  /**
   * Find a promo by user id
   * @param userId
   */
  async findPromoByUserId(userId: number) {
    const promo = await this.promoModel.findOne({ where: { userId } });
    if (promo) {
      return promo;
    }
    const promoToCreate = {
      userId,
      code: 'BDAY20' + userId,
      expiryDate: new Date('2024-07-16'),
    };
    await this.create(promoToCreate);
    return promoToCreate;
  }
}

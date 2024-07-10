import { Injectable } from '@nestjs/common';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../product/entities/product.entity';
import { SuggestedProduct } from './entities/suggestion.entity';
import { FindSuggestionDto } from './dto/find-suggestion.dto';

@Injectable()
export class SuggestionService {
  constructor(
    @InjectModel(SuggestedProduct)
    private suggestedProductModel: typeof SuggestedProduct,
  ) {}

  /**
   * Create a new suggestion
   * @param createSuggestionDto
   */
  async create(createSuggestionDto: CreateSuggestionDto) {
    return this.suggestedProductModel.create(createSuggestionDto);
  }

  /**
   * Find all suggestions
   * @param query - FindSuggestionDto
   */
  findAll(query: FindSuggestionDto) {
    return this.suggestedProductModel.findAndCountAll({
      where: {
        ...(query.userId && { userId: query.userId }),
        ...(query.productId && { productId: query.productId }),
      },
      include: [
        {
          model: Product,
          as: 'product',
        },
      ],
      ...(query.limit && { limit: +query.limit }),
      ...(query.offset && { offset: +query.offset }),
      order:
        query.sortBy && query.sortOrder
          ? [[query.sortBy, query.sortOrder]]
          : [['createdAt', 'DESC']],
    });
  }

  /**
   * Find a suggestion by id
   * @param id
   * @param updateSuggestionDto
   */
  update(id: number, updateSuggestionDto: UpdateSuggestionDto) {
    return this.suggestedProductModel.update(updateSuggestionDto, {
      where: { id },
    });
  }
}

import { Module } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { SuggestionController } from './suggestion.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SuggestedProduct } from './entities/suggestion.entity';

@Module({
  imports: [SequelizeModule.forFeature([SuggestedProduct])],
  controllers: [SuggestionController],
  providers: [SuggestionService],
  exports: [SuggestionService],
})
export class SuggestionModule {}

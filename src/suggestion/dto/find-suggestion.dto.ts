import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../common/pagination.dto';

export class FindSuggestionDto extends PaginationDto {
  @ApiProperty({
    description: 'The user id of the suggestion',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId?: number;

  @Type(() => Number)
  @IsOptional()
  productId?: number;
}

import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { SortDto } from './sort.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto extends SortDto {
  @ApiProperty({
    minimum: 1,
    example: 10,
    title: 'Limit',
    default: 10,
  })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @IsNumber()
  limit: number;

  @ApiProperty({
    example: 0,
    minimum: 0,
    title: 'Offset',
    default: 0,
  })
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @IsNumber()
  offset: number;
}

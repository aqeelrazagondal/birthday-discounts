import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SortDto {
  @ApiProperty({
    example: 'createdAt',
    title: 'Sort By',
    format: 'string',
    default: 'createdAt',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    example: 'DESC',
    title: 'Sort Order',
    format: 'string',
    default: 'DESC',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortOrder?: string;
}

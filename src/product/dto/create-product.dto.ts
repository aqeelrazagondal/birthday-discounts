import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    type: String,
    required: true,
    example: 'Product 1',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    required: true,
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: 'The description of the product',
    type: String,
    required: true,
    example: 'This is a product',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromoDto {
  @ApiProperty({
    description: 'The user id',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'The promo code',
    type: String,
    required: true,
    example: 'PROMO123',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'The expiry date of the promo',
    type: Date,
    required: true,
    example: '2022-12-31',
  })
  @IsNotEmpty()
  @IsDateString()
  expiryDate: Date;
}

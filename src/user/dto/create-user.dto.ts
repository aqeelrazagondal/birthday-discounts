import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  NotContains,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    type: String,
    required: true,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    type: String,
    required: true,
    example: 'random@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @NotContains(' ', { message: 'email should not contain spaces' })
  email: string;

  @ApiProperty({
    description: 'The date of birth of the user',
    type: Date,
    required: true,
    example: '1990-01-01',
  })
  @IsNotEmpty()
  @IsDateString({}, { each: true })
  dob: Date;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    required: false,
    example: 'password'
  })
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  updatedAt?: Date;

  @IsOptional()
  createdAt?: Date;
}

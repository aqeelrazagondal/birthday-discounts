import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    required: true,
    description: 'Email',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: 'Password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

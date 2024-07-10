import { Controller, Post, UseGuards, Request, Body, UseInterceptors } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateAuthDto } from "./dto/create-auth.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseTransformer } from "../common/response-transformer.interceptor";
import { CreateProductDto } from "../product/dto/create-product.dto";
import { Product } from "../product/entities/product.entity";

@ApiTags('Authentication APIs')
@UseInterceptors(ResponseTransformer)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Authentication api' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({
    status: 201,
    description: 'The Auth has been successfully created.',
    type: CreateAuthDto,
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto.email, createAuthDto.password);
  }
}

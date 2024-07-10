import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseTransformer } from '../common/response-transformer.interceptor';
import { Promo } from './entities/promo.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Promo APIs')
@UseInterceptors(ResponseTransformer)
@UseGuards(JwtAuthGuard)
@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @ApiOperation({ summary: 'Create a new Promo' })
  @ApiBody({ type: CreatePromoDto })
  @ApiResponse({
    status: 201,
    description: 'The Promo has been successfully created.',
    type: Promo,
  })
  @Post()
  create(@Body() createPromoDto: CreatePromoDto) {
    return this.promoService.create(createPromoDto);
  }

  @ApiOperation({ summary: 'GET all promotions' })
  @Get()
  findAll() {
    return this.promoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromoDto: UpdatePromoDto) {
    return this.promoService.update(+id, updatePromoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promoService.remove(+id);
  }
}

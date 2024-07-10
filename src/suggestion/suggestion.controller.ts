import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query, UseInterceptors
} from "@nestjs/common";
import { SuggestionService } from './suggestion.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
import { FindSuggestionDto } from "./dto/find-suggestion.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseTransformer } from "../common/response-transformer.interceptor";
import { SuggestedProduct } from "./entities/suggestion.entity";

@ApiTags('Product Suggestions APIs')
@UseInterceptors(ResponseTransformer)
@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @ApiOperation({ summary: 'Create a new suggestion product' })
  @ApiBody({ type: CreateSuggestionDto })
  @ApiResponse({
    status: 201,
    description: 'The suggestion has been successfully created.',
    type: SuggestedProduct,
  })
  @Post()
  create(@Body() createSuggestionDto: CreateSuggestionDto) {
    return this.suggestionService.create(createSuggestionDto);
  }

  @ApiOperation({ summary: 'GET all product suggestion by user ID' })
  @ApiResponse({
    status: 201,
    description: 'All product suggestions',
    type: SuggestedProduct,
  })
  @Get()
  findAll(@Query() query: FindSuggestionDto) {
    return this.suggestionService.findAll(query);
  }
}

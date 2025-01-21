import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SuccessMessageDto } from 'src/common/dtos';
import { AgencyCategoryService } from './category.service';
import {
  CreateAgencyCategoryDto,
  UpdateAgencyCategoryDto,
} from './dto/create-category.dto';
import { AgencyCategory } from './entities/category.entity';

@Controller('agencies-categories')
export class AgencyCategoryController {
  constructor(private readonly categoryService: AgencyCategoryService) {}

  @Post('/')
  @ApiCreatedResponse({ type: AgencyCategory })
  createCategory(
    @Body() body: CreateAgencyCategoryDto,
  ): Promise<AgencyCategory> {
    return this.categoryService.create(body);
  }

  @Put('/:id')
  @ApiCreatedResponse({ type: AgencyCategory })
  updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateAgencyCategoryDto,
  ): Promise<AgencyCategory> {
    return this.categoryService.update(id, body);
  }

  @Get('/')
  @ApiOkResponse({ type: [AgencyCategory] })
  getAllCategories(): Promise<AgencyCategory[]> {
    return this.categoryService.getAllCategories();
  }

  @Get('/:id')
  @ApiOkResponse({ type: AgencyCategory })
  getCategoryById(@Param('id') id: string): Promise<AgencyCategory> {
    return this.categoryService.getById(id);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: SuccessMessageDto })
  deleteCategory(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.categoryService.delete(id);
  }
}

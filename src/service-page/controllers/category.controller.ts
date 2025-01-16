import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceCategoryService } from '../services';
import { CreateServiceCategoryDto, UpdateCategoryDto } from '../dto';
import { ServiceCategory } from '../entities';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SuccessMessageDto } from 'src/common/dtos';

@Controller('services-categories')
export class ServiceCategoryController {
  constructor(private categoryService: ServiceCategoryService) { }

  @Post('/')
  @ApiCreatedResponse({ type: ServiceCategory })
  createCategory(@Body() body: CreateServiceCategoryDto): Promise<ServiceCategory> {
    return this.categoryService.create(body);
  }

  @Put('/:id')
  @ApiCreatedResponse({ type: ServiceCategory })
  updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ): Promise<ServiceCategory> {
    return this.categoryService.update(id, body);
  }

  @Get('/')
  @ApiOkResponse({ type: [ServiceCategory] })
  getAllCategories(): Promise<ServiceCategory[]> {
    return this.categoryService.getAllCategories();
  }

  @Get('/:id')
  @ApiOkResponse({ type: ServiceCategory })
  getCategoryById(@Param('id') id: string): Promise<ServiceCategory> {
    return this.categoryService.getById(id);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: SuccessMessageDto })
  deleteCategory(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.categoryService.delete(id);
  }
}

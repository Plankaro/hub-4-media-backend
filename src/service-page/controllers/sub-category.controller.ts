import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubCategoryDto } from '../dto';
import { ServiceSubCategory } from '../entities';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ServiceSubCategoryService } from '../services';
import { SuccessMessageDto } from 'src/common/dtos';

@Controller('services-sub-categories')
export class ServiceSubCategoryController {
  constructor(private subCategoryService: ServiceSubCategoryService) {}

  @Post('/')
  @ApiCreatedResponse({ type: ServiceSubCategory })
  createSubCategory(
    @Body() body: CreateSubCategoryDto,
  ): Promise<ServiceSubCategory> {
    return this.subCategoryService.create(body);
  }

  @Put('/:id')
  @ApiCreatedResponse({ type: ServiceSubCategory })
  updateSubCategory(
    @Param('id') id: string,
    @Body() body: CreateSubCategoryDto,
  ): Promise<ServiceSubCategory> {
    return this.subCategoryService.update(id, body);
  }

  @Get('/')
  @ApiOkResponse({ type: [ServiceSubCategory] })
  getAllSubCategories(): Promise<ServiceSubCategory[]> {
    return this.subCategoryService.getAllSubCategories();
  }

  @Get('/:id')
  @ApiOkResponse({ type: ServiceSubCategory })
  getSubCategoryById(@Param('id') id: string): Promise<ServiceSubCategory> {
    return this.subCategoryService.getById(id);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: SuccessMessageDto })
  deleteSubCategory(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.subCategoryService.delete(id);
  }
}

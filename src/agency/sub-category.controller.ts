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
import { CreateAgencySubCategoryDto } from './dto/create-sub-category.dto';
import { AgencySubCategory } from './entities/sub-category';
import { AgencySubCategoryService } from './sub-category.service';

@Controller('agencies-sub-categories')
export class AgencySubCategoryController {
  constructor(private readonly subCategoryService: AgencySubCategoryService) {}

  @Post('/')
  @ApiCreatedResponse({ type: AgencySubCategory })
  createSubCategory(
    @Body() body: CreateAgencySubCategoryDto,
  ): Promise<AgencySubCategory> {
    return this.subCategoryService.create(body);
  }

  @Put('/:id')
  @ApiCreatedResponse({ type: AgencySubCategory })
  updateSubCategory(
    @Param('id') id: string,
    @Body() body: CreateAgencySubCategoryDto,
  ): Promise<AgencySubCategory> {
    return this.subCategoryService.update(id, body);
  }

  @Get('/')
  @ApiOkResponse({ type: [AgencySubCategory] })
  getAllSubCategories(): Promise<AgencySubCategory[]> {
    return this.subCategoryService.getAllSubCategories();
  }

  @Get('/:id')
  @ApiOkResponse({ type: AgencySubCategory })
  getSubCategoryById(@Param('id') id: string): Promise<AgencySubCategory> {
    return this.subCategoryService.getById(id);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: SuccessMessageDto })
  deleteSubCategory(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.subCategoryService.delete(id);
  }
}

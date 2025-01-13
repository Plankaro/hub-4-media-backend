import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // UseGuards,
} from '@nestjs/common';
import { BlogCategoryService } from '../services';
import { CreateCategoryDto } from '../dtos';
import { ApiOkResponse } from '@nestjs/swagger';
import { BlogCategory } from '../entities';
// import { AuthGuard } from '@nestjs/passport';
// import { AbilityGuard } from '../../ability/ability.guard';
// import { CheckAbilities } from '../../ability/ability.decorator';
// import { Action } from '../../ability/ability.factory';
import { SuccessMessageDto } from 'src/common/dtos';

// @UseGuards(AuthGuard(), AbilityGuard)
@Controller('blog-category')
export class BlogCategoryController {
  constructor(private categoryService: BlogCategoryService) {}

  @ApiOkResponse({ type: BlogCategory })
  @Post('/create')
  // @CheckAbilities({ action: Action.Create, subject: BlogCategory })
  async createCategory(@Body() body: CreateCategoryDto): Promise<BlogCategory> {
    const createdCategory = await this.categoryService.createCategory(body);

    return createdCategory;
  }

  @ApiOkResponse({ type: BlogCategory })
  @Put('/update/:categoryId')
  // @CheckAbilities({ action: Action.Create, subject: BlogCategory })
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() body: CreateCategoryDto,
  ): Promise<BlogCategory> {
    const updatedCatgory = await this.categoryService.updateCategory(
      categoryId,
      body,
    );

    return updatedCatgory;
  }

  @ApiOkResponse({ type: [BlogCategory] })
  @Get('/all')
  getAllCategories(): Promise<BlogCategory[]> {
    return this.categoryService.getAllCategories();
  }

  @ApiOkResponse({ type: BlogCategory })
  @Get('/:categoryId')
  // @CheckAbilities({ action: Action.Create, subject: BlogCategory })
  async getCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<BlogCategory> {
    const { category } = await this.categoryService.findCategory(categoryId);
    return category;
  }

  @Delete('/:categoryId')
  @ApiOkResponse({ type: SuccessMessageDto })
  // @CheckAbilities({ action: Action.Create, subject: BlogCategory })
  deletePost(
    @Param('categoryId') categoryId: string,
  ): Promise<SuccessMessageDto> {
    return this.categoryService.deleteCategory(categoryId);
  }
}

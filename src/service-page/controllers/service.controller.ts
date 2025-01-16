import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ServicePageService } from '../services';
import { CreateServiceCategoryDto, CreateServiceDto } from '../dto';
import { Service } from '../entities';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SuccessMessageDto } from 'src/common/dtos';
import { ServiceFilterDto } from '../dto/service-filter.dto';

@Controller('services')
export class ServicePageController {
  constructor(private service: ServicePageService) { }

  @Post('/')
  @ApiCreatedResponse({ type: Service })
  @ApiBody({ type: CreateServiceCategoryDto })
  createService(@Body() body: CreateServiceDto): Promise<Service> {
    return this.service.create(body);
  }

  @Put('/:id')
  @ApiCreatedResponse({ type: Service })
  updateService(
    @Param('id') id: string,
    @Body() body: CreateServiceDto,
  ): Promise<Service> {
    return this.service.update(id, body);
  }

  @Get('/:id')
  @ApiOkResponse({ type: Service })
  getServiceById(@Param('id') id: string): Promise<Service> {
    return this.service.getById(id);
  }

  @Get('/')
  @ApiOkResponse({ type: [Service] })
  // @ApiQuery({ type: ServiceFilterDto })
  getAllServices(@Query() query: ServiceFilterDto): Promise<Service[]> {
    return this.service.getAllServices(query);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: SuccessMessageDto })
  deleteService(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.service.delete(id);
  }
}

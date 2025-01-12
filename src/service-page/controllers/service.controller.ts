import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServicePageService } from '../services';
import { CreateServiceDto } from '../dto';
import { Service } from '../entities';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SuccessMessageDto } from 'src/common/dtos';

@Controller('services')
export class ServicePageController {
  constructor(private service: ServicePageService) {}

  @Post('/')
  @ApiCreatedResponse({ type: Service })
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
  getAllServices(): Promise<Service[]> {
    return this.service.getAllServices();
  }

  @Delete('/:id')
  @ApiOkResponse({ type: SuccessMessageDto })
  deleteService(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.service.delete(id);
  }
}

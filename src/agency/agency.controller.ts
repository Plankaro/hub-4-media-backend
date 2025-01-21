import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Agency } from './entities/agency.entity';
import { CreateAgencyServiceDto } from './dto/agency-service.dto';

@ApiTags('agencies')
@Controller('agencies')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post()
  @ApiOperation({ summary: 'Create an agency' })
  @ApiResponse({
    status: 201,
    description: 'The agency has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createAgencyDto: CreateAgencyDto): Promise<Agency> {
    console.log("🚀 ~ AgencyController ~ create ~ createAgencyDto:", createAgencyDto)
    return this.agencyService.create(createAgencyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all agencies' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all agencies.',
    type: [Agency],
  })
  async findAll(): Promise<Agency[]> {
    return this.agencyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get agency by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the agency by ID.',
    type: Agency,
  })
  @ApiResponse({ status: 404, description: 'Agency not found' })
  async findOne(@Param('id') id: string): Promise<Agency> {
    return this.agencyService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update agency by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated the agency.' })
  @ApiResponse({ status: 404, description: 'Agency not found' })
  async update(
    @Param('id') id: string,
    @Body() updateAgencyDto: UpdateAgencyDto,
  ): Promise<Agency> {
    return this.agencyService.update(id, updateAgencyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete agency by ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the agency.' })
  @ApiResponse({ status: 404, description: 'Agency not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.agencyService.remove(id);
  }
}

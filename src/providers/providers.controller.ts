import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { SkipJwt } from 'src/auth/decorators/skip-jwt.decorator';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }


  @SkipJwt()
  @Get()
  @Roles(Role.Provider, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)

  findAll() {
    return this.providersService.findAll();
  }

  @Get('/portfolio')
  @UseGuards(AuthGuard())
  providerPortfolio() {
    return this.providersService.providerPortfolio();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.update(+id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(+id);
  }
}

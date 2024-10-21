import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipJwt } from 'src/auth/decorators/skip-jwt.decorator';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @SkipJwt()
  @Post('add-hero-headings')
  postHeadlines(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.postHeadlines(CreateUserDto);
  }

  @SkipJwt()
  @Post('update-hero-headings')
  updateHeroHeadings(@Body() updateUserDto: UpdateUserDto) {
    const { id } = updateUserDto; // Get ID from body
    return this.userService.updateHeroHeadings(id, updateUserDto); // Pass ID and DTO
  }

  @SkipJwt()
  // @UseGuards(JwtGuard)
  @Get('getheadingdata')
  findHeroHeadings(@Res() res: Response) {
    return this.userService.findHeroHeadings(res);
  }

  @SkipJwt()
  @Get('gethowitworkdata')
  findHowitWorkData(@Res() res: Response) {
    return this.userService.findHowitWorkData(res);
  }

  @SkipJwt()
  @Post('add-howit-workdata')
  postHowItWorks(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.postHowItWorks(CreateUserDto);
  }

  @SkipJwt()
  @Post('update-howit-workdata')
  updateHowItWorks(@Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const { id } = updateUserDto;
    return this.userService.updateHowItWorks(id, updateUserDto, res);
  }

  @Get('user-data')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

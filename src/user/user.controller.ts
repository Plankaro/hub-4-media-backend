import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipJwt } from 'src/auth/decorators/skip-jwt.decorator';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @SkipJwt()
  @Get('getheadingdata')
  findHeroHeadings( @Res() res: Response) {
    return this.userService.findHeroHeadings(res)
  }

  @Get('gethowitworkdata')
findHowitWorkData(@Res() res: Response){
  return this.userService.findHowitWorkData(res)
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

  // @SkipJwt()
  @Post('add-hero-headings')
  postHeadlines(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.postHeadlines(CreateUserDto);
  }


}

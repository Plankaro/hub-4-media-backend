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

  @SkipJwt()
  @Post('add-section-heading')
  async addSectionHeadings(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    return this.userService.addSectionHeadings(createUserDto, res);
  }

  @SkipJwt()
  @Post('update-add-headings/:id') // Route for updating AddHeadings by ID
  async updateAddHeadings(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateSectionHeadings(id, updateUserDto);
  }

  @SkipJwt()
  @Get('get-section-headings')
  findSectionHeadings(@Res() res: Response) {
    return this.userService.findSectionHeadings(res);
  }


  @SkipJwt()
  @Post('add-prise-plane')
  async addPrisePlane(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    return this.userService.addPrisePlane(createUserDto, res);
  }

  @SkipJwt()
  @Get('get-prise-plane')
  findPrisePlane(@Res() res: Response) {
    return this.userService.findPrisePlane(res);
  }

  @SkipJwt()
@Post('update-prise-plane/:id') // New route for updating a pricing plan by ID
async updatePrisePlane(
  @Param('id') id: string, // Extract the pricing plan ID from the route parameter
  @Body() updateUserDto: UpdateUserDto, // Updated data in the body
  @Res() res: Response, // Response object to send back the response
) {
  return this.userService.updatePrisePlane(id, updateUserDto, res);
}

@SkipJwt()
@Delete('delete-prise-plane/:id')
async deletePrisePlane(
  @Param('id') id: string,
  @Res() res: Response,
) {
  return this.userService.deletePrisePlane(id, res);
}

@SkipJwt()
@Post('add-offer-headings')
  async addOfferHeadings(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.addOfferHeadings(createUserDto, res);
  }

  @SkipJwt()
  @Post('update-offer-headings/:id')
  async updateOfferHeadings(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    return this.userService.updateOfferHeadings(id, updateUserDto, res);
  }

  @SkipJwt()
  @Get('get-offer-headings')
  async findOfferHeadings(@Res() res: Response) {
    return this.userService.findOfferHeadings(res);
  }

  @SkipJwt()
  @Delete('delete-offer-headings/:id')
  async deleteOfferHeadings(@Param('id') id: string, @Res() res: Response) {
    return this.userService.deleteOfferHeadings(id, res);
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

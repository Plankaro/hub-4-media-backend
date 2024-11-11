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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipJwt } from 'src/auth/decorators/skip-jwt.decorator';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  async updateAddHeadings(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.updateSectionHeadings(id, updateUserDto);
  }

  @SkipJwt()
  @Get('get-section-headings')
  findSectionHeadings(@Res() res: Response) {
    return this.userService.findSectionHeadings(res);
  }
  @SkipJwt()
  @Get('get-section-heading/:sectionName')
  async getSectionHeadingByName(
    @Param('sectionName') sectionName: string,
    @Res() res: Response,
  ) {
    return this.userService.findSectionHeadingByName(sectionName, res);
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
  async deletePrisePlane(@Param('id') id: string, @Res() res: Response) {
    return this.userService.deletePrisePlane(id, res);
  }

  @SkipJwt()
  @Post('add-offer-headings')
  async addOfferHeadings(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    return this.userService.addOfferHeadings(createUserDto, res);
  }

  @SkipJwt()
  @Post('update-offer-headings/:id')
  async updateOfferHeadings(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
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

  @SkipJwt()
  @Post('post-contact')
  async createContact(@Body() createContactDto: CreateUserDto) {
    return await this.userService.createContactDetail(createContactDto);
  }

  @SkipJwt()
  @Get('get-contacts')
  async getContacts() {
    return await this.userService.getContactDetails();
  }

  @SkipJwt()
  @Post('update-contact/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: Partial<CreateUserDto>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.userService.updateContactDetail(
      id,
      updateContactDto,
      file,
    );
  }

  @SkipJwt()
  @Post('post-user-enquery-data')
  async submitForm(@Body() formDto: CreateUserDto) {
    return await this.userService.submitForm(formDto);
  }

  @SkipJwt()
  @Post('add-aboutourcompany')
  async submitAbout(
    @Body('heading') heading: string,
    @Body('descriptionOne') descriptionOne: string,
    @Body('descriptionTwo') descriptionTwo: string,
    @Body('sideText') sideText: string,
    @Res() res: Response,
  ) {
    const result = await this.userService.createAbout({
      heading,
      descriptionOne,
      descriptionTwo,
      sideText,
    });
    return res.json(result);
  }

  @SkipJwt()
  @UseInterceptors(FileInterceptor('file'))
  @Post('update-aboutourcompany/:id')
  async updateAbout(
    @Param('id') id: string,
    @Body() updateAboutDto: Partial<CreateUserDto>,
    @UploadedFile() file?: Express.Multer.File,
    // @Body('heading') heading: string,
    // @Body('descriptionOne') descriptionOne: string,
    // @Body('descriptionTwo') descriptionTwo: string,
    // @Body('sideText') sideText: string,
  ) {
    return await this.userService.updateAbout(id, updateAboutDto, file);
  }

  @SkipJwt()
  @Get('get-abouour-company')
  async getAbouOurCompany() {
    return await this.userService.getAbouOurCompany();
  }
  @SkipJwt()
  @Post('add-our-principle')
  async addOurThreePrinciples(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    return this.userService.addOurThreePrinciples(createUserDto, res);
  }

  @SkipJwt()
  @Post('update-our-principle/:id')
  async updateOurThreePrinciples(
    @Param('id') id: string,
    @Body() updateOurThreePrinciples: UpdateUserDto,
    @Res() res: Response,
  ) {
    return this.userService.updateOurThreePrinciples(
      id,
      updateOurThreePrinciples,
      res,
    );
  }

  @SkipJwt()
  @Get('get-our-principle')
  async getOurThreePrinciples(@Res() res: Response) {
    return this.userService.getOurThreePrinciples(res);
  }
  @SkipJwt()
  @Post('add-whaychooseus')
  async addOurWhayChooseUs(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    return this.userService.addOurWhayChooseUs(createUserDto, res);
  }

  @SkipJwt()
  @UseInterceptors(FileInterceptor('file'))
  @Post('update-whaychooseus/:id')
  async updateWhayChooseUs(
    @Param('id') id: string,
    @Body() updateWhayChooseUsDTO: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const getjsondata=JSON.stringify(updateWhayChooseUsDTO)
    
    return this.userService.updateWhayChooseUs(id, getjsondata, file);
  }

  @SkipJwt()
  @Get('get-whaychooseus')
  async getWhayChooseUs(@Res() res: Response) {
    return this.userService.getWhayChooseUs(res);
  }
  @SkipJwt()
  @Post('upload-user-img')
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserImage(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadUserImage(file);
  }

  @SkipJwt()
  @Post('add-testimonial')
  @UseInterceptors(FileInterceptor('file')) // Intercept the file if provided
  async addTestimonial(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @UploadedFile() file?: Express.Multer.File, // Optional file
  ) {
    return this.userService.addTesimonials(createUserDto, res, file);
  }

  // Controller to update an existing testimonial by ID
  // @SkipJwt()
  // @Post('update-testimonial/:id')
  // async updateTesimonials(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,

  // ) {
  //   return this.userService.updateTesimonials(id, updateUserDto);
  // }

  @SkipJwt()
  @Post('update-testimonial/:id')
  @UseInterceptors(FileInterceptor('file')) // Use FileInterceptor to handle file uploads
  async updateTestimonials(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File, // Optional file parameter
  ) {
    return this.userService.updateTesimonials(id, updateUserDto, file);
  }

  // Controller to get all testimonials
  @SkipJwt()
  @Get('get-testimonials')
  async findTesimonials(@Res() res: Response) {
    return this.userService.findTesimonials(res);
  }

  // Controller to delete a testimonial by ID
  @SkipJwt()
  @Delete('delete-testimonial/:id')
  async deleteTestimonial(@Param('id') id: string, @Res() res: Response) {
    return this.userService.deleteTestimonial(id, res);
  }
}

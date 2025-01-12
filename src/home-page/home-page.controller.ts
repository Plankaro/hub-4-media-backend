import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // Res,
  // UploadedFile,
  // UseInterceptors,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
import {
  // ContactDto,
  HeroHeadingsDto,
  HowItWorksDto,
  OfferHeadingsDto,
  SuccessMessageDto,
} from './dto';
import { HomePageService } from './home-page.service';
import {
  HeroHeadings,
  HowItWorks,
  OfferHeadings,
  Plans,
  SectionHeadings,
} from './entities';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SectionHeadingDto } from './dto/section-headings.dto';
import { PricePlanDto } from './dto/price-plan.dto';

import { SectionName } from './types/section-name.enum';

@Controller('home')
export class HomePageController {
  constructor(private homePageService: HomePageService) {}

  @ApiOkResponse({ type: HeroHeadings })
  @Post('/hero-headings')
  addHeroHeadlines(@Body() body: HeroHeadingsDto): Promise<HeroHeadings> {
    return this.homePageService.addHeroHeadlines(body);
  }

  // @ApiOkResponse({ type: HeroHeadings })
  // @Put('/hero-headings/:id')
  // updateHeroHeadings(
  //   @Param('id') id: string,
  //   @Body() body: HeroHeadingsDto,
  // ): Promise<HeroHeadings> {
  //   return this.homePageService.updateHeroHeadings(id, body);
  // }

  @ApiOkResponse({ type: HeroHeadings })
  @Get('/hero-headings')
  getHeroHeadings(): Promise<HeroHeadings> {
    return this.homePageService.getHeroHeadings();
  }

  // Above all is correct

  @ApiOkResponse({ type: HowItWorks })
  @Post('/how-it-work')
  postHowItWorks(@Body() body: HowItWorksDto): Promise<HowItWorks> {
    return this.homePageService.addHowItWorks(body);
  }

  @ApiOkResponse({ type: HowItWorks })
  @Put('/how-it-work/:id')
  updateHowItWorks(
    @Param('id') id: string,
    @Body() body: HowItWorksDto,
  ): Promise<HowItWorks> {
    return this.homePageService.updateHowItWorks(id, body);
  }

  @ApiOkResponse({ type: HowItWorks })
  @Get('/how-it-works')
  gethowItWorks(): Promise<HowItWorks> {
    return this.homePageService.getHowItWork();
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  @Delete('how-it-works/:id')
  async deletehowItWorks(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.homePageService.deletehowItWorks(id);
  }

  @ApiOkResponse({ type: SectionHeadings })
  @Post('/section-headings')
  async addSectionHeadings(
    @Body() body: SectionHeadingDto,
  ): Promise<SectionHeadings> {
    return this.homePageService.addSectionHeadings(body);
  }

  @ApiOkResponse({ type: SectionHeadings })
  @Put('/section-headings/:sectionName')
  async updateAddHeadings(
    @Param('sectionName') sectionName: SectionName,
    @Body() body: SectionHeadingDto,
  ): Promise<SectionHeadings> {
    return this.homePageService.updateSectionHeadings(sectionName, body);
  }

  @ApiOkResponse({ type: [SectionHeadings] })
  @Get('/section-headings')
  findSectionHeadings(): Promise<SectionHeadings[]> {
    return this.homePageService.getSectionHeadings();
  }

  @ApiOkResponse({ type: SectionHeadings })
  @Get('/section-heading/:sectionName')
  async getSectionHeadingByName(
    @Param('sectionName') sectionName: SectionName,
  ): Promise<SectionHeadings> {
    return this.homePageService.getSectionHeadingByName(sectionName);
  }

  @ApiOkResponse({ type: Plans })
  @Post('/price-plan')
  async addPricePlan(@Body() body: PricePlanDto): Promise<Plans> {
    return this.homePageService.addPricePlan(body);
  }

  @ApiOkResponse({ type: Plans })
  @Put('/price-plan/:id') // New route for updating a pricing plan by ID
  async updatePricePlan(
    @Param('id') id: string, // Extract the pricing plan ID from the route parameter
    @Body() body: PricePlanDto, // Updated data in the body
  ): Promise<Plans> {
    return this.homePageService.updatePricePlan(id, body);
  }

  @ApiOkResponse({ type: Plans })
  @Get('/price-plan')
  getAllPricePlans(): Promise<Plans[]> {
    return this.homePageService.getAllPricePlans();
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  @Delete('price-plan/:id')
  async deletePricePlan(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.homePageService.deletePricePlanById(id);
  }

  @ApiCreatedResponse({ type: OfferHeadings })
  @Post('offer-headings')
  async addOfferHeadings(
    @Body() body: OfferHeadingsDto,
  ): Promise<OfferHeadings> {
    return this.homePageService.addOfferHeadings(body);
  }

  @ApiOkResponse({ type: OfferHeadings })
  @Put('offer-headings/:id')
  async updateOfferHeadings(
    @Param('id') id: string,
    @Body() body: OfferHeadingsDto,
  ): Promise<OfferHeadings> {
    return this.homePageService.updateOfferHeadings(id, body);
  }

  @ApiOkResponse({ type: OfferHeadings })
  @Get('offer-headings')
  async findOfferHeadings(): Promise<OfferHeadings[]> {
    return this.homePageService.getAllOfferHeadings();
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  @Delete('offer-headings/:id')
  async deleteOfferHeadings(
    @Param('id') id: string,
  ): Promise<SuccessMessageDto> {
    return this.homePageService.deleteOfferHeadings(id);
  }

  // @Put('contact/:id')
  // // @UseInterceptors(FileInterceptor('file'))
  // async updateContact(
  //   @Param('id') id: string,
  //   @Body() updateContactDto: Partial<ContactDto>,
  //   @UploadedFile() file?: Express.Multer.File,
  // ) {
  //   return await this.homePageService.updateContactDetail(
  //     id,
  //     updateContactDto,
  //     file,
  //   );
  // }

  // Also Sed emmail to user for successful enquiry

  // @Post('add-aboutourcompany')
  // async submitAbout(
  //   @Body('heading') heading: string,
  //   @Body('descriptionOne') descriptionOne: string,
  //   @Body('descriptionTwo') descriptionTwo: string,
  //   @Body('sideText') sideText: string,
  //   @Res() res: Response,
  // ) {
  //   const result = await this.homePageService.createAbout({
  //     heading,
  //     descriptionOne,
  //     descriptionTwo,
  //     sideText,
  //   });
  //   return res.json(result);
  // }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('update-aboutourcompany/:id')
  // async updateAbout(
  //   @Param('id') id: string,
  //   @Body() updateAboutDto: Partial<CreateUserDto>,
  //   @UploadedFile() file?: Express.Multer.File,
  //   // @Body('heading') heading: string,
  //   // @Body('descriptionOne') descriptionOne: string,
  //   // @Body('descriptionTwo') descriptionTwo: string,
  //   // @Body('sideText') sideText: string,
  // ) {
  //   return await this.homePageService.updateAbout(id, updateAboutDto, file);
  // }

  // @Get('get-abouour-company')
  // async getAbouOurCompany() {
  //   return await this.homePageService.getAbouOurCompany();
  // }

  // @Post('add-our-principle')
  // async addOurThreePrinciples(
  //   @Body() createUserDto: CreateUserDto,
  //   @Res() res: Response,
  // ) {
  //   return this.homePageService.addOurThreePrinciples(createUserDto, res);
  // }

  // @Post('update-our-principle/:id')
  // async updateOurThreePrinciples(
  //   @Param('id') id: string,
  //   @Body() updateOurThreePrinciples: UpdateUserDto,
  //   @Res() res: Response,
  // ) {
  //   return this.homePageService.updateOurThreePrinciples(
  //     id,
  //     updateOurThreePrinciples,
  //     res,
  //   );
  // }

  // @Get('get-our-principle')
  // async getOurThreePrinciples(@Res() res: Response) {
  //   return this.homePageService.getOurThreePrinciples(res);
  // }

  // @Post('add-whaychooseus')
  // async addOurWhayChooseUs(
  //   @Body() createUserDto: CreateUserDto,
  //   @Res() res: Response,
  // ) {
  //   return this.homePageService.addOurWhayChooseUs(createUserDto, res);
  // }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('update-whaychooseus/:id')
  // async updateWhayChooseUs(
  //   @Param('id') id: string,
  //   @Body() updateWhayChooseUsDTO: UpdateUserDto,
  //   @UploadedFile() file?: Express.Multer.File,
  // ) {
  //   const getjsondata = JSON.stringify(updateWhayChooseUsDTO);

  //   return this.homePageService.updateWhayChooseUs(id, getjsondata, file);
  // }

  // @Get('get-whaychooseus')
  // async getWhayChooseUs(@Res() res: Response) {
  //   return this.homePageService.getWhayChooseUs(res);
  // }

  // @Post('upload-user-img')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadUserImage(@UploadedFile() file: Express.Multer.File) {
  //   return this.homePageService.uploadUserImage(file);
  // }

  // @Post('add-testimonial')
  // @UseInterceptors(FileInterceptor('file')) // Intercept the file if provided
  // async addTestimonial(
  //   @Body() createUserDto: CreateUserDto,
  //   @Res() res: Response,
  //   @UploadedFile() file?: Express.Multer.File, // Optional file
  // ) {
  //   return this.homePageService.addTesimonials(createUserDto, res, file);
  // }

  // // Controller to update an existing testimonial by ID
  // //
  // // @Post('update-testimonial/:id')
  // // async updateTesimonials(
  // //   @Param('id') id: string,
  // //   @Body() updateUserDto: UpdateUserDto,

  // // ) {
  // //   return this.homePageService.updateTesimonials(id, updateUserDto);
  // // }

  // @Post('update-testimonial/:id')
  // @UseInterceptors(FileInterceptor('file')) // Use FileInterceptor to handle file uploads
  // async updateTestimonials(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  //   @UploadedFile() file?: Express.Multer.File, // Optional file parameter
  // ) {
  //   return this.homePageService.updateTesimonials(id, updateUserDto, file);
  // }

  // // Controller to get all testimonials

  // @Get('get-testimonials')
  // async findTesimonials(@Res() res: Response) {
  //   return this.homePageService.findTesimonials(res);
  // }

  // // Controller to delete a testimonial by ID

  // @Delete('delete-testimonial/:id')
  // async deleteTestimonial(@Param('id') id: string, @Res() res: Response) {
  //   return this.homePageService.deleteTestimonial(id, res);
  // }
}

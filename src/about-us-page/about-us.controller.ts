import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AboutUsPageService } from './about-us.service';
import {
  AboutOurCompanyDto,
  CreateOurPrincipleDto,
  CreateTestimonialDto,
  CreateWhyChooseUsDto,
  UpdateAboutOurCompanyDto,
  UpdateOurPrincipleDto,
  UpdateWhyChooseUsDto,
} from './dto';
import { AboutOurCompany } from './entities/about-our-company.entity';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OurThreePrinciples } from './entities/our-three-principles.entity';
import { Testimonials } from './entities/testimonials.entity';
import { WhyChooseUs } from './entities/why-choose-us.entity';
import { SuccessMessageDto } from 'src/common/dtos';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Controller('about-us')
export class AboutUsPageController {
  constructor(private aboutUsService: AboutUsPageService) {}

  /**
   * * Our Company
   */
  @Post('our-company')
  @ApiCreatedResponse({ type: AboutOurCompany })
  async createAboutOurCompany(
    @Body() body: AboutOurCompanyDto,
  ): Promise<AboutOurCompany> {
    return this.aboutUsService.createAboutOurCompany(body);
  }

  @Put('our-company/:id')
  @ApiCreatedResponse({ type: AboutOurCompany })
  async updateAboutOurCompany(
    @Param('id') id: string,
    @Body() body: UpdateAboutOurCompanyDto,
  ): Promise<AboutOurCompany> {
    return this.aboutUsService.updateAboutOurCompany(id, body);
  }

  @Delete('our-company/:id')
  @ApiOkResponse({ type: SuccessMessageDto })
  async deleteAboutOurCompany(
    @Param('id') id: string,
  ): Promise<SuccessMessageDto> {
    return this.aboutUsService.deleteAboutOurCompany(id);
  }

  @Get('our-company')
  @ApiOkResponse({ type: [AboutOurCompany] })
  async getAboutOurCompany(): Promise<AboutOurCompany[]> {
    return this.aboutUsService.getAboutOurCompany();
  }

  /**
   * * Our Three Principles
   */

  @Post('our-principle')
  @ApiCreatedResponse({ type: OurThreePrinciples })
  async addOurPrinciple(
    @Body() body: CreateOurPrincipleDto,
  ): Promise<OurThreePrinciples> {
    return this.aboutUsService.createOurPrinciple(body);
  }

  @Put('our-principle/:id')
  @ApiCreatedResponse({ type: OurThreePrinciples })
  async updateOurPrinciple(
    @Param('id') id: string,
    @Body() body: UpdateOurPrincipleDto,
  ): Promise<OurThreePrinciples> {
    return this.aboutUsService.updateOurPrinciple(id, body);
  }

  @Get('our-principles')
  @ApiOkResponse({ type: [OurThreePrinciples] })
  async getOurPrinciples(): Promise<OurThreePrinciples[]> {
    return this.aboutUsService.getAllOurPrinciples();
  }

  @Get('our-principles/:id')
  @ApiOkResponse({ type: OurThreePrinciples })
  async getOurPrincipleById(
    @Param('id') id: string,
  ): Promise<OurThreePrinciples> {
    return this.aboutUsService.getOurPrincipleById(id);
  }

  @Delete('our-principles/:id')
  @ApiOkResponse({ type: SuccessMessageDto })
  async deleteOurPrinciple(
    @Param('id') id: string,
  ): Promise<SuccessMessageDto> {
    return this.aboutUsService.deleteOurPrinciple(id);
  }

  /**
   * * Testimonials
   */

  @Post('testimonials')
  @ApiCreatedResponse({ type: Testimonials })
  async addTestimonial(
    @Body() body: CreateTestimonialDto,
  ): Promise<Testimonials> {
    return this.aboutUsService.createTestimonial(body);
  }

  @Put('testimonials/:id')
  @ApiCreatedResponse({ type: Testimonials })
  async updateTestimonial(
    @Param('id') id: string,
    @Body() body: UpdateTestimonialDto,
  ): Promise<Testimonials> {
    return this.aboutUsService.updateTestimonial(id, body);
  }

  @Get('testimonials')
  @ApiOkResponse({ type: [Testimonials] })
  async getTestimonials(): Promise<Testimonials[]> {
    return this.aboutUsService.getAllTestimonials();
  }

  @Get('testimonials/:id')
  @ApiOkResponse({ type: Testimonials })
  async getTestimonialById(@Param('id') id: string): Promise<Testimonials> {
    return this.aboutUsService.getTestimonialById(id);
  }

  @Delete('testimonials/:id')
  @ApiOkResponse({ type: SuccessMessageDto })
  async deleteTestimonialById(
    @Param('id') id: string,
  ): Promise<SuccessMessageDto> {
    return this.aboutUsService.deleteTestimonial(id);
  }

  /**
   * * Why Choose Us
   */

  @Post('why-choose-us')
  @ApiCreatedResponse({ type: WhyChooseUs })
  async createWhyChooseUs(
    @Body() body: CreateWhyChooseUsDto,
  ): Promise<WhyChooseUs> {
    return this.aboutUsService.createWhyChooseUs(body);
  }

  @Put('why-choose-us/:id')
  @ApiCreatedResponse({ type: WhyChooseUs })
  async updateWhyChooseUs(
    @Param('id') id: string,
    @Body() body: UpdateWhyChooseUsDto,
  ) {
    return this.aboutUsService.updateWhyChooseUs(id, body);
  }

  @Delete('why-choose-us/:id')
  @ApiCreatedResponse({ type: WhyChooseUs })
  async deleteWhyChooseUs(@Param('id') id: string) {
    return this.aboutUsService.deleteWhyChooseUs(id);
  }

  @Get('why-choose-us')
  @ApiOkResponse({ type: [WhyChooseUs] })
  async getWhyChooseUs(): Promise<WhyChooseUs[]> {
    return this.aboutUsService.getWhyChooseUs();
  }
}

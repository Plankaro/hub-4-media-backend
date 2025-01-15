import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateAgencyDto,
  CreatePartnerDto,
  HeroHeadingsDto,
  HowItWorksDto,
  OfferHeadingsDto,
  SuccessMessageDto,
  UpdateAgencyDto,
} from './dto';
import { HomePageService } from './home-page.service';
import {
  HeroHeadings,
  HowItWorks,
  OfferHeadings,
  Partners,
  Plans,
  SectionHeadings,
} from './entities';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SectionHeadingDto } from './dto/section-headings.dto';
import { PricePlanDto } from './dto/price-plan.dto';

import { SectionName } from './types/section-name.enum';
import { VerifiedAgencies } from './entities/verified-agencies.entity';

@Controller('home')
export class HomePageController {
  constructor(private homePageService: HomePageService) {}

  @ApiOkResponse({ type: HeroHeadings })
  @Post('/hero-headings')
  addHeroHeadings(@Body() body: HeroHeadingsDto): Promise<HeroHeadings> {
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

  @ApiOkResponse({ type: [HowItWorks] })
  @Get('/how-it-works')
  getAllHowItWorks(): Promise<HowItWorks[]> {
    return this.homePageService.getHowItWork();
  }

  @ApiOkResponse({ type: HowItWorks })
  @Get('/how-it-works/:id')
  getHowItWorksById(@Param('id') id: string): Promise<HowItWorks> {
    return this.homePageService.getHowItWorkById(id);
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

  @ApiOkResponse({ type: [Plans] })
  @Get('/price-plan')
  getAllPricePlans(): Promise<Plans[]> {
    return this.homePageService.getAllPricePlans();
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  @Delete('price-plan/:id')
  async deletePricePlan(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.homePageService.deletePricePlanById(id);
  }

  @Post('/partner')
  @ApiOkResponse({ type: Partners })
  async addPartner(@Body() body: CreatePartnerDto): Promise<Partners> {
    return this.homePageService.createPartner(body);
  }

  @Put('/partner/:id')
  @ApiOkResponse({ type: Partners })
  async updatePartner(
    @Param('id') id: string,
    @Body() body: CreatePartnerDto,
  ): Promise<Partners> {
    return this.homePageService.updatePartner(id, body);
  }

  @ApiOkResponse({ type: [Partners] })
  @Get('/partner')
  getAllPartners(): Promise<Partners[]> {
    return this.homePageService.getAllPartners();
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  @Delete('partner/:id')
  async deletePartner(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.homePageService.deletePartner(id);
  }

  @Post('/agencies')
  @ApiCreatedResponse({ type: VerifiedAgencies })
  async addAgency(@Body() body: CreateAgencyDto): Promise<VerifiedAgencies> {
    return this.homePageService.createAgency(body);
  }

  @Put('/agencies/:id')
  @ApiCreatedResponse({ type: VerifiedAgencies })
  async updateAgency(
    @Param('id') id: string,
    @Body() body: UpdateAgencyDto,
  ): Promise<VerifiedAgencies> {
    return this.homePageService.updateAgency(id, body);
  }

  @ApiOkResponse({ type: [VerifiedAgencies] })
  @Get('/agencies')
  getAllAgencies(): Promise<VerifiedAgencies[]> {
    return this.homePageService.getAllAgencies();
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  @Delete('agencies/:id')
  async deleteAgency(@Param('id') id: string): Promise<SuccessMessageDto> {
    return this.homePageService.deleteAgency(id);
  }

  @ApiCreatedResponse({ type: OfferHeadings })
  @Post('offer-headings')
  async createOfferHeading(
    @Body() body: OfferHeadingsDto,
  ): Promise<OfferHeadings> {
    return this.homePageService.addOfferHeadings(body);
  }

  // @ApiOkResponse({ type: OfferHeadings })
  // @Put('offer-headings/:id')
  // async updateOfferHeadings(
  //   @Param('id') id: string,
  //   @Body() body: OfferHeadingsDto,
  // ): Promise<OfferHeadings> {
  //   return this.homePageService.updateOfferHeadings(id, body);
  // }

  @ApiOkResponse({ type: OfferHeadings })
  @Get('offer-headings')
  async getOfferHeading(): Promise<OfferHeadings> {
    return this.homePageService.getOfferHeading();
  }

  // @ApiOkResponse({ type: SuccessMessageDto })
  // @Delete('offer-headings/:id')
  // async deleteOfferHeadings(
  //   @Param('id') id: string,
  // ): Promise<SuccessMessageDto> {
  //   return this.homePageService.deleteOfferHeadings(id);
  // }
}

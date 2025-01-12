import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ContactDto } from 'src/home-page/dto';
import { ContactDetails, UserEnquiry } from 'src/home-page/entities';
import { ContactUsPageService } from './contact-us.service';
import { UserEnquiryDto } from './dto';

@Controller('contact-us')
export class ContactUsPageController {
  constructor(private contactUsPageService: ContactUsPageService) {}

  @ApiCreatedResponse({ type: ContactDetails })
  @Post('/')
  async createContact(@Body() body: ContactDto): Promise<ContactDetails> {
    return await this.contactUsPageService.createContactDetails(body);
  }

  @ApiOkResponse({ type: ContactDetails })
  @Get('/')
  async getContacts(): Promise<ContactDetails> {
    return await this.contactUsPageService.getContactDetails();
  }

  @ApiCreatedResponse({ type: UserEnquiry })
  @Post('user-inquiry')
  async userEnquiry(@Body() body: UserEnquiryDto) {
    return await this.contactUsPageService.userEquiry(body);
  }

  @ApiOkResponse({ type: [UserEnquiry] })
  @Get('/user-enquiries')
  getAllUserEnquiries(): Promise<UserEnquiry[]> {
    return this.contactUsPageService.getAllUserEnquiries();
  }
}

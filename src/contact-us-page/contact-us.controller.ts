import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ContactDto } from 'src/home-page/dto';
import { ContactDetails } from 'src/home-page/entities';
import { ContactUsPageService } from './contact-us.service';

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
  async getContacts() {
    return await this.contactUsPageService.getContactDetails();
  }
}

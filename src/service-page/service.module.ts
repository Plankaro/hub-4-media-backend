import { Module } from '@nestjs/common';
import { ServicePageController } from './service.controller';
import { ServicePageService } from './service.service';

@Module({
  controllers: [ServicePageController],
  providers: [ServicePageService],
})
export class ServicePageModule {}

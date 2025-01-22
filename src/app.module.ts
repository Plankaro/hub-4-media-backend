import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './users/users.module';
import {
  Environment,
  EnvironmentVariable,
  validate,
} from './utils/env.validation';
import { HomePageModule } from './home-page/home-page.module';
import { ContactUsPageModule } from './contact-us-page/contact-us.module';
import { ServicePageModule } from './service-page/service.module';
import { AboutUsPageModule } from './about-us-page/about-us.module';
import { BlogModule } from './blog/blog.module';
import { AgencyModule } from './agency/agency.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`, `.env.local`, `.env.production`],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<EnvironmentVariable, true>,
      ) => getTypeOrmConfig(configService),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 30 * 1000, // 30s
        limit: 30, // Later reduce this requests
      },
    ]),
    AuthModule,
    UsersModule,
    CloudinaryModule,
    EmailModule,
    HomePageModule,
    ContactUsPageModule,
    ServicePageModule,
    AboutUsPageModule,
    ServicePageModule,
    BlogModule,
    AgencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

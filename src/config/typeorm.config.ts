import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import {
  Agency,
  Contact,
  LocationEntity,
  Social,
  Timeslot,
} from 'src/agency/entities';
import { AgencyCategory } from 'src/agency/entities/category.entity';
import { AgencyServiceEntity } from 'src/agency/entities/service.entity';
import { AgencySubCategory } from 'src/agency/entities/sub-category';
import { UserOtp } from 'src/auth/user-otp.entity';
import { BlogCategory, BlogPost } from 'src/blog/entities';
import { ImageEntity } from 'src/common/entities';
import {
  AboutOurCompany,
  ContactDetails,
  HeroHeadings,
  HowItWorks,
  OfferHeadings,
  OurThreePrinciples,
  Partners,
  Plans,
  SectionHeadings,
  Testimonials,
  UserEnquiry,
  WhyChooseUs,
} from 'src/home-page/entities';
import { VerifiedAgencies } from 'src/home-page/entities/verified-agencies.entity';
import {
  ExtraService,
  Service,
  ServiceCategory,
  ServiceSubCategory,
  TimeSlot,
  TimeSlotsOfDay,
} from 'src/service-page/entities';
import { ServicePricing } from 'src/service-page/entities/pricing.entity';
import { Review } from 'src/service-page/entities/review.entity';
import { User } from 'src/users/user.entity';
import { EnvironmentVariable } from 'src/utils/env.validation';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

const configService = new ConfigService<EnvironmentVariable, true>();

const commonTypeOrmConfig: DataSourceOptions = {
  logging: configService.get('NODE_ENV') !== 'production' ? true : false,
  type: 'postgres',
  entities: [
    User,
    UserOtp,
    HeroHeadings,
    HowItWorks,
    SectionHeadings,
    Testimonials,
    WhyChooseUs,
    OurThreePrinciples,
    AboutOurCompany,
    UserEnquiry,
    ContactDetails,
    OfferHeadings,
    Plans,
    ServiceCategory,
    ImageEntity,
    ServiceSubCategory,
    TimeSlot,
    TimeSlotsOfDay,
    ExtraService,
    Service,
    Partners,
    BlogCategory,
    BlogPost,
    Review,
    ServicePricing,
    VerifiedAgencies,
    Agency,
    Contact,
    Social,
    LocationEntity,
    Timeslot,
    AgencyServiceEntity,
    AgencyCategory,
    AgencySubCategory,
  ],
  synchronize: true,
  ssl: false,
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<DataSourceOptions> => {
  return {
    ...commonTypeOrmConfig,
    url: configService.getOrThrow<string>('DB_URL'),
  };
};

const datasource = new DataSource({
  ...commonTypeOrmConfig,
  url: configService.getOrThrow<string>('DB_URL'),
  migrations: ['migrations/**'],
});

export default datasource;

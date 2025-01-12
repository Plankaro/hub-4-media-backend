import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/users/user.entity';
import { UserOtp } from 'src/auth/user-otp.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {
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
} from 'src/home-page/entities';
import { EnvironmentVariable } from 'src/utils/env.validation';
import {
  ExtraService,
  Service,
  ServiceCategory,
  ServiceSubCategory,
  TimeSlot,
} from 'src/service-page/entities';
import { ImageEntity } from 'src/common/entities';
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
    Service,
    TimeSlot,
    ExtraService,
  ],
  synchronize: false,
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

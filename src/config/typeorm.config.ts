import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/users/user.entity';
import { UserOtp } from 'src/auth/user-otp.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
config();

const configService = new ConfigService();

const commonTypeOrmConfig: DataSourceOptions = {
  logging: true,
  type: 'postgres',
  entities: [User, UserOtp],
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

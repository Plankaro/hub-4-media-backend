import 'multer';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from './utils/env.validation';
import { yellow } from '@nestjs/common/utils/cli-colors.util';
import { AppModule } from './app.module';

const globalPrefix = 'api';
const port = process.env.PORT || 5000;
const logger = new Logger('Main');

const config = new ConfigService<EnvironmentVariable, true>();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  await app.listen(port);
}

const start = Date.now();
bootstrap().then(() => {
  const end = Date.now();
  logger.log(`🚀 Application started in ${yellow(end - start + 'ms')}`);
  logger.log(
    `🚀 ${
      config.get('NODE_ENV') || 'development'
    } is running on: http://localhost:${port}/${globalPrefix} 🚀🚀`,
  );
});

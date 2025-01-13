/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './swagger';
import { yellow } from '@nestjs/common/utils/cli-colors.util';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from './utils/env.validation';
import { NestExpressApplication } from '@nestjs/platform-express';
const port = process.env.PORT || 5000;
const globalPrefix = 'api';
const config = new ConfigService<EnvironmentVariable, true>();
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.enableCors({
  //   // origin: process.env.UI_BASE_URL,
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });
  app.enableCors();

  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Strip properties that do not have decorators,
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix(globalPrefix);

  if (config.get('NODE_ENV') !== 'production') {
    createSwaggerDocument(app);
  }

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

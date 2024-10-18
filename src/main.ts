import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globleprifix='/api'
  app.setGlobalPrefix(globleprifix)
  app.enableCors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();

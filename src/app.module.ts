import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProvidersModule } from './providers/providers.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  }),

  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URI'),
    }),
  }),

  ProvidersModule,

  AdminModule,

  UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

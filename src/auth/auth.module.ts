import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Otp, OtpSchema, UserSchema } from './schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { OtpService } from './otp.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';

@Module({
  imports:[ PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
  ],
   
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,OtpService,{provide:APP_GUARD,useClass:JwtGuard}],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}

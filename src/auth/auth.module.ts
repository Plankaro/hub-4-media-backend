import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy, JwtStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOtp } from './user-otp.entity';
import { UserOtpService } from './user-otp.service';
import { TokenService } from './token.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    forwardRef(() => UsersModule),
    EmailModule,
    TypeOrmModule.forFeature([UserOtp]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserOtpService,
    TokenService,
    JwtStrategy,
    GoogleStrategy,
  ],
  exports: [
    JwtStrategy,
    GoogleStrategy,
    PassportModule,
    TypeOrmModule.forFeature([UserOtp]),
  ],
})
export class AuthModule {}

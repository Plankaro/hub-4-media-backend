import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './gaurd/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from 'src/utils/env.validation';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService<EnvironmentVariable, true>) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
        verifyOptions: {
          ignoreExpiration: false,
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    UserService,
    EmailService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

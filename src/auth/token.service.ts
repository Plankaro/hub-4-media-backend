import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { JwtPayload } from '../users/types/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { TokenType } from '../users/types/token-type';
import { Response } from 'express';
import { EnvironmentVariable } from 'src/utils/env.validation';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<EnvironmentVariable, true>,
  ) {}

  setRefreshTokenCookie = (refreshToken: string, res: Response) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== 'development',
      domain: this.configService.get('COOKIES_DOMAIN'),
    });
  };

  clearRefreshTokenCookie = (res: Response) => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      domain: this.configService.get('COOKIES_DOMAIN'),
    });
  };

  async verifyToken(token: string, tokenType: TokenType) {
    try {
      const result = this.jwtService.verify(token, {
        secret: this.getTokenSecret(tokenType),
      });
      return result as JwtPayload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async generateAccessToken(user: User) {
    const accessToken = await this.generateToken(user, TokenType.ACCESS, '15m');
    return { accessToken };
  }

  async generateRefreshToken(user: User) {
    const refreshToken = await this.generateToken(
      user,
      TokenType.REFRESH,
      '7d',
    );
    return { refreshToken };
  }

  async generateValidationToken(user: User) {
    const validationToken = await this.generateToken(
      user,
      TokenType.VALIDATION,
      '1h',
    );
    return { validationToken };
  }

  private getTokenSecret(tokenType: TokenType) {
    const tokenToSecretMap: Record<TokenType, string> = {
      [TokenType.ACCESS]: 'ACCESS_TOKEN_JWT_SECRET',
      [TokenType.REFRESH]: 'REFRESH_TOKEN_JWT_SECRET',
      [TokenType.VALIDATION]: 'VALIDATION_TOKEN_JWT_SECRET',
    };

    return this.configService.get(
      tokenToSecretMap[tokenType] as keyof EnvironmentVariable,
    );
  }

  private async generateToken(
    user: User,
    tokenType: TokenType,
    expiresIn: string | number,
  ) {
    const payload: JwtPayload = {
      userRole: user.role,
      email: user.email,
      id: user.id,
      isAdmin: user.isAdmin,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn,
      secret: this.getTokenSecret(tokenType),
    });

    return token;
  }
}

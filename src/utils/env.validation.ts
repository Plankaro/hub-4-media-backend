import { Type, plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
  validateSync,
} from 'class-validator';


export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class EnvironmentVariable {
  @IsOptional()
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV: Environment;

  @ValidateIf((o) => o.NODE_ENV === Environment.Production)
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  PORT: number;

  @IsUrl({ protocols: ['postgresql'] })
  @IsNotEmpty()
  DB_URL: string;

  // JWT Secrets
  @IsNotEmpty()
  ACCESS_TOKEN_JWT_SECRET: string;

  @IsNotEmpty()
  REFRESH_TOKEN_JWT_SECRET: string;

  @IsNotEmpty()
  VALIDATION_TOKEN_JWT_SECRET: string;

  // Google OAuth
  @IsNotEmpty()
  GOOGLE_OAUTH_CLIENT_ID: string;

  @IsNotEmpty()
  GOOGLE_OAUTH_CLIENT_SECRET: string;

  @IsUrl()
  @IsNotEmpty()
  GOOGLE_OAUTH_REDIRECT_URL: string;

  // SMTP Configuration
  @IsNotEmpty()
  SMTP_HOST: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  SMTP_PORT: number;

  @IsNotEmpty()
  SMTP_SERVICE: string;

  @IsNotEmpty()
  SMTP_MAIL: string;

  @IsNotEmpty()
  SMTP_MAIL_NAME: string;

  @IsNotEmpty()
  SMTP_MAIL_EMAIL: string;

  @IsNotEmpty()
  SMTP_PASSWORD: string;

  // Razorpay Configuration
  @IsNotEmpty()
  RAZORPAY_KEY_ID: string;

  @IsNotEmpty()
  RAZORPAY_KEY_SECRET: string;

  @IsNotEmpty()
  WEBHOOK_SECRET: string;

  @IsNotEmpty()
  Merchant_Key: string;

  @IsNotEmpty()
  Merchant_Salt: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  Merchant_Id: number;

  // Email Microservice Port
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  EMAIL_MICROSERVICE_PORT: number;

  // Auth Api Url 
  @IsUrl()
  @IsNotEmpty()
  AUTH_UI_URL: string;

  // COOKIES_DOMAIN
  @IsNotEmpty()
  @IsString()
  COOKIES_DOMAIN: string
}

export type EnvironmentVariableType = EnvironmentVariable;

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariable, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

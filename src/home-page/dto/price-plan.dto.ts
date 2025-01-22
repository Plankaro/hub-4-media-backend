import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsBoolean,
  ValidateNested,
  IsOptional,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class PlanFeature {
  @ApiProperty({ description: 'Feature text.', example: 'Feature 1' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: 'Is this feature included?', example: true })
  @IsBoolean()
  included: boolean;
}

export class CreatePlanDto {
  @ApiProperty({
    description: 'Name of the plan.',
    example: 'Basic',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Price amount for the service.',
    example: 99.99,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Description of the plan.',
    example: 'This is the basic plan',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Billing cycle for the plan.',
    example: 'monthly',
    enum: ['monthly', 'yearly'],
  })
  @IsNotEmpty()
  @IsEnum(['monthly', 'yearly'], {
    message: 'Billing cycle must be either "monthly" or "yearly".',
  })
  billingCycle: 'monthly' | 'yearly';

  @ApiProperty({
    description: 'Features of the plan.',
    type: [PlanFeature],
    example: [
      { text: 'Feature 1', included: true },
      { text: 'Feature 2', included: false },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanFeature)
  features: PlanFeature[];

  @ApiProperty({
    description: 'Is this plan popular?',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isPopular?: boolean;
}

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}

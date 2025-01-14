import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsOptional, IsString, MaxLength, Min, IsNotEmpty } from 'class-validator';

export class CreateServicePricingDto {
    @ApiProperty({ description: 'Price amount for the service.', example: 99.99 })
    @IsDecimal()
    @Min(0)
    offerPrice: number;

    @ApiProperty({ description: 'Price amount for the service.', example: 99.99 })
    @IsDecimal()
    @Min(0)
    salePrice: number;

    @ApiProperty({ description: 'Currency code for the price (ISO 4217 format).', example: 'USD' })
    @IsString()
    @MaxLength(3)
    @IsNotEmpty()
    currency: string;

    @ApiProperty({ description: 'Duration unit for the service pricing.', example: 'hour' })
    @IsEnum(['hour', 'day', 'week', 'month', 'year'])
    @IsNotEmpty()
    duration: 'hour' | 'day' | 'week' | 'month' | 'year';

    @ApiProperty({
        description: 'Additional description or notes for this pricing.',
        example: 'Special discount for regular customers.',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    notes?: string;

    // @ApiProperty({ description: 'The service this pricing is associated with.' })
    // serviceId: string;
}

export class UpdateServicePricingDto {
    @ApiProperty({ description: 'Price amount for the service.', example: 99.99 })
    @IsDecimal()
    @Min(0)
    offerPrice: number;

    @ApiProperty({ description: 'Price amount for the service.', example: 99.99 })
    @IsDecimal()
    @Min(0)
    salePrice: number;

    @ApiProperty({ description: 'Currency code for the price (ISO 4217 format).', example: 'USD' })
    @IsString()
    @MaxLength(3)
    @IsNotEmpty()
    currency: string;

    @ApiProperty({ description: 'Duration unit for the service pricing.', example: 'hour' })
    @IsEnum(['hour', 'day', 'week', 'month', 'year'])
    @IsNotEmpty()
    duration: 'hour' | 'day' | 'week' | 'month' | 'year';

    @ApiProperty({
        description: 'Additional description or notes for this pricing.',
        example: 'Special discount for regular customers.',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    notes?: string;

    @ApiProperty({ description: 'The service this pricing is associated with.' })
    serviceId: string;
}

export class ReturnServicePricingDto {
    @ApiProperty({ description: 'Unique identifier for the service pricing.' })
    id: number;

    @ApiProperty({ description: 'Price amount for the service.', example: 99.99 })
    offerPrice: number;

    @ApiProperty({ description: 'Price amount for the service.', example: 99.99 })
    salePrice: number;

    @ApiProperty({ description: 'Currency code for the price (ISO 4217 format).', example: 'USD' })
    currency: string;

    @ApiProperty({ description: 'Duration unit for the service pricing.', example: 'hour' })
    duration: 'hour' | 'day' | 'week' | 'month' | 'year';

    @ApiProperty({
        description: 'Additional description or notes for this pricing.',
        example: 'Special discount for regular customers.',
        required: false,
    })
    notes?: string;

    @ApiProperty({ description: 'The service this pricing is associated with.' })
    serviceId: string;

    @ApiProperty({ description: 'Date when this pricing was created.' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when this pricing was last updated.' })
    updatedAt: Date;

    @ApiProperty({ description: 'Date when this pricing was deleted (soft delete).' })
    deletedAt: Date;
}

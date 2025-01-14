import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Service } from './service.entity'; // Assuming the Service entity is in the same folder

@Entity("service_pricing")
export class ServicePricing {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'Unique identifier for the service pricing.' })
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    @ApiProperty({ description: 'Price amount for the service.', example: 99.99 })
    offerPrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    @ApiProperty({ description: 'Price amount for the service.', example: 99.99 })
    salePrice: number;

    @Column({ length: 3 })
    @ApiProperty({ description: 'Currency code for the price (ISO 4217 format).', example: 'USD' })
    currency: string;

    @Column({ type: 'enum', enum: ['hour', 'day', 'week', 'month', 'year'], default: 'hour' })
    @ApiProperty({ description: 'Duration unit for the service pricing.', example: 'hour' })
    duration: 'hour' | 'day' | 'week' | 'month' | 'year';

    @Column('text', { nullable: true })
    @ApiProperty({ description: 'Additional description or notes for this pricing.', example: 'Special discount for regular customers.' })
    notes?: string;

    @ManyToOne(() => Service, (service) => service.pricings, { onDelete: 'CASCADE' })
    @JoinColumn()
    @ApiProperty({ description: 'The service this pricing is associated with.' })
    service: Service;
}

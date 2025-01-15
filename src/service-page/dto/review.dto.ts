import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { UserEnquiryDto } from 'src/contact-us-page/dto';
import { CreateServiceDto } from './create-service.dto';

/**
 * DTO for creating a new review.
 */
export class CreateReviewDto {
  @ApiProperty({
    description: 'Unique identifier for the service being reviewed.',
    example: 'd6f9a8cd-98c3-4c8b-97ad-b7d465c3e0c8',
  })
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({
    description:
      'Rating provided by the user for the service. Value between 0 and 5.',
    example: 4.5,
    minimum: 0,
    maximum: 5,
  })
  @IsDecimal()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Detailed review provided by the user.',
    example: 'The service was excellent and the staff was friendly.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000) // Maximum length of review text
  review: string;

  @ApiProperty({
    description:
      'ID of the user submitting the review. Automatically fetched from the authenticated user.',
    example: 'd96c2d57-d6fa-4fe3-b69b-23993e24a44b',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string; // Typically, this would be derived from the authenticated user

  @ApiProperty({
    description:
      'Optional: Additional notes or metadata related to the review.',
    required: false,
    example: 'Submitted by a verified buyer',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500) // Optional field with max length for notes
  additionalNotes?: string;
}

/**
 * DTO for updating an existing review.
 */
export class UpdateReviewDto {
  @ApiProperty({
    description: 'Unique identifier for the review.',
    example: 'd6f9a8cd-98c3-4c8b-97ad-b7d465c3e0c8',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Rating provided by the user for the service.',
    example: 4.5,
  })
  @IsDecimal()
  @Min(0)
  @Max(5)
  @IsOptional() // Optional for updates
  rating?: number;

  @ApiProperty({
    description: 'Detailed review provided by the user.',
    example: 'The service was good but could improve in response time.',
  })
  @IsString()
  @MaxLength(1000)
  @IsOptional() // Optional for updates
  review?: string;

  @ApiProperty({
    description:
      'ID of the service being reviewed. This cannot be updated as the review is tied to a service.',
    example: 'd6f9a8cd-98c3-4c8b-97ad-b7d465c3e0c8',
  })
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({
    description:
      'ID of the user submitting this review. Cannot be updated as it corresponds to the review creator.',
    example: 'd96c2d57-d6fa-4fe3-b69b-23993e24a44b',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

/**
 * DTO for returning review data (used in response).
 */
export class ReviewDto {
  @ApiProperty({
    description: 'Unique identifier for the review.',
    example: 'd6f9a8cd-98c3-4c8b-97ad-b7d465c3e0c8',
  })
  id: string;

  @ApiProperty({
    description: 'Rating provided by the user for the service.',
    example: 4.5,
    minimum: 0,
    maximum: 5,
  })
  rating: number;

  @ApiProperty({
    description: 'Detailed review provided by the user.',
    example: 'The service was excellent and the staff was friendly.',
  })
  review: string;

  @ApiProperty({
    description: 'Date and time when the review was submitted.',
    example: '2025-01-14T12:34:56Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the review was last updated.',
    example: '2025-01-15T09:34:56Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The service this review is associated with.',
    type: () => CreateServiceDto, // Assuming ServiceDto is already created
  })
  service: CreateServiceDto;

  @ApiProperty({
    description: 'The user who submitted this review.',
    type: () => UserEnquiryDto, // Assuming UserDto is already created
  })
  user: UserEnquiryDto;

  @ApiProperty({
    description: 'Additional notes or metadata related to the review (if any).',
    example: 'Verified purchase from a regular customer.',
    required: false,
  })
  @IsOptional()
  additionalNotes?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  AboutOurCompany,
  ContactDetails,
  OurThreePrinciples,
  Testimonials,
  WhyChooseUs,
} from 'src/home-page/entities';
import { Service, ServiceCategory } from 'src/service-page/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('images')
export class ImageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  imageName: string;

  @ApiProperty()
  @Column()
  imageUrl: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => ServiceCategory, (category) => category.image, {
    nullable: true,
    cascade: true,
  })
  category?: ServiceCategory;

  @OneToOne(() => ContactDetails, (contact) => contact.image, {
    nullable: true,
    cascade: true,
  })
  aboutUs: ContactDetails;

  @OneToOne(() => AboutOurCompany, (about) => about.image, {
    nullable: true,
    cascade: true,
  })
  aboutOurCompany: AboutOurCompany;

  @OneToOne(() => OurThreePrinciples, (principle) => principle.image, {
    nullable: true,
    cascade: true,
  })
  principle: OurThreePrinciples;

  @OneToOne(() => Testimonials, (testimonial) => testimonial.image, {
    nullable: true,
    cascade: true,
  })
  testimonial: Testimonials;

  @OneToOne(() => WhyChooseUs, (choose) => choose.image, {
    nullable: true,
    cascade: true,
  })
  chooseUs: WhyChooseUs;

  @ManyToOne(() => Service, (service) => service.images, {
    nullable: true,
    cascade: true,
  })
  service: Service;
}

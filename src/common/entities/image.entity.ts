import { ApiProperty } from '@nestjs/swagger';
import { BlogPost } from 'src/blog/entities';
import {
  AboutOurCompany,
  ContactDetails,
  HeroHeadings,
  HowItWorks,
  OfferHeadings,
  OurThreePrinciples,
  Testimonials,
  WhyChooseUs,
} from 'src/home-page/entities';
import {
  ExtraService,
  Service,
  ServiceCategory,
} from 'src/service-page/entities';
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
  })
  category?: ServiceCategory;

  @OneToOne(() => ContactDetails, (contact) => contact.image, {
    nullable: true,
  })
  aboutUs: ContactDetails;

  @OneToOne(() => AboutOurCompany, (about) => about.image, {
    nullable: true,
  })
  aboutOurCompany: AboutOurCompany;

  @OneToOne(() => OurThreePrinciples, (principle) => principle.image, {
    nullable: true,
  })
  principle: OurThreePrinciples;

  @OneToOne(() => Testimonials, (testimonial) => testimonial.image, {
    nullable: true,
  })
  testimonial: Testimonials;

  @OneToOne(() => WhyChooseUs, (choose) => choose.image, {
    nullable: true,
  })
  chooseUs: WhyChooseUs;

  @OneToOne(() => WhyChooseUs, (partner) => partner.image, {
    nullable: true,
  })
  partner: WhyChooseUs;

  @OneToOne(() => OfferHeadings, (offer) => offer.image, {
    nullable: true,
  })
  offer: OfferHeadings;

  @OneToOne(() => HowItWorks, (works) => works.image, {
    nullable: true,
  })
  howItWorks: HowItWorks;

  @OneToOne(() => BlogPost, (blog) => blog.image, {
    nullable: true,
  })
  blog: BlogPost;

  @OneToOne(() => HeroHeadings, (hero) => hero.image, {
    nullable: true,
  })
  heroHeading: HeroHeadings;

  @ManyToOne(() => Service, (service) => service.images, {
    nullable: true,
  })
  service: Service;

  @ManyToOne(() => ExtraService, (extraService) => extraService.images, {
    nullable: true,
  })
  extraService: ExtraService;
}

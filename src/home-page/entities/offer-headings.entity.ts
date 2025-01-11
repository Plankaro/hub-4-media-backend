import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OfferHeadings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  heading: string;

  @Column({ nullable: false })
  subheading: string;

  @Column({ nullable: false })
  description: string;
}

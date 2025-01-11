import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SectionHeadings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  sectionName?: string;

  @Column()
  heading: string;

  @Column({ nullable: true })
  subheading?: string;
}

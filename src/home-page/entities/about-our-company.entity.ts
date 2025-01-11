import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AboutOurCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  heading: string;

  @Column()
  descriptionOne: string;

  @Column({ nullable: true })
  descriptionTwo?: string;

  @Column()
  sideText: string;

  @Column({ nullable: true, default: '' })
  img: string;

  @Column({ nullable: true, default: '' })
  imgPublicID: string;
}

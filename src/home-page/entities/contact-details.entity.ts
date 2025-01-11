import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ContactDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phonNumber: string;

  @Column({ nullable: true })
  extraPhonNumber?: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  extraEmail?: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  googelMapLocation?: string;

  @Column({ nullable: true, default: '' })
  img: string;

  @Column({ nullable: true, default: '' })
  imgPublicID: string;
}

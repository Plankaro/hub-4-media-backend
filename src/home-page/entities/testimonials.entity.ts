import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Testimonials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: '' })
  profilePictureUrl: string;

  @Column({ nullable: true, default: '' })
  imagePublicId: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @Column()
  name: string;

  @Column()
  designation: string;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AuthProvider } from './types/account-type';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserOtp } from '../auth/user-otp.entity';
import { UserRole } from './types/user-role';
import { Service } from 'src/service-page/entities';
import { Review } from 'src/service-page/entities/review.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ default: false })
  isEmailVerified: boolean;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  bio: string;

  @ApiProperty()
  @Column({ default: false })
  hasSetPassword: boolean;

  @ApiProperty()
  @Column({ default: false })
  hasOnboarded: boolean;

  @ApiProperty()
  @Column({ default: false })
  isAdmin: boolean;

  @ApiProperty()
  @Column({ default: '' })
  firstName: string;

  @ApiProperty()
  @Column({ default: '' })
  lastName: string;

  @ApiProperty()
  @Column({ nullable: true, type: 'simple-array', array: true })
  languages: string[];

  @ApiProperty()
  @Column({ default: 'NA', nullable: true })
  country: string;

  @ApiProperty()
  @Column({ default: 'NA', nullable: true })
  region: string;

  @ApiProperty()
  @Column({ default: 'NA', nullable: true })
  timezone: string;

  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.EMAIL,
  })
  provider: string;

  @Column({ default: '', nullable: true })
  providerAuthId: string;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EXTERNAL_USER,
  })
  role: UserRole;

  @OneToOne(() => UserOtp, (userOtp) => userOtp.user, { cascade: true })
  @Exclude({ toPlainOnly: true })
  otpDetails: UserOtp;

  @Column({ nullable: true, length: 1024 })
  @Exclude({ toPlainOnly: true })
  refreshToken?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Service, (service) => service.provider)
  services: Service[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}

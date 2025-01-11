import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthProvider } from './types/account-type';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserOtp } from '../auth/user-otp.entity';
import { UserRole } from './types/user-role';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
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
}

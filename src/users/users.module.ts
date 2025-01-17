import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { AbilityModule } from '../ability/ability.module';
import { EmailModule } from 'src/email/email.module';
import { ServicePageModule } from 'src/service-page/service.module';
import { ImageEntity } from 'src/common/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ImageEntity]),
    forwardRef(() => AuthModule),
    AbilityModule,
    EmailModule,
    forwardRef(() => ServicePageModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}

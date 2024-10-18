import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroHeadings } from 'src/schemas/coman.schema';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'HeroHeadings', schema: HeroHeadings }]),
    AuthModule 
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroHeadings } from 'src/schemas/coman.schema';
import { AuthModule } from 'src/auth/auth.module';
import { HowItWorkdata, HowItWorkSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HeroHeadings.name, schema: HowItWorkSchema }, { name: HowItWorkdata.name, schema: HowItWorkSchema }]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

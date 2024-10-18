import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
imports:[AuthModule],

  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}

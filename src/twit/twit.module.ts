import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Twit } from './twit.model';
import { TwitResolver } from './twit.resolver';
import { TwitService } from './twit.service';



@Module({
  imports:[TypeOrmModule.forFeature([Twit]),AuthModule],
  providers: [TwitService,TwitResolver],
})
export class TwitModule {}

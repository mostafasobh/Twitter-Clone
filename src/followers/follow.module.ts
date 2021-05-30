import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { FollowModel } from './follow.model';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';



@Module({
  imports:[TypeOrmModule.forFeature([FollowModel]),AuthModule],
  providers: [FollowService,FollowResolver],
})
export class FollowModule {}

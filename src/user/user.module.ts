import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { User } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';


@Module({
  imports:[TypeOrmModule.forFeature([User]),AuthModule],
  providers: [UserService,UserResolver],
})
export class UserModule {}

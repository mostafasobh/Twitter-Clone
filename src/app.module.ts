import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FollowModel } from './followers/follow.model';
import { FollowModule } from './followers/follow.module';
import { Twit } from './twit/twit.model';
import { TwitModule } from './twit/twit.module';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TwitModule,
    FollowModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers:true,
      autoSchemaFile:'schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [User,Twit,FollowModel],
      synchronize: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}

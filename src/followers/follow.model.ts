import { Field, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@ObjectType()
@Entity()
export class FollowModel {

  @PrimaryColumn()
  @Field({ nullable: false })
  followerId?: string;

  @PrimaryColumn()
  @Field({ nullable: false })
  followeeId?: string;
  
  @CreateDateColumn()
  @Field({ nullable: false })
  createdAt?: Date;

  
//   @Field(type => [Post])
//   posts: Post[];
}
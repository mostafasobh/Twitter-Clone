import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn ,PrimaryColumn, CreateDateColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Twit {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id:string


  @Field({ nullable: false })
  @Column({length:50,nullable:false})
  creatorId?: string;
  
  @Field({ nullable: false })
  @Column()
  twitBody?: string;

  @Field({ nullable: false })
  @CreateDateColumn()
  createdAt?: Date;
  

}


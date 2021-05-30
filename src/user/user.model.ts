import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsEmpty, IsInt, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn ,PrimaryColumn, CreateDateColumn} from 'typeorm';

@Entity()
@ArgsType()
@InputType()
export class User {

  // @Field()
  @PrimaryGeneratedColumn('uuid')
  id:string


  @Field({ nullable: true })
  @Column({length:100,nullable:true})
  @IsNotEmpty()
  @MinLength(6)
  password?: string;
  
  @Field({ nullable: true })
  @Column({length:50,nullable:false})
  @IsEmail()
  @IsNotEmpty()
  email?: string;
  
  @Column({length:100,nullable:true})
  @Field({ nullable: false })
  // @IsNotEmpty()
  firstName?: string;
  
  @Column({length:50,nullable:true})
  @Field({ nullable: false })
  // @IsNotEmpty()
  lastName?: string;
  
  @Column({nullable:true})
  token?:string
}
@ArgsType()
@InputType()
export class Login{
  @Field({ nullable: true })
  @Column({length:100,nullable:false})
  @IsNotEmpty()
  password?: string;
  
  @Field({ nullable: true })
  @Column({length:50,nullable:false})
  @IsEmail()
  @IsNotEmpty()
  email?: string;
}
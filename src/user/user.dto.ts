import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, MaxLength } from "class-validator";

@InputType()
// @ObjectType()
export class UserDto{

    // @IsEmail()
    // @IsEmail()
    @Field()
    @MaxLength(30)
    email:string
}
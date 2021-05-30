import { Body, Inject, Param, ParseArrayPipe, ParseIntPipe } from "@nestjs/common";
import { Args, Parent, Query, Resolver } from "@nestjs/graphql";
import { Login, User } from "./user.model";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(
   @Inject(UserService) private readonly userService: UserService
  ) {}

  @Query(()=>String)
  async login(@Args('user') user:Login ) {
    let authToken =  await this.userService.findUser(user)
    return authToken
  }
  
  @Query(()=>String)
   async signUp(@Args('user') user:User) {
      let token =this.userService.addUser(user)
      return token
  }

//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
}
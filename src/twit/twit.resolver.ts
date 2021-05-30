import { Body, Inject, ParseArrayPipe } from "@nestjs/common";
import { Args, Parent, Query, Resolver } from "@nestjs/graphql";
import { Twit } from "./twit.model";
import { TwitService } from "./twit.service";
// import { UserService } from "./user.service";

@Resolver(of => Twit)
export class TwitResolver {
  constructor(
   @Inject(TwitService) private readonly twitService: TwitService
  ) {}

  @Query(()=>String)
  async twit() {
    return 'twit twit';
  }
  @Query(returns => Twit)
  async createNewTweet(@Args('token')  token:string,@Args('twitBody')  twitBody:string):Promise<{}|string> {
      let res = await this.twitService.addTwit(twitBody,token)
   return res
  }

  @Query(returns =>String)
  async deleteTwit(
    @Args('token')  token:string
    ,@Args('twitId')  twitId:string
    ):Promise<string> {
      let twitSuccessDeleteMsg = await this.twitService.deleteOneTwit(token,twitId)
     return twitSuccessDeleteMsg
  }

  @Query(()=>Twit)
  async getMyTwit(
    @Args('twitId')  twitId:string,
    @Args('token')  token:string
    ):Promise<string | Twit>{
      let res = await this.twitService.findMyTwit(token,twitId)
   return res
  }

  @Query(()=>[Twit])
  async getAllTwits(
    @Args('token')  token:string
    ):Promise<string |Twit[]>{
      let twitsList = await this.twitService.findAllTwits(token)
      return twitsList
  }
  
//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
}
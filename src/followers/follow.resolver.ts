import { Body, Inject, ParseArrayPipe, ParseUUIDPipe } from "@nestjs/common";
import { Args, Parent, Query, Resolver } from "@nestjs/graphql";
import { FollowModel } from "./follow.model";
import { FollowService } from "./follow.service";


@Resolver(of => FollowModel)
export class FollowResolver {
  constructor(
   @Inject(FollowService) private readonly twitService: FollowService
  ) {}

  @Query(()=>String)
  async twit() {
    return 'twit twit';
  }
  @Query(returns => [FollowModel])
  async getYourFollowers(@Args('token') token:string):Promise<FollowModel[]|string> {
      let res = await this.twitService.listFollowers(token)
   return res
  }
  @Query(returns => [FollowModel])
  async getYourFollowees(@Args('token') token:string):Promise<FollowModel[]|string> {
      let res = await this.twitService.listFollowee(token)
   return res
  }

  @Query(returns => String)
  async follow(@Args('token') token:string,@Args('followeeId' ,new ParseUUIDPipe()) followeeId:string):Promise<{}|string> {
      let res = await this.twitService.satrtFollow(token,followeeId)
   return `you successfully fowllowed ${followeeId}`
  }
  @Query(returns => String)
  async unfollow(@Args('token') token:string,@Args('followeeId' ,new ParseUUIDPipe()) followeeId:string):Promise<{}|string> {
      let res = await this.twitService.satrtFollow(token,followeeId)
   return `you successfully unfowllowed ${followeeId}`
  }
  
  @Query(returns => [FollowModel])
  async listMyFollowers(@Args('token') token:string):Promise<FollowModel[]> {
      let res = await this.twitService.listFollowers(token)
      return res
  //  return `you successfully unfowllowed ${followeeId}`
  }

  @Query(returns => [FollowModel])
  async listMyFollowee(@Args('token') token:string):Promise<FollowModel[]> {
      let res = await this.twitService.listFollowee(token)
      return res
  //  return `you successfully unfowllowed ${followeeId}`
  }

//   @Query(returns =>String)
//   async deleteTwit(
//     @Args('token')  token:string
//     ,@Args('twitId')  twitId:string
//     ):Promise<string> {
//       let twitSuccessDeleteMsg = await this.twitService.deleteOneTwit(token,twitId)
//      return twitSuccessDeleteMsg
//   }

//   @Query(()=>Twit)
//   async getMyTwit(
//     @Args('twitId')  twitId:string,
//     @Args('token')  token:string
//     ):Promise<string | Twit>{
//       let res = await this.twitService.findMyTwit(token,twitId)
//       if(!res) throw Error('unvalid twit id argument')
//    return res
//   }

//   @Query(()=>[Twit])
//   async getAllTwits(
//     @Args('token')  token:string
//     ):Promise<string |Twit[]>{
//       let twitsList = await this.twitService.findAllTwits(token)
//       return twitsList
//   }
  

}
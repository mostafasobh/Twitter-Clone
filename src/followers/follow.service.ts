import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { FollowModel } from './follow.model';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(FollowModel)
        private fowllowService: Repository<FollowModel>,
        @Inject(AuthService)
        private authService: AuthService
      ) { }
    
      async checkForDeplicateFollow(followModel:FollowModel):Promise<boolean>{
        const isHeAlreadyFollower = await this.fowllowService.find({followeeId:followModel.followeeId,followerId:followModel.followerId})
        if( isHeAlreadyFollower.length > 0)return true
        await this.isUserFowllowingHimSelf(followModel)
        return false
      }
      
      isUserFowllowingHimSelf(followModel:FollowModel):void{
        if(followModel.followeeId === followModel.followerId){
          throw new HttpException('CAN\'T FOLLOW YOUR SELF', HttpStatus.FORBIDDEN)
            }
        }

      async satrtFollow(token:string,followeeId:string):Promise<{}>{
          const followerId = await this.authService.verifyAuthToken(token)
          const isHeAlreadyFollower = await this.checkForDeplicateFollow({followeeId,followerId:followerId.id})
          if(!isHeAlreadyFollower){  
            const id =followerId.id
            await this.fowllowService.insert({followeeId:followeeId,followerId:id})
            return {followerId:id,followingId:followeeId,createdAt:new Date().getTime()}
          }
          throw new HttpException('YOU ARE ALREADY FOLLOWER', HttpStatus.BAD_REQUEST)
        }
        async removeFollow(token:string,followeeId:string):Promise<{}>{
          const fowllowerObject = await this.authService.verifyAuthToken(token)
          const isHeAlreadyFollower = await this.checkForDeplicateFollow({followeeId,followerId:fowllowerObject.id})
          if(isHeAlreadyFollower){
            const followerId =fowllowerObject.id
            await this.fowllowService.remove({followeeId:followeeId,followerId})
            return {fowllowerObject,followingId:followeeId,createdAt:new Date().getTime()}
          }
      throw new HttpException('YOU ARE NOT FOLLOWER , YOU CAN\'t UNFOLLOW THIS USER', HttpStatus.BAD_REQUEST)
      }
      async listFollowers(token:string):Promise<FollowModel[]>{
          let followerObject = await this.authService.verifyAuthToken(token)
              let followerId =followerObject.id
            let followersList= await this.fowllowService.find({followeeId:followerId})
             return followersList
      }
      async listFollowee(token:string):Promise<FollowModel[]>{
          let followeeObject = await this.authService.verifyAuthToken(token)
              let followeeId =followeeObject.id
            let followersList= await this.fowllowService.find({followerId:followeeId})
             return followersList
      }
}

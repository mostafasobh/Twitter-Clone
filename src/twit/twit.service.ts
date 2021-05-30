import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { Twit } from './twit.model';


@Injectable()
export class TwitService {
    constructor(
        @InjectRepository(Twit)
        private twitService: Repository<Twit>,
        @Inject(AuthService)
        private authService: AuthService
      ) { }

      async checkIsTwitOwner(token:string,twitId:string):Promise<boolean|undefined>{
        let user= await this.authService.verifyAuthToken(token)
        let twit = await this.findOneTwit(twitId)
        if(user.id === twit.creatorId){
            return true
        }
        return false
    }

        async addTwit(bodyText:string,token:string):Promise<Twit | string>{
            let user= await this.authService.verifyAuthToken(token)
            return this.twitService.save({twitBody:bodyText,creatorId:user.id})
        }

       async findAllTwits(token:string):Promise<Twit[]>{
            let user= await this.authService.verifyAuthToken(token)
            let twitsList = await  this.twitService.find({creatorId:user.id})
            if(twitsList.length>0) return twitsList
            throw new HttpException('no Twits were found', HttpStatus.NOT_FOUND)
        }

        async findOneTwit(twitId:string):Promise<Twit> | undefined{
            return this.twitService.find({id:twitId}).then((res)=>{
                if(res.length>0) return res[0]
                throw new HttpException('Twit not found were found', HttpStatus.NOT_FOUND)
            })
        }

        

       async deleteOneTwit(token:string,twitId:string):Promise<string>{
            let isOwner = await this.checkIsTwitOwner(token,twitId)
            if(isOwner){
                let deletedTwit = await this.twitService.delete({id:twitId})
                return 'twit has been deleted'
            }
            throw new HttpException('UNAUTHORIZED TWIT REMOVAL ACTION', HttpStatus.UNAUTHORIZED)
        }

        async findMyTwit(token:string,twitId:string):Promise<Twit|string>{
            const isOwner = this.checkIsTwitOwner(token,twitId)
            if(isOwner) return this.twitService.find({id:twitId})[0]
            throw new HttpException('UNAUTHORIZED TWIT SEARCH ACTION', HttpStatus.UNAUTHORIZED)
        }
 
}



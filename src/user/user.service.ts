import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { Login, User } from './user.model';
import * as bcrypt from 'bcrypt';
import { healSchema } from '@graphql-tools/utils';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userService: Repository<User>,
        @Inject(AuthService)
        private authService: AuthService
      ) { }

      test1():string{
        return "hello"
      }
      checkIfExists(user:User|Login):Promise<User> | undefined{
        return  this.userService.findOne({email:user.email}).then(res=>{
            if(!res) return undefined
            return {email:res.email,id:res.id,password:res.password}
         })
     }

     async hashPassword(password:string):Promise<string>{
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      return hashedPassword
     }
     
  async findUser(user:User|Login):Promise<string>{
     let userObject =  await this.checkIfExists(user)
     if(userObject){
       const hashedPassword = userObject.password
      const isMatch = await bcrypt.compare(user.password, hashedPassword);
      if(isMatch) {
        let authToken =await this.authService.generateAuthToken(userObject)
        await this.userService.update({email:user.email},{token:authToken})
        return authToken
      } 
      }
      throw new HttpException('Email or Password is incorrect', HttpStatus.UNAUTHORIZED)
  }

async addUser(user):Promise<string>{
  const{email,firstName,lastName}=user
  let result = await this.checkIfExists(user)
  if (!result){
    const hashedPassword =await this.hashPassword(user.password)
    let authToken= await this.authService.generateAuthToken(user)
    await this.userService.save({firstName,lastName,email,password:hashedPassword,token:authToken})
    return authToken
  }

  throw new HttpException('Email already exist', HttpStatus.CONFLICT)
}
}

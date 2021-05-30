import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

    generateAuthToken(user:User):string{
       let token =  this.jwtService.sign({email:user.email,id:user.id},{secret:'secret'})
      return token
  }
  
   verifyAuthToken(token:string):Promise<User> | undefined{
      let verifiedToken
      try {
        verifiedToken= this.jwtService.verify(token)
      } catch (error) {
        throw new HttpException('UNVALID TOKEN', HttpStatus.UNAUTHORIZED)
      }
      return verifiedToken
  }
//     generateAuthToken(user:User):string{
//        let token =  this.jwtService.sign({email:user.email,id:user.id},{secret:'secret'})
//       return token
//   }
  
//    verifyAuthToken(token:string):User{
//       let verifiedToken = this.jwtService.verify(token)
//       return verifiedToken
//   }
 
}
import {Service} from 'typedi';
import passport from "passport";
import "../utils/passport";
import {User} from "../entities/User";
import {LoginUserDto} from "../dtos/UserDto";

@Service()
export class AuthService {

    public async localLogin(req:any, res:any, next: (err?: any) => any){

    }


    public async jwtLogin(req:any, res:any, next: (err?: any) => any){

    }

}
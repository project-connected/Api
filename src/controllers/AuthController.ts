import {
    JsonController,
    HttpCode,
    Get, Post, Body, Res, Put, Param, Authorized, UseBefore, Req
} from 'routing-controllers';
import {AuthService} from "../services/AuthService";
import {LocalAuthenticate} from "../middlewares/AuthMiddleware";
import {createJWT} from "../utils/token";
import jwt from 'jsonwebtoken';
import {env} from '../env';

@JsonController("/auth")
export class AuthController {

    constructor(private authService:AuthService) {}

    @HttpCode(200)
    @UseBefore(LocalAuthenticate)
    @Post("/local/login")
    public localLogin(@Req() req){
        const user = req.user;

        const token = createJWT(user.userId);

        return {token};
    }

}
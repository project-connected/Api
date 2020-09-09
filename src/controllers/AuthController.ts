import {
    JsonController,
    HttpCode,
    Get, Post, Body, Res, Put, Param, Authorized, UseBefore, Req, CurrentUser
} from 'routing-controllers';
import {AuthService} from "../services/AuthService";
import {LocalAuthenticate} from "../middlewares/AuthMiddleware";
import {createJWT} from "../utils/token";
import {Builder} from "builder-pattern";
import {Response} from "../dtos/Response";
import {UserInfoDto} from "../dtos/UserDto";
import {User} from "../entities/User";


@JsonController("/auth")
export class AuthController {

    constructor(private authService:AuthService) {}

    @HttpCode(200)
    @UseBefore(LocalAuthenticate)
    @Post("/local/login")
    public localLogin(@Req() req, @Res() res){
        const reqUser = req.user;
        const token = createJWT(reqUser.userId);
        const user = new UserInfoDto(reqUser);

        const expiryDate = new Date( Date.now() + 60 * 60 * 1000 * 24);

        res.cookie('authorization', token, {
            expires : expiryDate,
            secure: true,
            httpOnly:false,
            sameSite:"none",
            domain:".anjoy.info"
        });

        return Builder(Response)
            .status(200)
            .result({user,token})
            .build();
    }

    @HttpCode(200)
    @Authorized()
    @Get("/user")
    public auth(@CurrentUser() user : User,@Req() req){
        return new UserInfoDto(user);
        // return {'message':req.cookies.authorization};
    }


}
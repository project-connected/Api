import {
    JsonController,
    HttpCode,
    Get, Post, Body, Res, Put, Param
} from 'routing-controllers';
import {CreateUserDto, UpdateUserDto} from "../dtos/UserDto";
import {UserService} from "../services/UserService";

@JsonController("/user")
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(200)
    @Post("/create")
    public async createUser(@Body() createUserDto : CreateUserDto){
        const result = await this.userService.createUser(createUserDto);
        return result.toJSON();
    };

    @HttpCode(200)
    @Put("/update")
    public async updateUser(
        @Param("userId") id: number,
        @Body() updateUserDto:UpdateUserDto,
        @Res() res:Response
    ){
        const {userId} = updateUserDto;
        return this.userService.updateUser(userId, updateUserDto);
    }
};
import {
    JsonController,
    HttpCode,
    Get, Post, Body, Res, Put, Param, Authorized
} from 'routing-controllers';
import {CreateUserDto, UpdateUserDto} from "../dtos/UserDto";
import {UserService} from "../services/UserService";

@JsonController("/user")
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(200)
    @Post("/create")
    public async createUser(@Body() createUserDto : CreateUserDto){
        return await this.userService.createUser(createUserDto);
    }

    @HttpCode(200)
    @Put("/:userId")
    public async updateUser(
        @Param("userId") paramId: number,
        @Body() updateUserDto:UpdateUserDto
    ){
        const {userId} = updateUserDto;
        return await this.userService.updateUser(userId, updateUserDto);
    }
};
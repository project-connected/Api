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

    /**
     *  리턴 결과
     *  409 이미 존재하는 이메일
     *  200 가입 성공
     * @param createUserDto
     */
    @HttpCode(200)
    @Post()
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
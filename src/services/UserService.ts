import {Service} from 'typedi';
import {CreateUserDto, LoginUserDto, UpdateUserDto, UserInfoDto} from '../dtos/UserDto';
import {User} from "../entities/User";
import {Builder} from "builder-pattern";
import {Response} from "../dtos/Response";

/**
 * https://sequelize.org/master/manual/model-querying-basics.html
 */
@Service()
export class UserService {

    public async createUser(createUserDto:CreateUserDto) : Promise<Response> {
        const findUser = await this.findUserWithEmail(createUserDto.email);
        if (findUser) {
            return Builder(Response)
                .status(409)
                .result(new UserInfoDto(findUser))
                .build();
        }

        const result = await User.create(createUserDto);
        return Builder(Response)
            .status(200)
            .result(new UserInfoDto(result))
            .build();
    }

    public async findUserWithEmail(email : string) : Promise<User> {
        const existUser = await User.findOne({where : {email}});
        return existUser;
    }

    public async updateUser(userId:number, updateUserDto:UpdateUserDto) : Promise<Response> {
        // Todo : jwt userId, 파라미터 userId 비교와 같은 검증 로직이 들어가야함
        const findUser:User = await User.findOne({where: {userId}});
        if (findUser) {
            const result = await User.update(updateUserDto,{where:{userId}});
            const status = result == 1 ? 200 : 500;
            return Builder(Response)
                .status(status)
                .result(true)
                .build();
        }
        return Builder(Response)
            .status(409)
            .result(false)
            .build();;
    }

    public async selectOneUser(userId : number) {

    }

    public async selectUserList(){

    }
}
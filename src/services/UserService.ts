import {Service} from 'typedi';
import {CreateUserDto, LoginUserDto, UpdateUserDto} from '../dtos/UserDto';
import {User} from "../entities/User";

/**
 * https://sequelize.org/master/manual/model-querying-basics.html
 */
@Service()
export class UserService {

    public async createUser(createUserDto:CreateUserDto) : Promise<User> {
        const result = await User.create(createUserDto);
        return result.toJSON();
    }

    public async updateUser(userId:number, updateUserDto:UpdateUserDto) : Promise<User> {
        // Todo : jwt userId, 파라미터 userId 비교와 같은 검증 로직이 들어가야함
        const findUser = await User.findOne({where: {userId}});
        if (findUser) {
            return await findUser.set(updateUserDto).toJSON();
        }
        return null;
    }

    public async selectOneUser(loginUserDto:LoginUserDto) {

    }

    public async selectUserList(){

    }
}
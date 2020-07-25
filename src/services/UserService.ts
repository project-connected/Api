import {Service} from 'typedi';
import {CreateUserDto, UpdateUserDto} from '../dtos/UserDto';
import {User} from "../entities/User";

@Service()
export class UserService {

    public async createUser(createUserDto:CreateUserDto) : Promise<User> {
        return User.build(createUserDto).save();
    }

    public async updateUser(userId:number, updateUserDto:UpdateUserDto) : Promise<User> {
        const targetUser:User = User.findOne({where: {userId}});
        return targetUser.update(updateUserDto);
    }

}
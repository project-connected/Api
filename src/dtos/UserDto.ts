import {IsNotEmpty, Length, IsEmail} from 'class-validator';
import {User} from '../entities/User';

export class CreateUserDto {
    @IsNotEmpty()
    @Length(1,20)
    public userName: string;

    @IsNotEmpty()
    @Length(1,100)
    @IsEmail()
    public email: string;

    public toEntity(): User {
        const {userName, email} = this;

        const user = new User();
        user.email = email;
        user.userName = userName;

        return user;
    }
}

export class UpdateUserDto {
    @IsNotEmpty()
    public userId: number;

    @IsNotEmpty()
    @Length(1,20)
    public userName: string;
}
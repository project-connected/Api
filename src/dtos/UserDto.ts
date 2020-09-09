import {IsNotEmpty, Length, IsEmail} from 'class-validator';
import {User} from '../entities/User';

export class LoginUserDto {
    @IsNotEmpty()
    @Length(1,100)
    @IsEmail()
    public email;

    @IsNotEmpty()
    @Length(1,20)
    public password;
}

export class UserInfoDto {

    public email: string;

    public userName: string;

    public userId: number;

    public thumbnail: string;

    public area: string;

    public skill: string;

    public content: string;

    constructor(user:User) {
        this.email = user.email;
        this.userName = user.userName;
        this.userId = user.userId;
        this.thumbnail = user.thumbnail;
        this.area = user.area;
        this.skill = user.skill;
        this.content = user.content;
    }
}

export class CreateUserDto {
    @IsNotEmpty()
    @Length(1,20)
    public userName: string;

    @IsNotEmpty()
    public password: string;

    @IsNotEmpty()
    @Length(1,100)
    @IsEmail()
    public email: string;
}

export class UpdateUserDto {
    @IsNotEmpty()
    public userId: number;

    @IsNotEmpty()
    @Length(1,20)
    public userName: string;
}
import {
    JsonController,
    HttpCode,
    Get, Post, Body, Res, Put, Param, Authorized, CurrentUser, QueryParams
} from 'routing-controllers';
import {ProfileService} from "../services/ProfileService";
import {CreateProfileDto, PageableProfileDto, UpdateProfileDto} from "../dtos/ProfileDto";
import {User} from "../entities/User";


@JsonController("/profiles")
export class ProfileController {

    constructor(private profileService: ProfileService) {}

    @HttpCode(200)
    @Post()
    @Authorized()
    public async createProfile(@CurrentUser() user : User ,@Body() createProfileDto:CreateProfileDto){
        createProfileDto.userId = user.userId;
        return await this.profileService.createProfile(createProfileDto);
    }

    @HttpCode(200)
    @Put()
    @Authorized()
    public async updateProfile(
        @CurrentUser() user : User
        , @Body() updateProfileDto:UpdateProfileDto
    ){
        return await this.profileService.updateProfile(user.userId,updateProfileDto);
    }

    @HttpCode(200)
    @Get()
    public async selectProfileList(
        @QueryParams() pageableProfileDto:PageableProfileDto
    ){
        return await this.profileService.selectProfileList(
            pageableProfileDto.offset,
            pageableProfileDto.limit,
            pageableProfileDto.area,
            pageableProfileDto.skill,
            pageableProfileDto.theme,
            pageableProfileDto.purpose,
            pageableProfileDto.startDate
        );
    }
}
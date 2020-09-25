import {
    JsonController,
    HttpCode,
    Get, Post, Body, Res, Put, Param, Authorized, CurrentUser, QueryParams
} from 'routing-controllers';
import {ProfileService} from "../services/ProfileService";
import {CreateProfileDto, PageableProfileDto, UpdateProfileDto} from "../dtos/ProfileDto";
import {User} from "../entities/User";
import {CommonService} from "../services/CommonService";


@JsonController("/profiles")
export class ProfileController {

    constructor(
        private profileService: ProfileService,
        private commonService: CommonService
    ) {}

    @HttpCode(200)
    @Post()
    @Authorized()
    public async createProfile(@CurrentUser() user : User ,@Body() createProfileDto:CreateProfileDto){
        createProfileDto.userId = user.userId;
        createProfileDto.area = this.commonService.convertJoinStr("|",createProfileDto.area);
        createProfileDto.purpose = this.commonService.convertJoinStr("|",createProfileDto.purpose);
        createProfileDto.skill = this.commonService.convertJoinStr("|",createProfileDto.skill);
        createProfileDto.theme = this.commonService.convertJoinStr("|",createProfileDto.theme);
        return await this.profileService.createProfile(createProfileDto);
    }

    @HttpCode(200)
    @Put()
    @Authorized()
    public async updateProfile(
        @CurrentUser() user : User
        , @Body() updateProfileDto:UpdateProfileDto
    ){
        updateProfileDto.area = this.commonService.convertJoinStr("|",updateProfileDto.area);
        updateProfileDto.purpose = this.commonService.convertJoinStr("|",updateProfileDto.purpose);
        updateProfileDto.skill = this.commonService.convertJoinStr("|",updateProfileDto.skill);
        updateProfileDto.theme = this.commonService.convertJoinStr("|",updateProfileDto.theme);
        return await this.profileService.updateProfile(user.userId,updateProfileDto);
    }

    @HttpCode(200)
    @Post("/list")
    public async selectProfileList(
        @Body() pageableProfileDto:PageableProfileDto
    ){
        pageableProfileDto.area = this.commonService.convertJoinStr("|",pageableProfileDto.area);
        pageableProfileDto.purpose = this.commonService.convertJoinStr("|",pageableProfileDto.purpose);
        pageableProfileDto.skill = this.commonService.convertJoinStr("|",pageableProfileDto.skill);
        pageableProfileDto.theme = this.commonService.convertJoinStr("|",pageableProfileDto.theme);
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
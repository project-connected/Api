import {Service} from "typedi";
import {Profile} from '../entities/Profile';
import {CreateProfileDto, UpdateProfileDto} from "../dtos/ProfileDto";
import {Builder} from "builder-pattern";
import {Response} from "../dtos/Response";
import {Area} from "../dtos/EnumArea";
import {Skill} from "../dtos/EnumSkill";
import {Theme} from "../dtos/EnumTheme";
import {Purpose} from "../dtos/EnumPurpose";
import {Op} from "sequelize";
import {CommonService} from "./CommonService";
import {User} from "../entities/User";

@Service()
export class ProfileService{

    public async createProfile(createProfileDto:CreateProfileDto) {
        const result = await Profile.create(createProfileDto);
        return Builder(Response)
            .status(200)
            .result(result.toJSON())
            .build();
    }

    public async updateProfile(userId:number, updateProfileDto:UpdateProfileDto) {
        const {profileId} = updateProfileDto;
        const profile = await Profile.findOne({where:{profileId,userId}, raw:false});
        if (profile){
            const result = await profile.set(updateProfileDto);

            return Builder(Response)
                .status(200)
                .result(result.toJSON())
                .build();
        }
        return Builder(Response)
            .status(409)
            .result(null)
            .build();
    }

    public async selectProfile(profileId:number, commonService:CommonService){
        let profile =
            await Profile.findOne({
                where:{profileId},
                include: [
                    {model: User, required:true, attributes: { exclude: ['password'] }}
                ], raw:false});
        profile = profile.toJSON();
        if (profile){
            if (profile.purpose)
                profile.purpose = commonService.getArr(Purpose, profile.purpose.split("|"));
            if (profile.skill)
                profile.skill = commonService.getArr(Skill, profile.skill.split("|"));
            if (profile.theme)
                profile.theme = commonService.getArr(Theme, profile.theme.split("|"));
            if (profile.area)
                profile.area = commonService.getArr(Area, profile.area.split("|"));
        }
        return Builder(Response)
            .status(200)
            .result(profile)
            .build();
    }

    public async selectProfileList(
        commonService:CommonService,
        offset: number,
        limit: number,
        area:  string,
        skill: string,
        theme: string,
        purpose: string,
        startDate?: string,
    ) {
        try{
            const searchOptions = {};
            if (area)
                searchOptions['area'] = {[Op.regexp]: area};
            if (skill)
                searchOptions['skill'] = {[Op.regexp]: skill};
            if (theme)
                searchOptions['theme'] = {[Op.regexp]: theme};
            if (purpose)
                searchOptions['purpose'] = {[Op.regexp]: purpose};
            if (startDate)
                searchOptions[Op.and] = [
                    {startDate: {[Op.gte]:new Date(startDate)}}
                ];
            const result = await Profile.findAll({
                offset,
                limit,
                where: searchOptions,
                order: [['createDate', 'desc']],
                raw:false,
                include: [
                    {model: User, required:true, attributes: { exclude: ['password'] }}
                ]
            });
            let list = [];
            for (const profile of result){
                if (profile.purpose)
                    profile.purpose = commonService.getArr(Purpose, profile.purpose.split("|"));
                if (profile.skill)
                    profile.skill = commonService.getArr(Skill, profile.skill.split("|"));
                if (profile.theme)
                    profile.theme = commonService.getArr(Theme, profile.theme.split("|"));
                if (profile.area)
                    profile.area = commonService.getArr(Area, profile.area.split("|"));
                list.push(profile.toJSON());
            }
            return Builder(Response)
                .status(200)
                .result(list)
                ._links({self:''})
                .build();
        }catch (e) {
            console.log(e);
            return Builder(Response)
                ._links({self: ""})
                .status(500)
                .message('인재풀 목록을 가져오는데 오류가 발생했습니다.')
                .result(null)
                .build();
        }
    }
}
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

    public async selectProfile(){

    }

    public async selectProfileList(
        offset: number,
        limit: number,
        area: Area[],
        skill: Skill[],
        theme: Theme[],
        purpose: Purpose[],
        startDate?: string,
    ) {
        try{
            const searchOptions = {};
            if (area.length)
                searchOptions['area'] = {[Op.regexp]: area.join('|')};
            if (skill.length)
                searchOptions['skill'] = {[Op.regexp]: skill.join('|')};
            if (theme.length)
                searchOptions['theme'] = {[Op.regexp]: theme.join('|')};
            if (purpose.length)
                searchOptions['purpose'] = {[Op.regexp]: purpose.join('|')};
            if (startDate)
                searchOptions[Op.and] = [
                    {startDate: {[Op.gte]:new Date(startDate)}}
                ];
            const result = await Profile.findAll({
                offset,
                limit,
                where: searchOptions,
                order: [['createDate', 'desc']],
                raw:true
            });
            return Builder(Response)
                .status(200)
                .result(result)
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
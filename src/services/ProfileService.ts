import {Service} from "typedi";
import {Profile} from '../entities/Profile';
import {CreateProfileDto, UpdateProfileDto} from "../dtos/ProfileDto";
import {Builder} from "builder-pattern";
import {Response} from "../dtos/Response";

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
            .build();;
    }

    public async selectProfile(){

    }

    public async selectProfileList() {

    }
}
import request from 'supertest';
import app from './config/initApp';
import {createDatabaseConnection} from './config/initDb';
import {Sequelize} from "sequelize-typescript";
import {Builder } from 'builder-pattern';
import {ProfileService} from "../../src/services/ProfileService";
import {CreateUserDto, UserInfoDto} from "../../src/dtos/UserDto";
import {UserService} from "../../src/services/UserService";
import {Response} from "../../src/dtos/Response";
import {createJWT} from "../../src/utils/token";
import {CreateProfileDto, UpdateProfileDto} from "../../src/dtos/ProfileDto";
import {Theme} from "../../src/dtos/EnumTheme";
import {Area} from "../../src/dtos/EnumArea";
import {Skill} from "../../src/dtos/EnumSkill";
import {Purpose} from "../../src/dtos/EnumPurpose";
import {Profile} from "../../src/entities/Profile";

let db: Sequelize;
let profileService:ProfileService;
let userService:UserService;

const UserSeed = Builder(CreateUserDto)
    .password("abc123!")
    .userName("testUser")
    .email("test@test.com")
    .build();

const ProfileSeed = Builder(CreateProfileDto)
    .theme(Theme.COMPETITION)
    .area(Area.BUSAN)
    .purpose(Purpose.ANDROID)
    .skill(Skill.ANDROID)
    .startDate(new Date())
    .endDate(new Date())
    .content("안드로이드 잘합니다.")
    .title("안드로이드 쩌는 사람")
    .build();

let token;
let createdUser:UserInfoDto;
let createdProfile:Profile;

beforeAll(async () => {
    db = await createDatabaseConnection();
    userService = new UserService();
    profileService = new ProfileService();
    const userResponse = <Response>await userService.createUser(UserSeed);
    createdUser = userResponse.result;
    const profileResponse = <Response>await profileService.createProfile(ProfileSeed);
    createdProfile = profileResponse.result;
    token = createJWT(createdUser.userId);
})

afterAll(async () => {
    await db.close();
})

describe("POST /api/profiles", ()=>{
    it("200: 유저 인재풀 등록 성공", async () => {
        const createProfile = Builder(CreateProfileDto)
            .theme(Theme.COMPETITION)
            .area(Area.BUSAN)
            .purpose(Purpose.ANDROID)
            .skill(Skill.ANDROID)
            .startDate(new Date())
            .endDate(new Date())
            .content("안드로이드 잘합니다.")
            .title("안드로이드 쩌는 사람")
            .build();

        const response = await request(app)
            .post("/api/profiles")
            .send(createProfile)
            .set('Cookie', [`authorization=${token}`])
            .expect(200);

        const {body} = response;
        const {result} = body;
        createdProfile = result;

        expect(result.area).toEqual(Area.BUSAN);
    })
})

describe("PUT /api/profiles",  () => {
    it("200: 유저 인재풀 수정 성공", async () => {
        const updateProfile = Builder(UpdateProfileDto)
            .profileId(createdProfile.profileId)
            .theme(Theme.HACKATHON)
            .area(Area.CHUNGNAM)
            .purpose(Purpose.ETC)
            .skill(Skill.Go)
            .startDate(new Date())
            .endDate(new Date())
            .content("안드로이드 못합니다.")
            .title("안드로이드 찌는 사람")
            .build();

        const response = await request(app)
            .put("/api/profiles")
            .send(updateProfile)
            .set('Cookie',[`authorization=${token}`])
            .expect(200);

        const {body} = response;
        const {result} = body;
        const profile:Profile = result;

        expect(profile.theme).toEqual(Theme.HACKATHON);
        expect(profile.area).toEqual(Area.CHUNGNAM);
        expect(profile.purpose).toEqual(Purpose.ETC);
        expect(profile.skill).toEqual(Skill.Go);
        expect(profile.content).toEqual("안드로이드 못합니다.");
        expect(profile.title).toEqual("안드로이드 찌는 사람");
    })
})
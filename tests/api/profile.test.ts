import request from 'supertest';
import app from './config/initApp';
import {createDatabaseConnection} from './config/initDb';
import {Sequelize} from "sequelize-typescript";
import {Builder} from 'builder-pattern';
import {ProfileService} from "../../src/services/ProfileService";
import {CreateUserDto, UserInfoDto} from "../../src/dtos/UserDto";
import {UserService} from "../../src/services/UserService";
import {Response} from "../../src/dtos/Response";
import {createJWT} from "../../src/utils/token";
import {CreateProfileDto, PageableProfileDto, UpdateProfileDto} from "../../src/dtos/ProfileDto";
import {Theme} from "../../src/dtos/EnumTheme";
import {Area} from "../../src/dtos/EnumArea";
import {Skill} from "../../src/dtos/EnumSkill";
import {Purpose} from "../../src/dtos/EnumPurpose";
import {Profile} from "../../src/entities/Profile";
import {CommonService} from "../../src/services/CommonService";

let db: Sequelize;
let profileService:ProfileService;
let userService:UserService;
let commonService: CommonService;

const UserSeed = Builder(CreateUserDto)
    .password("abc123!")
    .userName("testUser")
    .email("test@test.com")
    .build();

const ProfileSeed = Builder(CreateProfileDto)
    .theme([
        { key: 'COMPETITION', value: '공모전' },
        { key: 'HACKATHON', value: '해커톤' }
    ])
    .area([
        { key: 'BUSAN', value: '부산' },
        { key: 'DAEGU', value: '대구' },
        { key: 'INCHEON', value: '인천' }
    ])
    .purpose([
        { key: 'APPLICATION', value: '통합 어플리케이션 개발' },
        { key: 'WEB', value: '웹 개발' }
    ])
    .skill([
        { key: 'NODE', value: 'Node.JS', color:'#41a94b' },
    ])
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
    commonService = new CommonService();
    const userResponse = <Response>await userService.createUser(UserSeed);
    createdUser = userResponse.result;
    // const profileResponse = <Response>await profileService.createProfile(ProfileSeed);
    // createdProfile = profileResponse.result;
    token = createJWT(createdUser.userId);
})

afterAll(async () => {
    await db.close();
})

describe("POST /api/profiles", ()=>{
    it("200: 유저 인재풀 등록 성공", async () => {

        const createProfile = Builder(CreateProfileDto)
            .area(commonService.getArr(Area, [Area.BUSAN, Area.DAEGU, Area.INCHEON]))
            .theme(commonService.getArr(Theme, [Theme.COMPETITION, Theme.HACKATHON]))
            .purpose(commonService.getArr(Purpose, [Purpose.APPLICATION, Purpose.WEB]))
            .skill(commonService.getArr(Skill, [Skill.NODE]))
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

        expect(result.area).toEqual(Area.BUSAN+"|"+Area.DAEGU+"|"+Area.INCHEON);
        expect(result.theme).toEqual(Theme.COMPETITION+"|"+Theme.HACKATHON);
        expect(result.purpose).toEqual(Purpose.APPLICATION+"|"+Purpose.WEB);
        expect(result.skill).toEqual(Skill.NODE);
    })
})

describe("PUT /api/profiles",  () => {
    it("200: 유저 인재풀 수정 성공", async () => {
        const updateProfile = Builder(UpdateProfileDto)
            .profileId(1)
            .theme(commonService.getArr(Theme, [Theme.HACKATHON]))
            .area(commonService.getArr(Area, [Area.CHUNGNAM]))
            .purpose(commonService.getArr(Purpose, [Purpose.ETC]))
            .skill(commonService.getArr(Skill, [Skill.GO]))
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
        expect(profile.skill).toEqual(Skill.GO);
        expect(profile.content).toEqual("안드로이드 못합니다.");
        expect(profile.title).toEqual("안드로이드 찌는 사람");
    })
});

describe("GET /api/profiles/:id", ()=>{
    it("200 : 아이디에 해당하는 인재풀 하나 가져오기 성공", async () => {
        const response = await request(app)
            .get(`/api/profiles/${createdProfile.profileId}`)
            .expect(200);

        const {body} = response;
        const {result} = body;
        const profile:Profile = result;

        // console.log("결과", body);
        expect(profile.area).toEqual([
                { key: 'BUSAN', value: '부산' },
                { key: 'DAEGU', value: '대구' },
                { key: 'INCHEON', value: '인천' }
            ]
        );
    });
})

describe("POST /api/profiles/list", ()=>{
    it("200 : 인재풀 목록 가져오기 성공", async () => {
        const searhOption = Builder(PageableProfileDto)
            // .skill(commonService.getArr(Skill, [Skill.GO,Skill.ANDROID]))
            // .purpose(commonService.getArr(Purpose, [Purpose.ETC,Purpose.ANDROID]))
            // .area(commonService.getArr(Area, [Area.CHUNGNAM,Area.BUSAN]))
            // .theme(commonService.getArr(Theme, [Theme.HACKATHON, Theme.STARTUP]))
            .limit(10)
            .offset(0)
            .startDate("2000-01-01")
            .build();

        const response = await request(app)
            .post("/api/profiles/list")
            .query(searhOption)
            .expect(200);

        const {body} = response;
        const {result} = body;
        console.log("api profiles 결과", body);
    });
});
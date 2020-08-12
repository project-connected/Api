import request from 'supertest';
import app from './config/initApp';
import {createDatabaseConnection} from './config/initDb';
import {Sequelize} from "sequelize-typescript";
import {User} from "../../src/entities/User";
import {CreateTeamDto} from "../../src/dtos/TeamDto";
import {Builder } from 'builder-pattern';
import {UserService} from "../../src/services/UserService";
import {createJWT} from "../../src/utils/token";
import {CreateUserDto} from "../../src/dtos/UserDto";
import {TeamService} from "../../src/services/TeamService";
import {MatchService} from "../../src/services/MatchService";
import {CreateMatchDto} from "../../src/dtos/MatchDto";
import {MatchService} from "../../src/services/MatchService";

let db: Sequelize;
let userService:UserService;
let teamService:TeamService;
let matchService:MatchService;

const setHeader = (
    token: string,
): { authorization: string; Accept: string } => ({
    authorization: `${token}`,
    Accept: "application/json",
});

const UserSeed = Builder(CreateUserDto)
    .password("abc123!")
    .userName("testUser")
    .email("test@test.com")
    .build();

let TeamSeeds = [];
for (let i=0; i<10; i++){
    let date = new Date();
    date.setDate(date.getDate()-i);
    const TeamSeed = Builder(CreateTeamDto)
        .area("areaId")
        .title("title")
        .content("content")
        .endDate(date)
        .startDate(date)
        .maxCount(5)
        .thumbnail("")
        .theme("temeId")
        .skill("Photoshop,React.JS,Android")
        .build();
    TeamSeeds.push(TeamSeed);
}

let token;
let createdUser:User;

beforeAll(async () => {
    db = await createDatabaseConnection();
    userService = new UserService();
    teamService = new TeamService();
    matchService = new MatchService();

    createdUser = await userService.createUser(UserSeed);
    token = createJWT(createdUser.userId);

    for (var i=0; i<TeamSeeds.length; i++){
        await db.transaction(async (t)=>{
            const team = await teamService.createTeam(TeamSeeds[i], t);

            const createMatchDto = Builder(CreateMatchDto)
                .userId(createdUser.userId)
                .teamId(team.teamId)
                .statusId("B01000") // 팀장 코드
                .build();

            const match = await matchService.createMatch(createMatchDto, t);
        })
    }
})

afterAll(async () => {
    await db.close();
})


describe("POST /api/team", ()=> {
    it("200: 팀 생성에 성공한다.", async () => {
        const teamSeed = Builder(CreateTeamDto)
            .area("areaId")
            .title("title")
            .content("content")
            .endDate(new Date())
            .startDate(new Date())
            .maxCount(5)
            .thumbnail("")
            .theme("temeId")
            .build();

        const response = await request(app)
            .post("/api/team")
            .send(teamSeed)
            .set(setHeader(token))
            .expect(200);

        const {body} = response;

        // expect(body.userId).toEqual(createdUser.userId);
        // expect(body.statusId).toEqual("B01000"); // 팀장 임시 코드
    });
});

describe("GET /api/team", ()=> {
    it("200: 팀 목록 조회에 성공한다.", async () => {
        const response = await request(app)
            .get("/api/team?offset=0&limit=10")
            .set(setHeader(token))
            .expect(200);

        const {body} = response;

        console.log(body);

    });
})
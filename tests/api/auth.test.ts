import request from 'supertest';
import app from './config/initApp';
import {createDatabaseConnection} from './config/initDb';
import {Repository, Sequelize} from "sequelize-typescript";
import {Response} from "../../src/dtos/Response"
import {User} from "../../src/entities/User";
import {CreateUserDto, UpdateUserDto, UserInfoDto} from "../../src/dtos/UserDto";
import {Builder } from 'builder-pattern';
import {UserService} from "../../src/services/UserService";
import {createJWT, decodeJWT} from "../../src/utils/token";

let db: Sequelize;
let userService:UserService;

const UserSeed = Builder(CreateUserDto)
    .password("abc123!")
    .userName("testUser")
    .email("test@test.com")
    .build();

let token;
let createdUser:UserInfoDto;

beforeAll(async () => {
    db = await createDatabaseConnection();
    await Promise.all([db])
    userService = new UserService();

    const {result} = <Response>await userService.createUser(UserSeed);
    createdUser = result;
    token = createJWT(createdUser.userId);
})

afterAll(async () => {
    await db.close();
})

describe("POST /api/auth/local/login", ()=> {
    it("200: 로그인에 성공한다.", async () => {
        const response = await request(app)
            .post("/api/auth/local/login")
            .send({email:UserSeed.email,password:UserSeed.password})
            .expect(200);

        const {body} = response;
        const {result} = body;
        const user = await decodeJWT(result.token);
        expect(result.user.userId).toEqual(user.userId);
    });
});

// describe("POST /api/auth/user", ()=> {
//     it("401 유효한 토큰이 아닌 경우 유저정보 없음", async ()=>{
//         const response = await request(app)
//             .get("/api/auth/user")
//             // .set({
//             //     authorization: token,
//             //     Accept: "application/json",
//             // })
//             .expect(401);
//
//         const {body} = response;
//         console.log(body);
//     })
// });
//
// describe("POST /api/auth/user", ()=> {
//     it("200 유효한 토큰, 유저 정보 반환", async ()=>{
//         const response = await request(app)
//             .get("/api/auth/user")
//             .set({
//                 authorization: token,
//                 Accept: "application/json",
//             })
//             .expect(200);
//
//         const {body} = response;
//         console.log(body);
//     })
// });
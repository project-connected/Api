import request from 'supertest';
import app from './config/initApp';
import {createDatabaseConnection} from './config/initDb';
import {Repository, Sequelize} from "sequelize-typescript";
import {User} from "../../src/entities/User";
import {CreateUserDto, UpdateUserDto} from "../../src/dtos/UserDto";
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
let createdUser:User;

beforeAll(async () => {
    db = await createDatabaseConnection();
    userService = new UserService();

    const {result}= await userService.createUser(UserSeed);
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
        expect(user.userId).toEqual(createdUser.userId);
    });
});
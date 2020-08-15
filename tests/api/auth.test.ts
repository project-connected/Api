import request from 'supertest';
import app from './config/initApp';
import {createDatabaseConnection} from './config/initDb';
import {Repository, Sequelize} from "sequelize-typescript";
import {Response} from "../../src/dtos/Response"
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
let createdUser:Response;

beforeAll(async () => {
    db = await createDatabaseConnection();
    await Promise.all([db])
    userService = new UserService();

    createdUser = <Response>await userService.createUser(UserSeed);
    token = createJWT(createdUser.result.userId);
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
        const user = await decodeJWT(body.token);
        // expect(user.userId).toEqual(createdUser.userId);
    });
});
import request from 'supertest';
import app from './config/initApp';
import {createDatabaseConnection} from './config/initDb';
import {Sequelize} from "sequelize-typescript";
import {CreateUserDto, UpdateUserDto} from "../../src/dtos/UserDto";
import {Builder } from 'builder-pattern';
let db: Sequelize;

beforeAll(async () => {
    db = await createDatabaseConnection();
})

afterAll(async () => {
    await db.close();
})

describe("POST /api/user", ()=> {
    const testUser = Builder(CreateUserDto)
        .userName('test')
        .password("1234")
        .email('test@test.com')
        .build();

    it("200: 유저 생성 성공", async () => {
        const response = await request(app)
            .post("/api/user")
            .send(testUser)

        const {body} = response;
        expect(body.status).toEqual(200)
        expect(body.result.userName).toEqual("test");
        expect(body.result.email).toEqual('test@test.com');
    });

    it("409: 중복 유저, 유저 생성 실패", async () => {
        const response = await request(app)
            .post("/api/user")
            .send(testUser)

        const {body} = response
        expect(body.status).toEqual(409)
        expect(body.result.userName).toEqual("test");
        expect(body.result.email).toEqual('test@test.com');
    })
});
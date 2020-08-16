import request from 'supertest';
import app from './config/initApp';
import {createDatabaseConnection} from './config/initDb';
import {Sequelize} from "sequelize-typescript";
import {CreateUserDto, UpdateUserDto} from "../../src/dtos/UserDto";
import {Builder } from 'builder-pattern';
import {Response} from "../../src/dtos/Response";
let db: Sequelize;

beforeAll(async () => {
    db = await createDatabaseConnection();
})

afterAll(async () => {
    await db.close();
})

describe("POST /api/user", ()=> {
    it("200: 유저 생성 성공", async () => {
        const testUser = Builder(CreateUserDto)
            .userName('test')
            .password("1234")
            .email('test@test.com')
            .build();

        const response = await request(app)
            .post("/api/user")
            .send(testUser)
            .expect(200);

        const {body} = response;
        const {result} = body;
        expect(result.userName).toEqual("test");
        expect(result.email).toEqual('test@test.com');
    });
});
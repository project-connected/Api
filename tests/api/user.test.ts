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

describe("POST /api/user/create", ()=> {
    it("200: 유저 생성 성공", async () => {
        const testUser = Builder(CreateUserDto)
            .userName('test')
            .password("1234")
            .email('test@test.com')
            .build();

        const response = await request(app)
            .post("/api/user/create")
            .send(testUser)
            .expect(200);

        const {body} = response;
        expect(body.userName).toEqual("test");
        expect(body.email).toEqual('test@test.com');
    });
});
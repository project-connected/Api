import request from 'supertest';
import app from './config/initApp';
import {createDatabaseConnection} from './config/initDb';
import {Repository, Sequelize} from "sequelize-typescript";
import {User} from "../../src/entities/User";
import {CreateUserDto} from "../../src/dtos/UserDto";
import {Builder } from 'builder-pattern';
let db: Sequelize;
let userService : Repository<User>;

beforeAll(async () => {
    db = await createDatabaseConnection();
    // userService = db.getRepository(User);
})

afterAll(async () => {
    await db.close();
})

describe("POST /api/user/create", ()=> {
    it("200: 유저 생성 성공", async () => {
        const testUser = Builder(CreateUserDto)
                        .userName('test')
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

describe("PUT /api/user/update", ()=> {
   it("200 유저 정보 업데이트", async () => {

   });
});

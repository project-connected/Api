import request from 'supertest';
import app from './config/initApp';
import {createDatabaseConnection} from './config/initDb';
import {Sequelize} from "sequelize-typescript";
import {CreateUserDto, UpdateUserDto} from "../../src/dtos/UserDto";
import {Builder } from 'builder-pattern';
let db: Sequelize;

beforeAll(async () => {
    db = await createDatabaseConnection();
    await Promise.all([db])
})

afterAll(async () => {
    await db.close();
})

describe("GET /api/commmon/all", () => {
    it("200 모든 공통 데이터 가져오기 성공", async () => {
        const response = await request(app)
            .get("/api/common/all")
            .expect(200);

        const {body} = response;
        expect(200).toEqual(body.status);
        const {result} = body;
        console.log(result);
    })
})

describe("GET /api/commmon/areas", () => {
    it("200 공통 지역 데이터 가져오기 성공", async () => {
        const response = await request(app)
            .get("/api/common/areas")
            .expect(200);

        const {body} = response;
        expect(200).toEqual(body.status);
        const {result} = body;
        console.log(result);
    })
})

describe("GET /api/commmon/skills", () => {
    it("200 공통 스킬 데이터 가져오기 성공", async () => {
        const response = await request(app)
            .get("/api/common/skills")
            .expect(200);

        const {body} = response;
        expect(200).toEqual(body.status);
        const {result} = body;
        console.log(result);
    })
})

describe("GET /api/commmon/themes", () => {
    it("200 공통 테마 데이터 가져오기 성공", async () => {
        const response = await request(app)
            .get("/api/common/themes")
            .expect(200);

        const {body} = response;
        expect(200).toEqual(body.status);
        const {result} = body;
        console.log(result);
    })
})

describe("GET /api/commmon/status", () => {
    it("200 공통 상태 데이터 가져오기 성공", async () => {
        const response = await request(app)
            .get("/api/common/status")
            .expect(200);

        const {body} = response;
        expect(200).toEqual(body.status);
        const {result} = body;
        console.log(result);
    })
})
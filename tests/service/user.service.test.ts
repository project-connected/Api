import {Sequelize} from "sequelize-typescript";
import {createDatabaseConnection} from "../api/config/initDb";
import {UserService} from "../../src/services/UserService";
import {Builder} from "builder-pattern";
import {CreateUserDto, UpdateUserDto} from "../../src/dtos/UserDto";

describe("userService 유닛 테스트", () => {
    let db: Sequelize;
    let userService : UserService;
    let testUser;

    beforeAll(async () => {
        db = await createDatabaseConnection();
        userService = new UserService();
    });

    afterAll(async () => {
        await db.close();
    });

    it("유저 생성 후 유저 정보 반환 성공", async () => {
        const seedUser = Builder(CreateUserDto)
            .userName('test')
            .password("1234")
            .email('test@test.com')
            .build();

        testUser = await userService.createUser(seedUser);
        expect(testUser.userName).toBe('test');
        expect(testUser.email).toBe('test@test.com');
    });

    it("id가 일치하는 유저 정보 업데이트 성공", async ()=> {
        const prevUserEmail = testUser.email;
        const prevUserName = testUser.userName;
        const prevUserId = testUser.userId;

        const updateUser = Builder(UpdateUserDto)
            .userId(prevUserId)
            .userName("update")
            .build();

        const result = await userService.updateUser(
            prevUserId,
            updateUser
        );
        expect(result.userId).toBe(prevUserId);
        expect(result.userName).toBe("update");
    });
});
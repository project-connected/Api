import {Sequelize} from "sequelize-typescript";
import {env} from "../../../src/env";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    host:env.database.host,
    database: ":memory:",
    models: [__dirname + "/../../../src/entities/*{.ts,.js}"],
    sync:{force:true}
});


export async function createDatabaseConnection(): Promise<Sequelize> {
    try {
        await sequelize.authenticate(); // 연결 테스트
        await migrate();
        return sequelize;
    } catch (error) {
        throw error;
    }
}

async function migrate() {
    await sequelize.sync().then(() => {
        // console.log('✓ DB connection success.');
    })
    .catch(err => {
        console.error(err);
        process.exit();
    });
}
import { Sequelize } from 'sequelize-typescript';
import { env } from "./env";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host:env.database.host,
    port: env.database.port || 5432,
    username: env.database.username,
    password: env.database.password,
    database: env.database.name,
    models: [__dirname + "/entities/*{.ts,.js}"]
});

export async function createDatabaseConnection(): Promise<void> {
    try {
        await sequelize.authenticate(); // 연결 테스트
        if (env.isProduction == false){
            await migrate(); // 실제 서비스가 아닐 경우 DB 테이블 재생성
        }
    } catch (error) {
        throw error;
    }
}

async function migrate() {
    console.log('start db migrate');
    await sequelize.sync().then(() => {
        console.log('✓ DB connection success.');
        console.log('  Press CTRL-C to stop\n');
    })
    .catch(err => {
        console.error(err);
        console.log('✗ DB connection error. Please make sure DB is running.');
        process.exit();
    });
    console.log('end db migrate');
}
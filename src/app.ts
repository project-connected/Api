import express from 'express';
import bodyParser from "body-parser";
import {createDatabaseConnection, sequelize} from './database';
import {Container} from 'typedi';
import {
    useContainer,
    useExpressServer
} from 'routing-controllers';
import { routingControllerOptions } from './utils/RoutingConfig';
import passport from "passport";

export class App{
    public app: express.Application;

    constructor() {
        this.app = express();
        this.setDatabase();
        this.setMiddlewares();
    }

    private async setDatabase():Promise<void> {
        try {
            await createDatabaseConnection();
            Container.set("sequelize",sequelize);
        } catch (e) {
            console.log(e);
        }
    }

    private setMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use(passport.initialize()); // bodyParser 이후에 셋팅. 데이터 전달이 가능하다.
        this.app.use(passport.session());
    }

    public async createExpressServer(port: number): Promise<void> {
        try{
            useContainer(Container);
            useExpressServer(this.app, routingControllerOptions);
            this.app.listen(port, ()=>{
                console.log(`Server is running on ${port} port`);
            });
        }catch (error) {
            // Todo : logger를 남겨야함
            console.log(error);
        }
    }
}
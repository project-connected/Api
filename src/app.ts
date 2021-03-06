import express from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import {createDatabaseConnection, sequelize} from './database';
import session from 'express-session';
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
        this.app.set('trust proxy', 1);
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
        // this.app.use(express.json());
        // this.app.use(express.urlencoded({extended:false}));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use(cookieParser());
        // this.app.use(session({
        //     secret: 'secret',
        //     saveUninitialized: false,
        //     resave: false,
        //     proxy: true,
        //     cookie: {
        //         secure: true,
        //         httpOnly:false,
        //         sameSite:"none",
        //         domain:".anjoy.info"
        //     }
        // }));
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
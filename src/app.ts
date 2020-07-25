import express from 'express';
import bodyParser from "body-parser";
import {createDatabaseConnection} from './database';
import {Container} from 'typedi';
import {
    useContainer,
    useExpressServer
} from 'routing-controllers';
import { routingControllerOptions } from './utils/RoutingConfig';
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
        } catch (e) {
            console.log(e);
        }
    }

    private setMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
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
import express from 'express';
import { Container } from 'typedi';
import {
    useExpressServer,
    useContainer, Action
} from 'routing-controllers';
import passprot from "passport";
import bodyParser from "body-parser";

useContainer(Container);
const app = express();

app.use(bodyParser.json());
app.use(passprot.initialize());
app.use(passprot.session());

function setExpress() {
    useExpressServer(app, {
        routePrefix: "/api",
        controllers: [__dirname+"/../../../src/controllers/*{.ts,.js}"],
        middlewares: [__dirname+"/../../../src/middlewares/*{.ts,.js}"],
        authorizationChecker: async (action: Action, roles: string[]) => {

            return true;
        },
    });
}
setExpress();

export default app;
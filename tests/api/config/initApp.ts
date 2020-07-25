import express from 'express';
import { Container } from 'typedi';
import {
    useExpressServer,
    useContainer
} from 'routing-controllers';

useContainer(Container);
const app = express();

function setExpress() {
    useExpressServer(app, {
        routePrefix: "/api",
        controllers: [__dirname+"/../../../src/controllers/*{.ts,.js}"],
        middlewares: [__dirname+"/../../../src/middlewares/*{.ts,.js}"],
    });
}
setExpress();

export default app;
import express from 'express';
import { Container } from 'typedi';
import {
    useExpressServer,
    useContainer, Action
} from 'routing-controllers';
import passprot from "passport";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {env} from "../../../src/env";
import {User} from "../../../src/entities/User";
import {sequelize} from "./initDb";

Container.set("sequelize",sequelize);
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
            try {
                const token = action.request.headers["authorization"];

                // json web token을 해독함
                const decode: any = jwt.verify(token, env.app.jwtAccessSecret || "");

                // 해독한 정보에서 id를 가져옴
                const { id } = decode;

                // id로부터 유저 정보를 받아옴
                const user = await User.findOne({where:{userId:id}});
                //Todo roles 추가하기
                if (user)
                    return true;
                return false;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        currentUserChecker: async (action:Action) => {
            try {
                const token = action.request.headers["authorization"];
                // json web token을 해독함
                const decode: any = jwt.verify(token, env.app.jwtAccessSecret || "");

                // 해독한 정보에서 id를 가져옴
                const { id } = decode;
                // id로부터 유저 정보를 받아옴
                const user = await User.findOne({where:{userId:id}});
                return user;
            } catch (error) {
                return undefined;
            }
        }
    });
}
setExpress();

export default app;
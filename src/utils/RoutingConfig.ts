import "reflect-metadata";
import {Action, RoutingControllersOptions} from "routing-controllers";
import jwt from "jsonwebtoken";
import {env} from '../env';
import {User} from '../entities/User';

/**
 * 설정 참조 : https://github.com/typestack/routing-controllers#using-authorization-features
 */
export const routingControllerOptions:RoutingControllersOptions = {
    cors : {
        origin : "http://connected.anjoy.info",
        credentials: true,
    },
    routePrefix : "/api",
    controllers : [`${__dirname}/../controllers/*{.ts,.js}`],
    middlewares: [`${__dirname}/../middlewares/*{.ts,.js}`],
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
}
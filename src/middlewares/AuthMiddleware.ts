import {ExpressMiddlewareInterface} from "routing-controllers";
import passport from "passport";
import "../utils/passport";

export class LocalAuthenticate implements ExpressMiddlewareInterface {
    authenticate = (callback) => passport.authenticate("local", callback);

    use(req: any, res: any, next: (err?: any) => any): any {
       return this.authenticate( (err, user, info) => {
           const error = info || err;
           if (error) return res.status(401).json(error);
           req.user = user;
           next();
       })(req, res, next);
    }
}


// export class JwtAuthenticate implements ExpressMiddlewareInterface {
//     use(request: any, response: any, next: (err?: any) => any): any {
//
//     }
// }
//
// export class FacebookAuthenticate implements ExpressMiddlewareInterface {
//     use(request: any, response: any, next: (err?: any) => any): any {
//
//     }
// }

import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';

@Middleware({ type: 'after' })
export class FinalMiddleware implements ExpressMiddlewareInterface {

    public use(req: Request, res: Response, next?: NextFunction): void {
        if(!res.headersSent) {
            // TODO: match current url against every registered one
            // because finalhandler is reached if no value is returned in the controller.
            // so we need to set 404 only if really there are no path handling this.
            // or we just have to return with null?
            res.status(404);
            res.send({message:"존재하지 않는 경로입니다."});
        }
        res.end();
    }

}
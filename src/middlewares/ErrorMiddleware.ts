import { Request, Response, NextFunction } from "express";
import {
    Middleware,
    ExpressErrorMiddlewareInterface,
} from "routing-controllers";

/**
 * Error를 처리하는 미들웨어
 */
@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, req: Request, res: Response, next: NextFunction): void {
        console.log(error);
        if (res.statusCode == 401){
            res.status(res.statusCode).json(error);
            return;
        }
        next(error);
    }
}
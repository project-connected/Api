"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var FinalMiddleware = /** @class */ (function () {
    function FinalMiddleware() {
    }
    FinalMiddleware.prototype.use = function (req, res, next) {
        if (!res.headersSent) {
            // TODO: match current url against every registered one
            // because finalhandler is reached if no value is returned in the controller.
            // so we need to set 404 only if really there are no path handling this.
            // or we just have to return with null?
            res.status(404);
            res.send({ message: "존재하지 않는 경로입니다." });
        }
        res.end();
    };
    FinalMiddleware = __decorate([
        routing_controllers_1.Middleware({ type: 'after' })
    ], FinalMiddleware);
    return FinalMiddleware;
}());
exports.FinalMiddleware = FinalMiddleware;

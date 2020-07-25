"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var helmet_1 = __importDefault(require("helmet"));
/**
 * Express 보안을 위한 Helmet을 적용하도록 하는 전역 미들웨어
 */
var SecurityMiddleware = /** @class */ (function () {
    function SecurityMiddleware() {
    }
    SecurityMiddleware.prototype.use = function (req, res, next) {
        return helmet_1.default()(req, res, next);
    };
    SecurityMiddleware = __decorate([
        routing_controllers_1.Middleware({ type: "before" })
    ], SecurityMiddleware);
    return SecurityMiddleware;
}());
exports.SecurityMiddleware = SecurityMiddleware;

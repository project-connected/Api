"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routingControllerOptions = {
    cors: true,
    routePrefix: "/api",
    controllers: [__dirname + "/../controllers/*{.ts,.js}"],
    middlewares: [__dirname + "/../middlewares/*{.ts,.js}"],
};

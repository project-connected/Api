"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var env_1 = require("./env");
try {
    var app = new app_1.App();
    var port = env_1.env.app.port;
    app.createExpressServer(port);
}
catch (error) {
    console.log(error);
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var User_1 = require("../entities/User");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    CreateUserDto.prototype.toEntity = function () {
        var _a = this, userName = _a.userName, email = _a.email;
        var user = new User_1.User();
        user.email = email;
        user.userName = userName;
        return user;
    };
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.Length(1, 20)
    ], CreateUserDto.prototype, "userName", void 0);
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.Length(1, 100),
        class_validator_1.IsEmail()
    ], CreateUserDto.prototype, "email", void 0);
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.phone = user.phone;
        this.activated = user.activated;
    }
}
exports.default = UserDto;

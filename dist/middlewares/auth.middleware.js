"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const base_error_1 = __importDefault(require("../errors/base.error"));
const token_service_1 = __importDefault(require("../services/token.service"));
function default_1(req, res, next) {
    try {
        const authHead = req.headers.authorization;
        if (!authHead)
            return next(base_error_1.default.UnauthorizedError());
        const accessToken = authHead.split(" ").at(1);
        const userData = token_service_1.default.validateAccessToken(accessToken);
        if (!userData)
            return next(base_error_1.default.UnauthorizedError());
        // @ts-ignore
        req.user = userData;
        next();
    }
    catch (_a) {
        return next(base_error_1.default.UnauthorizedError());
    }
}

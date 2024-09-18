"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const express_validator_1 = require("express-validator");
const base_error_1 = __importDefault(require("../errors/base.error"));
class AuthController {
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty())
                    return next(base_error_1.default.BadRequest("Error with signing up", errors.array()));
                const user = yield auth_service_1.default.signup(req.body);
                res.cookie("refreshToken", user.refreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                });
                res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    signin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty())
                    return next(base_error_1.default.BadRequest("Error with signing in", errors.array()));
                const user = yield auth_service_1.default.signin(req.body);
                res.cookie("refreshToken", user.refreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                });
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    signout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_service_1.default.signout(req.cookies.refreshToken);
                res.clearCookie("refreshToken");
                res.status(200).json({ message: "User have just signed out successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_service_1.default.activate(req.params.slug);
                res.redirect(process.env.CLIENT_URL);
            }
            catch (error) {
                next(error);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_service_1.default.refresh(req.cookies.refreshToken);
                res.cookie("refreshToken", user.refreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                });
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    forgotPass(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_service_1.default.forgotPass(req.body.email);
                res.status(200).json({ message: "Account is ready for recovery" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    recAcc(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_service_1.default.recAcc(req.body.token, req.body.pass);
                res.status(200).json({ message: "Account is recovered" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_service_1.default.getUser(+req.params.id);
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield auth_service_1.default.getUsers();
                res.status(200).json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();

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
const pg_database_1 = __importDefault(require("../database/pg.database"));
const user_dto_1 = __importDefault(require("../dtos/user.dto"));
const bcrypt_1 = require("bcrypt");
const mail_service_1 = __importDefault(require("./mail.service"));
const token_service_1 = __importDefault(require("./token.service"));
const base_error_1 = __importDefault(require("../errors/base.error"));
class AuthSerivce {
    signup(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, phone, pass } = body;
            const existedUser = yield pg_database_1.default.query("SELECT * FROM users WHERE username=$1 OR email=$2", [
                username,
                email,
            ]);
            if (existedUser.rows.at(0)) {
                throw base_error_1.default.BadRequest("User has already signed up");
            }
            const hashedPass = yield (0, bcrypt_1.hash)(pass, 10);
            const user = yield pg_database_1.default.query("INSERT INTO users (username, email, phone, pass) VALUES ($1, $2, $3, $4) RETURNING *", [username, email, phone, hashedPass]);
            const userDto = new user_dto_1.default(user.rows.at(0));
            yield mail_service_1.default.sendActivationLink(userDto.email, `${process.env.API_URL}/api/auth/activate/${userDto.username}`);
            const tokens = token_service_1.default.generateToken(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign({ user: userDto }, tokens);
        });
    }
    signin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, pass } = body;
            const user = yield pg_database_1.default.query("SELECT * FROM users WHERE email=$1", [email]);
            if (!user.rows.at(0)) {
                throw base_error_1.default.BadRequest("User has not signed up yet");
            }
            const correctPass = yield (0, bcrypt_1.compare)(pass, user.rows.at(0).pass);
            if (!correctPass) {
                throw base_error_1.default.BadRequest("Incorrect password");
            }
            const userDto = new user_dto_1.default(user.rows.at(0));
            const tokens = token_service_1.default.generateToken(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign({ user: userDto }, tokens);
        });
    }
    signout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield token_service_1.default.removeToken(refreshToken);
        });
    }
    activate(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield pg_database_1.default.query("SELECT * FROM users WHERE username=$1", [slug]);
            if (!user.rows.at(0))
                throw base_error_1.default.BadRequest("User not found");
            yield pg_database_1.default.query("UPDATE users SET activated=$1 WHERE username=$2 RETURNING *", [true, slug]);
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPayload = token_service_1.default.validateRefreshToken(refreshToken);
            const foundRefreshToken = yield token_service_1.default.findRefreshToken(refreshToken);
            if (!userPayload || !foundRefreshToken)
                throw base_error_1.default.UnauthorizedError();
            // @ts-ignore
            const user = yield pg_database_1.default.query("SELECT * FROM users WHERE id=$1", [+userPayload.id]);
            const userDto = new user_dto_1.default(user.rows.at(0));
            const tokens = token_service_1.default.generateToken(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign({ user: userDto }, tokens);
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield pg_database_1.default.query("SELECT * FROM users WHERE id=$1", [id]);
            const userDto = new user_dto_1.default(user.rows.at(0));
            return { user: userDto };
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield pg_database_1.default.query("SELECT * FROM users");
            const userDtos = users.rows.map(user => new user_dto_1.default(user));
            return { users: userDtos };
        });
    }
    forgotPass(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email)
                throw base_error_1.default.BadRequest("Email must not be empty");
            const user = yield pg_database_1.default.query("SELECT * FROM users WHERE email=$1", [email]);
            if (!user.rows.at(0))
                throw base_error_1.default.BadRequest("User has not registered with this email");
            const userDto = new user_dto_1.default(user.rows.at(0));
            const tokens = token_service_1.default.generateToken(Object.assign({}, userDto));
            yield mail_service_1.default.sendForgotPass(userDto.email, `${process.env.CLIENT_URL}/rec-acc/${tokens.accessToken}`);
        });
    }
    recAcc(token, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = token_service_1.default.validateAccessToken(token);
            if (!userData)
                throw base_error_1.default.UnauthorizedError();
            const hashedPass = yield (0, bcrypt_1.hash)(pass, 10);
            // @ts-ignore
            yield pg_database_1.default.query("UPDATE users SET pass=$1 WHERE id=$2", [hashedPass, userData.id]);
        });
    }
}
exports.default = new AuthSerivce();

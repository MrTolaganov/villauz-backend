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
const jsonwebtoken_1 = require("jsonwebtoken");
class TokenService {
    generateToken(payload) {
        const accessToken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_ACCESS_KEY, { expiresIn: "15m" });
        const refreshToken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_REFRESH_KEY, { expiresIn: "30d" });
        return { accessToken, refreshToken };
    }
    saveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedToken = yield pg_database_1.default.query("SELECT * FROM tokens WHERE userId=$1", [userId]);
            if (existedToken.rows.at(0)) {
                yield pg_database_1.default.query("UPDATE tokens SET refreshToken=$1 WHERE userId=$2 RETURNING *", [
                    refreshToken,
                    userId,
                ]);
            }
            else {
                yield pg_database_1.default.query("INSERT INTO tokens (userId, refreshToken) VALUES ($1, $2) RETURNING *", [
                    userId,
                    refreshToken,
                ]);
            }
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pg_database_1.default.query("DELETE FROM tokens WHERE refreshtoken=$1", [refreshToken]);
        });
    }
    validateAccessToken(accessToken) {
        try {
            return (0, jsonwebtoken_1.verify)(accessToken, process.env.JWT_ACCESS_KEY);
        }
        catch (_a) {
            return null;
        }
    }
    validateRefreshToken(refreshToken) {
        try {
            return (0, jsonwebtoken_1.verify)(refreshToken, process.env.JWT_REFRESH_KEY);
        }
        catch (_a) {
            return null;
        }
    }
    findRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield pg_database_1.default.query("SELECT * FROM tokens WHERE refreshToken=$1", [refreshToken])).rows.at(0);
        });
    }
}
exports.default = new TokenService();

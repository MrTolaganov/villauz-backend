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
const axios_1 = __importDefault(require("axios"));
const axios_2 = __importDefault(require("./axios"));
const $api = axios_1.default.create({
    baseURL: `${process.env.API_URL}/api`,
    withCredentials: true,
});
$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
});
$api.interceptors.response.use(config => {
    return config;
}, (err) => __awaiter(void 0, void 0, void 0, function* () {
    const originalRequest = err.config;
    if (err.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        try {
            originalRequest._isRetry = true;
            const { data } = yield axios_2.default.get("/auth/refresh");
            localStorage.setItem("accessToken", data.accessToken);
            return $api.request(originalRequest);
        }
        catch (error) {
            console.log(error);
        }
    }
    throw err;
}));
exports.default = $api;

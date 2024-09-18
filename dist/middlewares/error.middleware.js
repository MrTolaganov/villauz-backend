"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const base_error_1 = __importDefault(require("../errors/base.error"));
function default_1(err, req, res, next) {
    if (err instanceof base_error_1.default)
        return res.status(err.status).json({ message: err.message });
    return res.status(200).json({ message: "Server error" });
}

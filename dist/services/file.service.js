"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const base_error_1 = __importDefault(require("../errors/base.error"));
class FileService {
    saveFile(file) {
        try {
            const fileName = Date.now() + ".jpg";
            const staticDir = path_1.default.join(__dirname, "..", "static");
            const filePath = path_1.default.join(staticDir, fileName);
            if (!fs_1.default.existsSync(staticDir)) {
                fs_1.default.mkdirSync(staticDir, { recursive: true });
            }
            file.mv(filePath);
            return fileName;
        }
        catch (error) {
            throw base_error_1.default.BadRequest(`${error}`);
        }
    }
}
exports.default = new FileService();

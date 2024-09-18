"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const house_route_1 = __importDefault(require("./routes/house.route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.static("static"));
app.use("/api/auth", auth_route_1.default);
app.use("/api/house", house_route_1.default);
app.use(error_middleware_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});

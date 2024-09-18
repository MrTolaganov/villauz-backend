"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const house_controller_1 = __importDefault(require("../controllers/house.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const author_middleware_1 = __importDefault(require("../middlewares/author.middleware"));
const houseRouter = (0, express_1.Router)();
houseRouter.post("/create", auth_middleware_1.default, house_controller_1.default.createHouse);
houseRouter.put("/update/:id", auth_middleware_1.default, author_middleware_1.default, house_controller_1.default.updateHouse);
houseRouter.delete("/delete/:id", auth_middleware_1.default, author_middleware_1.default, house_controller_1.default.deleteHouse);
houseRouter.get("/gethouse/:id", house_controller_1.default.getHouse);
houseRouter.get("/gethouses", house_controller_1.default.getHouses);
exports.default = houseRouter;

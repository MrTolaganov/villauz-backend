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
const house_service_1 = __importDefault(require("../services/house.service"));
class HouseController {
    createHouse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const house = yield house_service_1.default.createHouse(req.body, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image, 
                // @ts-ignore
                +req.user.id);
                res.status(201).json(house);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    updateHouse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const house = yield house_service_1.default.updateHouse(+req.params.id, req.body);
                res.status(200).json(house);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteHouse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield house_service_1.default.deleteHouse(+req.params.id);
                res.status(200).json({ message: "House has just deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getHouse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const house = yield house_service_1.default.getHouse(+req.params.id);
                res.status(200).json(house);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getHouses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const houses = yield house_service_1.default.getHouses();
                res.status(200).json(houses);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new HouseController();

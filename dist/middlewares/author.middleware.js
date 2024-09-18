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
exports.default = default_1;
const base_error_1 = __importDefault(require("../errors/base.error"));
const house_service_1 = __importDefault(require("../services/house.service"));
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { house } = yield house_service_1.default.getHouse(+req.params.id);
            // @ts-ignore
            if (+house.owner.id !== +req.user.id)
                return next(base_error_1.default.BadRequest("Only author can edit or delete this house"));
            next();
        }
        catch (error) {
            return next(base_error_1.default.BadRequest("Only author can edit or delete this house"));
        }
    });
}

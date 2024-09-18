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
const house_dto_1 = __importDefault(require("../dtos/house.dto"));
const file_service_1 = __importDefault(require("./file.service"));
const auth_service_1 = __importDefault(require("./auth.service"));
class HouseService {
    createHouse(house, files, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { label, body, price } = house;
            const image = file_service_1.default.saveFile(files);
            console.log(userId);
            const userData = yield auth_service_1.default.getUser(userId);
            const data = yield pg_database_1.default.query(`INSERT INTO houses (label, image, body, price, owner) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [label, image, body, price, JSON.stringify(userData.user)]);
            const houseDto = new house_dto_1.default(data.rows.at(0));
            return { house: Object.assign(Object.assign({}, houseDto), { owner: userData.user }) };
        });
    }
    updateHouse(id, house) {
        return __awaiter(this, void 0, void 0, function* () {
            const { label, body, price } = house;
            const prevData = yield pg_database_1.default.query("SELECT * FROM houses WHERE id=$1", [id]);
            const data = yield pg_database_1.default.query("UPDATE houses SET label=$1, body=$2, price=$3 WHERE id=$4 RETURNING *", [
                label ? label : prevData.rows.at(0).label,
                body ? body : prevData.rows.at(0).body,
                price ? price : prevData.rows.at(0).price,
                id,
            ]);
            const houseDto = new house_dto_1.default(data.rows.at(0));
            return { house: houseDto };
        });
    }
    deleteHouse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pg_database_1.default.query("DELETE FROM houses WHERE id=$1", [id]);
        });
    }
    getHouse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield pg_database_1.default.query("SELECT * FROM houses WHERE id=$1", [id]);
            const houseDto = new house_dto_1.default(data.rows.at(0));
            return { house: houseDto };
        });
    }
    getHouses() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield pg_database_1.default.query("SELECT * FROM houses");
            const housesDtos = data.rows.map((house) => new house_dto_1.default(house));
            return { houses: housesDtos };
        });
    }
}
exports.default = new HouseService();

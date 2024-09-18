"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HouseDto {
    constructor(house) {
        this.id = house.id;
        this.label = house.label;
        this.image = house.image;
        this.body = house.body;
        this.price = house.price;
        this.owner = house.owner || {};
    }
}
exports.default = HouseDto;

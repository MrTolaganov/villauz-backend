import { UploadedFile } from "express-fileupload";
import client from "../database/pg.database";
import HouseDto from "../dtos/house.dto";
import { HouseType } from "../types";
import fileService from "./file.service";
import authService from "./auth.service";

class HouseService {
  async createHouse(house: HouseType, files: UploadedFile, userId: number) {
    const { label, body, price } = house;
    const image = fileService.saveFile(files);
    console.log(userId);
    const userData = await authService.getUser(userId);
    const data = await client.query(
      `INSERT INTO houses (label, image, body, price, owner) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [label, image, body, price, JSON.stringify(userData.user)]
    );
    const houseDto = new HouseDto(data.rows.at(0));
    return { house: { ...houseDto, owner: userData.user } };
  }
  async updateHouse(id: number, house: HouseType) {
    const { label, body, price } = house;
    const prevData = await client.query("SELECT * FROM houses WHERE id=$1", [id]);
    const data = await client.query(
      "UPDATE houses SET label=$1, body=$2, price=$3 WHERE id=$4 RETURNING *",
      [
        label ? label : prevData.rows.at(0).label,
        body ? body : prevData.rows.at(0).body,
        price ? price : prevData.rows.at(0).price,
        id,
      ]
    );
    const houseDto = new HouseDto(data.rows.at(0));
    return { house: houseDto };
  }
  async deleteHouse(id: number) {
    await client.query("DELETE FROM houses WHERE id=$1", [id]);
  }
  async getHouse(id: number) {
    const data = await client.query("SELECT * FROM houses WHERE id=$1", [id]);
    const houseDto = new HouseDto(data.rows.at(0));
    return { house: houseDto };
  }
  async getHouses() {
    const data = await client.query("SELECT * FROM houses");
    const housesDtos = data.rows.map((house: HouseType) => new HouseDto(house));

    return { houses: housesDtos };
  }
}

export default new HouseService();

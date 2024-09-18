import { HouseType, UserType } from "../types";

export default class HouseDto {
  id: number | undefined;
  label: string;
  image: string | undefined;
  body: string;
  price: number;
  owner: UserType | number;
  constructor(house: HouseType) {
    this.id = house.id;
    this.label = house.label;
    this.image = house.image;
    this.body = house.body;
    this.price = house.price;
    this.owner = house.owner || ({} as UserType);
  }
}

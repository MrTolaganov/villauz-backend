import { UserType } from "../types";

export default class UserDto {
  id: number | undefined;
  username: string;
  email: string;
  phone: string;
  activated:boolean
  constructor(user: UserType) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.phone = user.phone;
    this.activated=user.activated
  }
}

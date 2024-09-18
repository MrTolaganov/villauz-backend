import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import { JwtPayload } from "jsonwebtoken";

export interface UserType  {
  id?: number;
  username: string;
  email: string;
  phone: string;
  activated: boolean;
  pass?: string;
};

export type HouseType = {
  id?: number;
  label: string;
  image?: string;
  body: string;
  price: number;
  owner?: UserType;
};

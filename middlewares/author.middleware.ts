import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/base.error";
import houseService from "../services/house.service";

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { house } = await houseService.getHouse(+req.params.id);
    // @ts-ignore
    if (+house.owner.id !== +req.user.id)
      return next(BaseError.BadRequest("Only author can edit or delete this house"));
    next();
  } catch (error) {
    return next(BaseError.BadRequest("Only author can edit or delete this house"));
  }
}

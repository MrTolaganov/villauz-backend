import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/base.error";
import tokenService from "../services/token.service";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHead = req.headers.authorization;
    if (!authHead) return next(BaseError.UnauthorizedError());
    const accessToken = authHead.split(" ").at(1);
    const userData = tokenService.validateAccessToken(accessToken!);
    if (!userData) return next(BaseError.UnauthorizedError());
    // @ts-ignore
    req.user = userData;
    next();
  } catch {
    return next(BaseError.UnauthorizedError());
  }
}

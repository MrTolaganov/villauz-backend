import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/base.error";

export default function (err: object, req: Request, res: Response, next: NextFunction) {
  if (err instanceof BaseError) return res.status(err.status).json({ message: err.message });
  return res.status(200).json({ message: "Server error" });
}

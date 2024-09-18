import { NextFunction, Request, Response } from "express";
import houseService from "../services/house.service";
import { UploadedFile } from "express-fileupload";

class HouseController {
  async createHouse(req: Request, res: Response, next: NextFunction) {
    try {
      const house = await houseService.createHouse(
        req.body,
        req.files?.image as UploadedFile,
        // @ts-ignore
        +req.user.id
      );
      res.status(201).json(house);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
  async updateHouse(req: Request, res: Response, next: NextFunction) {
    try {
      const house = await houseService.updateHouse(+req.params.id, req.body);
      res.status(200).json(house);
    } catch (error) {
      next(error);
    }
  }
  async deleteHouse(req: Request, res: Response, next: NextFunction) {
    try {
      await houseService.deleteHouse(+req.params.id);
      res.status(200).json({ message: "House has just deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
  async getHouse(req: Request, res: Response, next: NextFunction) {
    try {
      const house = await houseService.getHouse(+req.params.id);
      res.status(200).json(house);
    } catch (error) {
      next(error);
    }
  }
  async getHouses(req: Request, res: Response, next: NextFunction) {
    try {
      const houses = await houseService.getHouses();
      res.status(200).json(houses);
    } catch (error) {
      next(error);
    }
  }
}

export default new HouseController();

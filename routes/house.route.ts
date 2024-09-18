import { Router } from "express";
import houseController from "../controllers/house.controller";
import authMiddleware from "../middlewares/auth.middleware";
import authorMiddleware from "../middlewares/author.middleware";

const houseRouter = Router();

houseRouter.post("/create", authMiddleware, houseController.createHouse);
houseRouter.put("/update/:id", authMiddleware, authorMiddleware, houseController.updateHouse);
houseRouter.delete("/delete/:id", authMiddleware, authorMiddleware, houseController.deleteHouse);
houseRouter.get("/gethouse/:id", houseController.getHouse);
houseRouter.get("/gethouses", houseController.getHouses);

export default houseRouter;

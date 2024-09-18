import { Router } from "express";
import authController from "../controllers/auth.controller";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post(
  "/signup",
  body("username").trim().isLength({ min: 3 }),
  body("email").isEmail(),
  body("phone").trim().isLength({ min: 13, max: 13 }),
  body("pass").trim().isLength({ min: 8, max: 16 }),
  authController.signup
);
authRouter.post(
  "/signin",
  body("email").isEmail(),
  body("pass").isLength({ min: 8, max: 16 }),
  authController.signin
);
authRouter.delete("/signout", authController.signout);
authRouter.get("/activate/:slug", authController.activate);
authRouter.get("/refresh", authController.refresh);
authRouter.post("/forgot-pass", authController.forgotPass);
authRouter.put("/rec-acc", authController.recAcc);
authRouter.get("/getuser/:id", authController.getUser);
authRouter.get("/getusers", authMiddleware, authController.getUsers);

export default authRouter;

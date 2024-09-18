import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import { validationResult } from "express-validator";
import BaseError from "../errors/base.error";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return next(BaseError.BadRequest("Error with signing up", errors.array() as never[]));
      const user = await authService.signup(req.body);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return next(BaseError.BadRequest("Error with signing in", errors.array() as never[]));
      const user = await authService.signin(req.body);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async signout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.signout(req.cookies.refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "User have just signed out successfully" });
    } catch (error) {
      next(error);
    }
  }
  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.activate(req.params.slug);
      res.redirect(process.env.CLIENT_URL!);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.refresh(req.cookies.refreshToken);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async forgotPass(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.forgotPass(req.body.email);
      res.status(200).json({ message: "Account is ready for recovery" });
    } catch (error) {
      next(error);
    }
  }
  async recAcc(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.recAcc(req.body.token, req.body.pass);
      res.status(200).json({ message: "Account is recovered" });
    } catch (error) {
      next(error);
    }
  }
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.getUser(+req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await authService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}
export default new AuthController();

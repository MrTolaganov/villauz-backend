import client from "../database/pg.database";
import UserDto from "../dtos/user.dto";
import { UserType } from "../types";
import { compare, hash } from "bcrypt";
import mailService from "./mail.service";
import tokenService from "./token.service";
import BaseError from "../errors/base.error";

class AuthSerivce {
  async signup(body: UserType) {
    const { username, email, phone, pass } = body;
    const existedUser = await client.query("SELECT * FROM users WHERE username=$1 OR email=$2", [
      username,
      email,
    ]);
    if (existedUser.rows.at(0)) {
      throw BaseError.BadRequest("User has already signed up");
    }
    const hashedPass = await hash(pass!, 10);
    const user = await client.query(
      "INSERT INTO users (username, email, phone, pass) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, phone, hashedPass]
    );
    const userDto = new UserDto(user.rows.at(0));
    await mailService.sendActivationLink(
      userDto.email,
      `${process.env.API_URL}/api/auth/activate/${userDto.username}`
    );
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }
  async signin(body: UserType) {
    const { email, pass } = body;
    const user = await client.query("SELECT * FROM users WHERE email=$1", [email]);
    if (!user.rows.at(0)) {
      throw BaseError.BadRequest("User has not signed up yet");
    }
    const correctPass = await compare(pass!, user.rows.at(0).pass);
    if (!correctPass) {
      throw BaseError.BadRequest("Incorrect password");
    }
    const userDto = new UserDto(user.rows.at(0));
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }
  async signout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }
  async activate(slug: string) {
    const user = await client.query("SELECT * FROM users WHERE username=$1", [slug]);
    if (!user.rows.at(0)) throw BaseError.BadRequest("User not found");
    await client.query("UPDATE users SET activated=$1 WHERE username=$2 RETURNING *", [true, slug]);
  }
  async refresh(refreshToken: string) {
    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const foundRefreshToken = await tokenService.findRefreshToken(refreshToken);
    if (!userPayload || !foundRefreshToken) throw BaseError.UnauthorizedError();
    // @ts-ignore
    const user = await client.query("SELECT * FROM users WHERE id=$1", [+userPayload.id]);
    const userDto = new UserDto(user.rows.at(0));
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }
  async getUser(id: number) {
    const user = await client.query("SELECT * FROM users WHERE id=$1", [id]);
    const userDto = new UserDto(user.rows.at(0));
    return { user: userDto };
  }
  async getUsers() {
    const users = await client.query("SELECT * FROM users");
    const userDtos = users.rows.map(user => new UserDto(user));
    return { users: userDtos };
  }
  async forgotPass(email: string) {
    if (!email) throw BaseError.BadRequest("Email must not be empty");
    const user = await client.query("SELECT * FROM users WHERE email=$1", [email]);
    if (!user.rows.at(0)) throw BaseError.BadRequest("User has not registered with this email");
    const userDto = new UserDto(user.rows.at(0));
    const tokens = tokenService.generateToken({ ...userDto });
    await mailService.sendForgotPass(
      userDto.email,
      `${process.env.CLIENT_URL}/rec-acc/${tokens.accessToken}`
    );
  }
  async recAcc(token: string, pass: string) {
    const userData = tokenService.validateAccessToken(token);
    if (!userData) throw BaseError.UnauthorizedError();
    const hashedPass = await hash(pass, 10);
    // @ts-ignore
    await client.query("UPDATE users SET pass=$1 WHERE id=$2", [hashedPass, userData.id]);
  }
}

export default new AuthSerivce();

import client from "../database/pg.database";
import { UserType } from "../types";
import { JwtPayload, sign, verify } from "jsonwebtoken";

class TokenService {
  generateToken(payload: UserType) {
    const accessToken = sign(payload, process.env.JWT_ACCESS_KEY!, { expiresIn: "15m" });
    const refreshToken = sign(payload, process.env.JWT_REFRESH_KEY!, { expiresIn: "30d" });
    return { accessToken, refreshToken };
  }
  async saveToken(userId: number | undefined, refreshToken: string) {
    const existedToken = await client.query("SELECT * FROM tokens WHERE userId=$1", [userId]);

    if (existedToken.rows.at(0)) {
      await client.query("UPDATE tokens SET refreshToken=$1 WHERE userId=$2 RETURNING *", [
        refreshToken,
        userId,
      ]);
    } else {
      await client.query("INSERT INTO tokens (userId, refreshToken) VALUES ($1, $2) RETURNING *", [
        userId,
        refreshToken,
      ]);
    }
  }
  async removeToken(refreshToken: string) {
    await client.query("DELETE FROM tokens WHERE refreshtoken=$1", [refreshToken]);
  }
  validateAccessToken(accessToken: string) {
    try {
      return verify(accessToken, process.env.JWT_ACCESS_KEY!);
    } catch {
      return null;
    }
  }
  validateRefreshToken(refreshToken: string) {
    try {
      return verify(refreshToken, process.env.JWT_REFRESH_KEY!);
    } catch {
      return null;
    }
  }
  async findRefreshToken(refreshToken: string) {
    return (
      await client.query("SELECT * FROM tokens WHERE refreshToken=$1", [refreshToken])
    ).rows.at(0) as UserType;
  }
}

export default new TokenService();

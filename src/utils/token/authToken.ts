import jwt from "jsonwebtoken";
import { accessTokenSecret, refreshTokenSecret } from "../../config/env";

export interface Payload {
  _id: string;
}

class authToken {
  generateTokens(payload: Payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1m",
    });

    return { accessToken, refreshToken };
  }
  async verifyAccessToken(token: string) {
    return jwt.verify(token, accessTokenSecret);
  }
}

export default new authToken();

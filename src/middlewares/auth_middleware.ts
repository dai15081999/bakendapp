import authToken from "../utils/token/authToken";
import { RequestHandler } from "express";
import UserSchema from "../schemas/UserSchema";
import createError from "http-errors";

export const auth_middleware: RequestHandler = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const userId = await authToken.verifyAccessToken(accessToken);

      if (!userId) {
        throw new Error();
      }
      req.userId = userId;
      next();
    } catch (error) {
      next(createError(401, "Invalid token"));
    }
  }
};

export const admin_middleware: RequestHandler = async (req, res, next) => {
  try {
    if (req.userId) {
      const user = await UserSchema.findById(req.userId);
      if (user?.isAdmin) {
        next();
      } else {
        throw new Error("Không phải admin");
      }
    } else {
      throw new Error("Token undefined");
    }
  } catch (error) {
    next(error);
  }
};

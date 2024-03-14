import { Response, NextFunction } from "express";
import SessionModel from "../utils/mongodb/schemas/Session";
import UserModel from "../utils/mongodb/schemas/User";
import Request from "../utils/types/RequestWithSessionAndUser";

const sessionCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionCookie = req.signedCookies.session;

    if (sessionCookie) {
      const session = await SessionModel.findById(sessionCookie).lean();

      if (session) {
        // Attach the session to the request object for further use
        req.session = session;

        const user = await UserModel.findOne({
          discordUserId: session.discordUserId,
        }).lean();

        if (user) {
          // Attach the user to the request object for further use
          req.user = user;
        }
      }
    }

    next();
  } catch (error) {
    console.log("sessionCheckMiddleware", error);
    next(error);
  }
};

export default sessionCheckMiddleware;

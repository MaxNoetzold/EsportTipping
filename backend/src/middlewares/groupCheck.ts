import { Response, NextFunction } from "express";
import Request from "../utils/types/RequestWithSessionAndUser";
import TippingGroupModel from "../utils/mongodb/schemas/TippingGroup";

/**
 * Checks if a user is in the group. This needs the userCheckMiddleware to be run first!
 * @param req
 * @param res
 * @param next
 */
export const groupCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error("User Middleware not run before groupCheckMiddleware");
    }

    const { discordUserId } = req.user;
    const { groupId } = req.params;
    const group = await TippingGroupModel.find({
      _id: groupId,
      $or: [
        { owner: discordUserId },
        {
          members: {
            $elemMatch: {
              userId: discordUserId,
            },
          },
        },
      ],
    }).lean();

    if (group) {
      next();
    } else {
      res.status(403).send({ message: "Not in group" });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Checks if a user is the owner of the group. This needs the userCheckMiddleware to be run first!
 * @param req
 * @param res
 * @param next
 */
export const groupOwnerCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error("User Middleware not run before groupCheckMiddleware");
    }

    const { discordUserId } = req.user;
    const { groupId } = req.params;
    const group = await TippingGroupModel.find({
      _id: groupId,
      owner: discordUserId,
    }).lean();

    if (group) {
      next();
    } else {
      res.status(403).send({ message: "Not owner of group" });
    }
  } catch (error) {
    next(error);
  }
};

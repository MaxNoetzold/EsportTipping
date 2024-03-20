import express, { NextFunction, Response } from "express";
import Request, {
  AuthedRequest,
} from "../utils/types/RequestWithSessionAndUser";
import userCheckMiddleware from "../middlewares/userCheck";
import getGroupsForUser from "../components/getGroupsForUser";
import TippingGroupModel from "../utils/mongodb/schemas/TippingGroup";
import {
  groupCheckMiddleware,
  groupOwnerCheckMiddleware,
} from "../middlewares/groupCheck";
import addMemberToGroup from "../components/addMemberToGroup";

const tippingGroupRouter = express.Router();

// get all groups where you are owner or member
tippingGroupRouter.get(
  "/",
  userCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { discordUserId } = (req as AuthedRequest).user;

      const groups = await getGroupsForUser(discordUserId);

      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  }
);

// create a new group
tippingGroupRouter.post(
  "/",
  userCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { discordUserId } = (req as AuthedRequest).user;
      const { name, league } = req.body;

      const newGroup = new TippingGroupModel({
        owner: discordUserId,
        members: [],
        league,
        name,
      });
      await newGroup.save();

      res.status(201).json(newGroup);
    } catch (error) {
      next(error);
    }
  }
);

// delete a group where you are the owner
tippingGroupRouter.delete(
  "/:groupId",
  userCheckMiddleware,
  groupOwnerCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { discordUserId } = (req as AuthedRequest).user;
      const { groupId } = req.params;

      await TippingGroupModel.deleteOne({
        _id: groupId,
        owner: discordUserId,
      }).exec();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

// get a specific group and all tips for all members
tippingGroupRouter.get(
  "/:groupId",
  userCheckMiddleware,
  groupCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // TODO
    res.status(501).json({ message: "Not implemented" });
  }
);

// add a member to a group
tippingGroupRouter.post(
  "/:groupId/members",
  userCheckMiddleware,
  groupOwnerCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const { groupId } = req.params;

      const updatedGroup = await addMemberToGroup(userId, groupId);

      res.status(201).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  }
);

// remove a member from a group
tippingGroupRouter.delete(
  "/:groupId/members/:userId",
  userCheckMiddleware,
  groupOwnerCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { groupId } = req.params;

      const updatedGroup = await TippingGroupModel.findOneAndUpdate(
        { _id: groupId },
        {
          $pull: {
            members: { userId },
          },
        },
        { new: true }
      ).lean();

      res.status(200).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  }
);

export default tippingGroupRouter;

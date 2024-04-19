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
import makeGroupUsersReadable from "../components/makeGroupUsersReadable";
import UserModel from "../utils/mongodb/schemas/User";
import getTipsOfUsers from "../components/getTipsOfUsers/getTipsOfUsers";
import getLatestSplitForLeague from "../components/getLatestSplitForTournament";

const tippingGroupRouter = express.Router();

// get all groups where you are owner or member
tippingGroupRouter.get(
  "/",
  userCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { discordUserId } = (req as AuthedRequest).user;

      const groups = await getGroupsForUser(discordUserId);

      const groupsWithOwnerName = await Promise.all(
        groups.map((group) => makeGroupUsersReadable(group))
      );

      res.status(200).json(groupsWithOwnerName);
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

// update a group where you are the owner
// The only updateable field right now is the name
tippingGroupRouter.put(
  "/:groupId",
  userCheckMiddleware,
  groupOwnerCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { discordUserId } = (req as AuthedRequest).user;
      const { groupId } = req.params;
      const { name } = req.body;

      const updatedGroup = await TippingGroupModel.findOneAndUpdate(
        { _id: groupId, owner: discordUserId },
        { name },
        { new: true }
      ).lean();

      res.status(200).json(updatedGroup);
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
    try {
      const { groupId } = req.params;

      const group = await TippingGroupModel.findById(groupId).lean();

      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      const groupWithReadableUsers = await makeGroupUsersReadable(group);
      const userIds = [group.owner, ...group.members.map((m) => m.userId)];

      // Todo make it a param in the future
      const latestSplit = await getLatestSplitForLeague(group.league);
      const tips = await getTipsOfUsers(userIds, latestSplit);

      res.status(200).json({ ...groupWithReadableUsers, tips });
    } catch (error) {
      next(error);
    }
  }
);

// add a member to a group
tippingGroupRouter.post(
  "/:groupId/members",
  userCheckMiddleware,
  groupOwnerCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.body;
      const { groupId } = req.params;

      const user = await UserModel.findOne({ globalName: username }).lean();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedGroup = await addMemberToGroup(groupId, user.discordUserId);

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

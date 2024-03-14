import { Request as ExpressRequest } from "express";
import mongoose from "mongoose";

interface Session {
  accessToken: string;
  refreshToken: string;
  discordExpiresAt: number;
  discordUserId: string;
  sessionExpiresAt: Date;
  _id: mongoose.Types.ObjectId;
}

interface User {
  discordUserId: string;
  username: string;
  globalName: string;
  avatar: string;
  _id: mongoose.Types.ObjectId;
}

interface Request extends ExpressRequest {
  session?: Session;
  user?: User;
}

export default Request;

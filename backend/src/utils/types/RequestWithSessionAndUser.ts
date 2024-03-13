import { Request as ExpressRequest } from "express";

interface Session {
  accessToken: string;
  refreshToken: string;
  discordExpiresAt: number;
  discordUserId: string;
  sessionExpiresAt: Date;
  _id: string;
}

interface User {
  discordUserId: string;
  username: string;
  globalName: string;
  avatar: string;
  _id: string;
}

interface Request extends ExpressRequest {
  session?: Session;
  user?: User;
}

export default Request;

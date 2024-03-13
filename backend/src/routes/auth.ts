import express, { NextFunction, Response } from "express";
import { request } from "undici";
import { nanoid } from "nanoid";
import SessionModel from "../utils/mongodb/schemas/Session";
import UserModel from "../utils/mongodb/schemas/User";
import Request from "../utils/types/RequestWithSessionAndUser";

const authRouter = express.Router();

authRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check environment variables
    if (!process.env.DISCORD_AUTH_REDIRECT) {
      throw new Error("DISCORD_AUTH_REDIRECT is not set");
    }
    if (!process.env.DISCORD_CLIENT_ID) {
      throw new Error("DISCORD_CLIENT_ID is not set");
    }

    // create a state (random string) to protect against CSRF attacks
    // good explanation: https://stateful.com/blog/oauth-state-parameters-nodejs
    const stateParam = nanoid(20);
    //store state parameter in cookie, set maxAge, and set signed to true
    res.cookie("stateParam", stateParam, {
      maxAge: 1000 * 60 * 5,
      signed: true,
      httpOnly: true,
    });

    // redirect the user to the OAuth2 server using the generated state
    // the user will be redirected back to the /callback route with the state and access tokens
    const redirectQueries = new URLSearchParams({
      state: stateParam,
      client_id: process.env.DISCORD_CLIENT_ID,
      response_type: "code",
      redirect_uri: process.env.DISCORD_AUTH_REDIRECT,
      scope: "identify",
    }).toString();
    res.redirect(`https://discord.com/oauth2/authorize?${redirectQueries}`);
  } catch (error) {
    next(error);
  }
});

authRouter.get(
  "/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, state } = req.query;

      //Extracting state parameter previously signed and stored in cookies
      const { stateParam } = req.signedCookies;

      //Comparing state parameters
      if (state !== stateParam) {
        // throwing unprocessable entity error
        res.status(422).send("Invalid OAuth2 State");
        return;
      }

      // check that all is set
      if (!code) {
        return res
          .status(400)
          .send({ message: "No discord authentication code provided" });
      }
      if (!process.env.DISCORD_AUTH_REDIRECT) {
        throw new Error("DISCORD_AUTH_REDIRECT is not set");
      }
      if (!process.env.DISCORD_CLIENT_ID) {
        throw new Error("DISCORD_CLIENT_ID is not set");
      }
      if (!process.env.DISCORD_SECRET) {
        throw new Error("DISCORD_SECRET is not set");
      }

      // get the access token and refresh token from the discord server
      const tokenResponseData = await request(
        "https://discord.com/api/oauth2/token",
        {
          method: "POST",
          body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env?.DISCORD_SECRET,
            grant_type: "authorization_code",
            redirect_uri: process.env.DISCORD_AUTH_REDIRECT,
            scope: "identify",
            code: typeof code === "string" ? code : JSON.stringify(code),
            state: typeof code === "string" ? code : JSON.stringify(code),
          }).toString(),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const oauthData = (await tokenResponseData.body.json()) as
        | OAuthData
        | undefined;

      if (!oauthData) {
        return res.status(400).send({ message: "Invalid token response" });
      }

      // get user data from discord
      const userResult = await request("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });
      const userData = (await userResult.body.json()) as
        | DiscordUser
        | undefined;

      if (!userData) {
        return res.status(400).send({ message: "Invalid user response" });
      }

      const sessionMaxAge = 7 * 24 * 60 * 60 * 1000; // One week

      // store session in database
      const newSession = new SessionModel({
        accessToken: oauthData.access_token,
        refreshToken: oauthData.refresh_token,
        discordExpiresAt: Date.now() + oauthData.expires_in * 1000,
        sessionExpiresAt: new Date(Date.now() + sessionMaxAge),
        discordUserId: userData.id,
      });
      await newSession.save();

      // upsert the user in the database
      await UserModel.updateOne(
        { discordUserId: userData.id },
        {
          discordUserId: userData.id,
          username: userData.username,
          globalName: userData.global_name,
          avatar: userData.avatar,
        },
        { upsert: true }
      ).exec();

      // add session cookie to the response
      res.cookie("session", newSession._id, {
        maxAge: sessionMaxAge,
        signed: true,
        httpOnly: true,
        // TODO: change to strict in production
        sameSite: "none",
        secure: true,
      });

      // redirect the user to the frontend
      res.redirect(`${process.env.FRONTEND_URL}`);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.get(
  "/@me",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      res.send(req.user);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.delete(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("logout");
      if (!req.session) {
        return res.status(400).send({ message: "No session found" });
      }

      await SessionModel.findByIdAndDelete(req.session._id).exec();

      // delete cookie by overwriting it with maxAge = 0
      res.cookie("session", null, {
        maxAge: 0,
        signed: true,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.send({ message: "Logged out" });
    } catch (error) {
      next(error);
    }
  }
);
export default authRouter;

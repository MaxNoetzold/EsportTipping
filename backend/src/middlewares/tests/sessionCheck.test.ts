import request from "supertest";
import express from "express";
import sessionCheckMiddleware from "../sessionCheck";
import SessionModel from "../../utils/mongodb/schemas/Session";
import UserModel from "../../utils/mongodb/schemas/User";

jest.mock("../../utils/mongodb/schemas/Session");
jest.mock("../../utils/mongodb/schemas/User");

describe("sessionCheckMiddleware", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use((req, res, next) => {
      req.signedCookies = { session: "testSession" };
      next();
    });
    app.use(sessionCheckMiddleware);
    app.get("/", (req, res) => res.status(200).send("Hello World"));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it("should attach session and user to request if session exists", async () => {
    (SessionModel.findById as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue({ discordUserId: "testUser" }),
    });
    (UserModel.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue({ name: "Test User" }),
    });

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(SessionModel.findById).toHaveBeenCalledWith("testSession");
    expect(UserModel.findOne).toHaveBeenCalledWith({
      discordUserId: "testUser",
    });
  });

  it("should not attach session and user to request if session does not exist", async () => {
    (SessionModel.findById as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(null),
    });
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(SessionModel.findById).toHaveBeenCalledWith("testSession");
    expect(UserModel.findOne).not.toHaveBeenCalled();
  });
});

import { ObjectId } from "mongodb";
import { MatchTip } from "./Tipps";

export type Member = {
  userId: string;
  userName?: string;
  role: string;
};

export type TippingGroup = {
  _id: string | ObjectId;
  owner: string;
  ownerName?: string;
  name: string;
  members: Member[];
};

export type DetailedTippingGroup = TippingGroup & {
  tips: {
    [userId: string]: MatchTip[];
  };
};

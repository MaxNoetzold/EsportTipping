import { ObjectId } from "mongodb";

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
  league: string;
};

export type DetailedTippingGroup = TippingGroup & {
  tips: {
    [userId: string]: {
      [gameId: string]: string;
    };
  };
};

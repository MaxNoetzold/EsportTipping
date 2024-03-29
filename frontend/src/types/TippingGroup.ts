import { MatchTip } from "./MatchTip";

export type Member = {
  userId: string;
  userName: string;
  role: string;
};

export type TippingGroup = {
  _id: string;
  owner: string;
  ownerName: string;
  name: string;
  members: Member[];
  league: string;
};

export type DetailedTippingGroup = TippingGroup & {
  tips: {
    [userId: string]: MatchTip[];
  };
};

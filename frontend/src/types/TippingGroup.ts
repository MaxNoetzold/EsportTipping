export type Member = {
  userId: string;
  role: string;
};

export type TippingGroup = {
  _id: string;
  owner: string;
  name: string;
  members: Member[];
  league: string;
};

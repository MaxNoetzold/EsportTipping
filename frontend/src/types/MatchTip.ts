export interface MatchTip {
  _id: string;
  matchId: string;
  discordUserId: string;
  tippedTeamCode: string;
  winningTeamCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

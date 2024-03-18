export interface MatchTip {
  matchId: string;
  discordUserId: string;
  tippedTeamCode: string;
  winningTeamCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

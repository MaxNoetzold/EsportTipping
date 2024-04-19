import { MatchTip } from "./MatchTip";
export interface ILeague {
  id: string;
  image: string;
  name: string;
  slug: string;
}

export interface ITeamResult {
  outcome: null | string;
  gameWins: number;
}

export interface ITeamRecord {
  wins: number;
  losses: number;
  ties: number;
}

export interface ITeam {
  name: string;
  code: string;
  image: string;
  result: ITeamResult;
  record: ITeamRecord;
  side: "red" | "blue";
}

export interface IStrategy {
  type: string;
  count: number;
}

export interface IMatch {
  flags: string[];
  teams: ITeam[];
  strategy: IStrategy;
}

export interface ITournament {
  id: string;
  slug: string;
}

export interface IGameEvent {
  blockName: string;
  matchId: string;
  league: ILeague;
  match: IMatch;
  startTime: Date;
  state: string;
  tournament: ITournament;
}

export interface IGameEventWithTip extends IGameEvent {
  tip?: MatchTip;
}

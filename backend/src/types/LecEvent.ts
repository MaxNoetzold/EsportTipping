export interface League {
  name: string;
  slug: string;
}

export interface TeamResult {
  outcome: null | string;
  gameWins: number;
}

export interface TeamRecord {
  wins: number;
  losses: number;
}

export interface Team {
  name: string;
  code: string;
  image: string;
  result: TeamResult;
  record: TeamRecord;
}

export interface Strategy {
  type: string;
  count: number;
}

export interface Match {
  id: string;
  flags: string[];
  teams: Team[];
  strategy: Strategy;
}

export interface GameEvent {
  startTime: string;
  state: string;
  type: string;
  blockName: string;
  league: League;
  match: Match;
}

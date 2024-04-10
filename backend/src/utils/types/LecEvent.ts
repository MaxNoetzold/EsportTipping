export interface League {
  id: string;
  image: string;
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
  ties: number;
}

export interface Team {
  name: string;
  code: string;
  image: string;
  result: null | TeamResult;
  record: null | TeamRecord;
  side: null | "red" | "blue";
}

export interface Strategy {
  type: string;
  count: number;
}

export interface Match {
  flags: string[];
  teams: Team[];
  strategy: Strategy;
}

export interface Tournament {
  id: string;
  slug: string;
}

export interface GameEvent {
  blockName: string;
  matchId: string;
  league: League;
  match: Match;
  startTime: Date;
  state: string;
  tournament: Tournament;
}

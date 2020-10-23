export interface FootballPlayer {
  Player: string;
  Team: string;
  // TODO: Pos could be a more strict type Enum, Union, etc. after getting
  // requirements for all possible positions
  Pos: string;
  Att: number;
  'Att/G': number;
  Yds: number;
  Avg: number;
  'Yds/G': number;
  TD: number;
  Lng: string;
  '1st': number;
  '1st%': number;
  '20+': number;
  '40+': number;
  FUM: number;
}

export type OrderDirection = 'asc' | 'desc';

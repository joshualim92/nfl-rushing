import { FootballPlayer, OrderDirection } from '../../entities';
import InputError from './input-error';

export { InputError };

export interface QueryParams {
  filter?: { field: string; value: string };
  orderBy?: string;
  orderDirection?: OrderDirection;
  page?: number;
  pageSize?: number;
}

export interface Response {
  count: number;
  data: FootballPlayer[];
  page: number;
  pageSize: number;
}

export interface PlayersProvider {
  getFootballPlayers: (params: QueryParams) => Promise<Response>;
}

export interface Dependencies {
  playersProvider: PlayersProvider;
}

export type Sortable = 'Yds' | 'Lng' | 'TD';

export const SORTABLES: Array<Sortable> = ['Yds', 'Lng', 'TD'];

export interface Request extends Partial<QueryParams> {
  orderBy?: Sortable;
  playerFilter?: string;
}

const validateReq = ({
  orderBy, orderDirection, page, pageSize,
}: Request) => {
  if (orderBy && !SORTABLES.includes(orderBy)) {
    throw new InputError('This column is not sortable');
  }

  if (orderDirection && orderDirection !== 'asc' && orderDirection !== 'desc') {
    throw new InputError('orderDirection is not valid');
  }

  if (typeof page === 'number' && page < 1) {
    throw new InputError('page needs to be greater than 0');
  }

  if (typeof pageSize === 'number' && (pageSize < 1 || pageSize > 500)) {
    throw new InputError('pageSize needs to be a value from 1 to 500');
  }
};

export type GetFootballPlayersUseCase = (req: Request) => Promise<Response>;

export default (deps: Dependencies): GetFootballPlayersUseCase => async (
  req: Request,
): Promise<Response> => {
  const { playersProvider } = deps;

  validateReq(req);

  return playersProvider.getFootballPlayers({
    orderBy: req.orderBy,
    orderDirection: req.orderDirection,
    page: req.page,
    pageSize: req.pageSize,
    filter: req.playerFilter
      ? { field: 'Player', value: req.playerFilter }
      : undefined,
  });
};

import { FootballPlayer, OrderDirection } from '../../entities';
import InputError from './input-error';

export { InputError };

export const DEFAULT_ORDER_BY = 'Yds';
export const DEFAULT_ORDER_DIRECTION = 'desc';
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;

export interface QueryParams {
  filter?: { field: string; value: string };
  orderBy: string;
  orderDirection: OrderDirection;
  page: number;
  pageSize: number;
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

export interface Request {
  orderBy?: Sortable;
  orderDirection?: OrderDirection;
  page?: number;
  pageSize?: number;
  playerFilter?: string;
}

const validateReq = ({
  orderBy = DEFAULT_ORDER_BY,
  orderDirection = DEFAULT_ORDER_DIRECTION,
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
}: Request) => {
  if (!SORTABLES.includes(orderBy)) {
    throw new InputError('This column is not sortable');
  }

  if (orderDirection !== 'asc' && orderDirection !== 'desc') {
    throw new InputError('orderDirection is not valid');
  }

  if (page < 1) {
    throw new InputError('page needs to be greater than 0');
  }

  if (pageSize < 1 || pageSize > 500) {
    throw new InputError('pageSize needs to be a value from 1 to 500');
  }

  if (pageSize < 1 || pageSize > 500) {
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
    orderBy: req.orderBy ?? DEFAULT_ORDER_BY,
    orderDirection: req.orderDirection ?? DEFAULT_ORDER_DIRECTION,
    page: req.page ?? DEFAULT_PAGE,
    pageSize: req.pageSize ?? DEFAULT_PAGE_SIZE,
    filter: req.playerFilter
      ? { field: 'Player', value: req.playerFilter }
      : undefined,
  });
};

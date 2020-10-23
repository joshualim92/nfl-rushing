import { OrderDirection } from '../../entities';
import getFootballPlayers, {
  Dependencies,
  InputError,
  PlayersProvider,
  Request,
  Response,
  Sortable,
} from '.';

const deps: Dependencies = {
  playersProvider: { getFootballPlayers: jest.fn() },
};

const sampleResponse: Response = {
  count: 2,
  data: [
    {
      Player: 'Joe Banyard',
      Team: 'JAX',
      Pos: 'RB',
      Att: 2,
      'Att/G': 2,
      Yds: 7,
      Avg: 3.5,
      'Yds/G': 7,
      TD: 0,
      Lng: '7',
      '1st': 0,
      '1st%': 0,
      '20+': 0,
      '40+': 0,
      FUM: 0,
    },
    {
      Player: 'Shaun Hill',
      Team: 'MIN',
      Pos: 'QB',
      Att: 5,
      'Att/G': 1.7,
      Yds: 5,
      Avg: 1,
      'Yds/G': 1.7,
      TD: 0,
      Lng: '9',
      '1st': 0,
      '1st%': 0,
      '20+': 0,
      '40+': 0,
      FUM: 0,
    },
  ],
  page: 1,
  pageSize: 20,
};

const baseReq: Request = {
  orderBy: 'Yds',
  orderDirection: 'desc',
  page: 1,
  pageSize: 20,
};

describe('Get Football Players', () => {
  it.each([
    ['orderBy is not sortable', { ...baseReq, orderBy: <Sortable>'foo' }],
    [
      'orderDirection is invalid',
      { ...baseReq, orderDirection: <OrderDirection>'foo' },
    ],
    ['page is less than 1', { ...baseReq, page: 0 }],
    ['pageSize is less than 1', { ...baseReq, pageSize: 0 }],
    ['pageSize is greater than 500', { ...baseReq, pageSize: 501 }],
  ])('should throw InputError if %s', async (_name, req) => {
    await expect(() => getFootballPlayers(deps)(req)).rejects.toThrow(
      InputError,
    );
  });

  it('should call getFootballPlayers with params passed in request', async () => {
    const playersProvider: PlayersProvider = {
      getFootballPlayers: jest.fn().mockResolvedValue(sampleResponse),
    };

    expect(
      await getFootballPlayers({ ...deps, playersProvider })({
        orderBy: 'Lng',
        orderDirection: 'asc',
        page: 2,
        pageSize: 50,
        playerFilter: 'foo',
      }),
    ).toEqual(sampleResponse);

    expect(playersProvider.getFootballPlayers).toHaveBeenCalledWith({
      orderBy: 'Lng',
      orderDirection: 'asc',
      page: 2,
      pageSize: 50,
      filter: { field: 'Player', value: 'foo' },
    });
  });
});

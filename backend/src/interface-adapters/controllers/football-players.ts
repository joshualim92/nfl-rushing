import { RequestHandler } from 'express';
import { Parser } from 'json2csv';
import { OrderDirection } from '../../business-rules/entities';
import {
  GetFootballPlayersUseCase,
  InputError,
  Request,
  Sortable,
} from '../../business-rules/usecases/get-football-players';

const getFootballPlayers = (
  usecase: GetFootballPlayersUseCase,
): RequestHandler => async (req, res) => {
  const request: Request = {
    orderBy:
      req.query.orderBy && typeof req.query.orderBy === 'string'
        ? <Sortable>req.query.orderBy
        : 'Yds',
    orderDirection:
      req.query.orderDirection && typeof req.query.orderDirection
        ? <OrderDirection>req.query.orderDirection
        : 'asc',
    page:
      req.query.page && typeof req.query.page === 'string'
        ? parseInt(req.query.page, 10)
        : 1,
    pageSize:
      req.query.pageSize && typeof req.query.pageSize === 'string'
        ? parseInt(req.query.pageSize, 10)
        : 25,
    playerFilter:
      req.query.playerFilter && typeof req.query.playerFilter === 'string'
        ? req.query.playerFilter
        : undefined,
  };

  try {
    const response = await usecase(request);
    res.send(response);
  } catch (e) {
    if (e instanceof InputError) {
      res.status(400).send({ message: e.message });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
};

const downloadFootballPlayers = (
  usecase: GetFootballPlayersUseCase,
): RequestHandler => async (req, res) => {
  const request: Request = {
    orderBy:
      req.query.orderBy && typeof req.query.orderBy === 'string'
        ? <Sortable>req.query.orderBy
        : 'Yds',
    orderDirection:
      req.query.orderDirection && typeof req.query.orderDirection
        ? <OrderDirection>req.query.orderDirection
        : 'asc',
    playerFilter:
      req.query.playerFilter && typeof req.query.playerFilter === 'string'
        ? req.query.playerFilter
        : undefined,
  };

  try {
    const { data } = await usecase(request);

    const fields = [
      'Player',
      'Team',
      'Pos',
      'Att',
      'Att/G',
      'Yds',
      'Avg',
      'Yds/G',
      'TD',
      'Lng',
      '1st',
      '1st%',
      '20+',
      '40+',
      'FUM',
    ];

    const json2csv = new Parser({ fields });

    const csv = json2csv.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('football-players.csv');

    res.send(csv);
  } catch (e) {
    if (e instanceof InputError) {
      res.status(400).send({ message: e.message });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
};

export default { downloadFootballPlayers, getFootballPlayers };

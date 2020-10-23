import { RequestHandler } from 'express';
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
        : undefined,
    orderDirection:
      req.query.orderDirection && typeof req.query.orderDirection
        ? <OrderDirection>req.query.orderDirection
        : undefined,
    page:
      req.query.page && typeof req.query.page === 'string'
        ? parseInt(req.query.page, 10)
        : undefined,
    pageSize:
      req.query.pageSize && typeof req.query.pageSize === 'string'
        ? parseInt(req.query.pageSize, 10)
        : undefined,
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

export default { getFootballPlayers };

import cors from 'cors';
import express from 'express';
import getFootballPlayers from './business-rules/usecases/get-football-players';
import footballPlayers from './interface-adapters/controllers/football-players';
import playersProvider from './interface-adapters/providers/players-provider';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

const getFootballPlayersUseCase = getFootballPlayers({ playersProvider });
app.get(
  '/football-players',
  footballPlayers.getFootballPlayers(getFootballPlayersUseCase),
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// TODO Other nice to haves such as 404, 500, server status, etc. //

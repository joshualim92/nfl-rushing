// @ts-ignore
import numberParsing from 'number-parsing';
import { FootballPlayer } from '../../../business-rules/entities';
import { PlayersProvider } from '../../../business-rules/usecases/get-football-players';
import db from './rushing.json';

const parser = (value: any) => numberParsing(value, { us: 1 });

const sorter = (orderBy?: string, orderDirection: 'asc' | 'desc' = 'desc') => {
  if (!orderBy) {
    return () => 0;
  }

  if (orderDirection === 'desc') {
    return (a: any, b: any) => {
      if (parser(a[orderBy]) > parser(b[orderBy])) {
        return -1;
      }

      if (parser(a[orderBy]) < parser(b[orderBy])) {
        return 1;
      }

      return 0;
    };
  }

  return (a: any, b: any) => {
    if (parser(a[orderBy]) < parser(b[orderBy])) {
      return -1;
    }

    if (parser(a[orderBy]) > parser(b[orderBy])) {
      return 1;
    }

    return 0;
  };
};

const filter = (fil?: { field: string; value: string }) => (row: any) => {
  if (!fil || !fil.field || !fil.value) {
    return true;
  }

  return row[fil.field]?.toLowerCase().includes(fil.value.toLowerCase());
};

const playersProvider: PlayersProvider = {
  getFootballPlayers: async ({
    filter: searchFilter,
    orderBy,
    orderDirection,
    page = 1,
    pageSize,
  }) => {
    const data = <Array<FootballPlayer>>(
      db.sort(sorter(orderBy, orderDirection)).filter(filter(searchFilter))
    );

    const startIndex = pageSize ? (page - 1) * pageSize : 0;

    return {
      count: data.length,
      data: pageSize ? data.slice(startIndex, startIndex + pageSize) : data,
      page,
      pageSize: pageSize || data.length,
    };
  },
};

export default playersProvider;

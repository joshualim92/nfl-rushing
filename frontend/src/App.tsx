import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React, { FC, useEffect, useState } from 'react';
import './App.css';

const App: FC = () => {
  const [response, setResponse] = useState<any>({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [playerFilter, setPlayerFilter] = useState('');
  const [orderBy, setOrderBy] = useState('Yds');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetch(
      `http://localhost:4000/football-players?page=${
        page + 1
      }&pageSize=${pageSize}&playerFilter=${playerFilter}&orderBy=${orderBy}&orderDirection=${orderDirection}`,
    )
      .then((res) => res.json())
      .then(setResponse);
  }, [page, pageSize, playerFilter, orderBy, orderDirection]);

  const handleSort = (field: string) => (): void => {
    const isAsc = orderBy === field && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  return (
    <main className="main-container">
      <h1 className="heading">NFL Rushing</h1>

      {/* TODO: Performance wise this isn't great. Some kind of debouncing would be better */}
      <Input
        id="filter"
        name="filter"
        onChange={(e): void => setPlayerFilter(e.target.value)}
        placeholder="Player Name Filter"
        type="text"
        value={playerFilter}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">Team</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Att/G</TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'Yds'}
                  direction={orderBy === 'Yds' ? orderDirection : 'asc'}
                  onClick={handleSort('Yds')}
                >
                  Yds
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Avg</TableCell>
              <TableCell align="right">Yds/G</TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'TD'}
                  direction={orderBy === 'TD' ? orderDirection : 'asc'}
                  onClick={handleSort('TD')}
                >
                  TD
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'Lng'}
                  direction={orderBy === 'Lng' ? orderDirection : 'asc'}
                  onClick={handleSort('Lng')}
                >
                  Lng
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">1st</TableCell>
              <TableCell align="right">1st%</TableCell>
              <TableCell align="right">20+</TableCell>
              <TableCell align="right">40+</TableCell>
              <TableCell align="right">FUM</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {response?.data?.map((row: any) => (
              <TableRow key={row.Player}>
                <TableCell component="th" scope="row">
                  {row.Player}
                </TableCell>
                <TableCell align="right">{row.Team}</TableCell>
                <TableCell align="right">{row.Pos}</TableCell>
                <TableCell align="right">{row['Att/G']}</TableCell>
                <TableCell align="right">{row.Yds}</TableCell>
                <TableCell align="right">{row.Avg}</TableCell>
                <TableCell align="right">{row['Yds/G']}</TableCell>
                <TableCell align="right">{row.TD}</TableCell>
                <TableCell align="right">{row.Lng}</TableCell>
                <TableCell align="right">{row['1st']}</TableCell>
                <TableCell align="right">{row['1st%']}</TableCell>
                <TableCell align="right">{row['20+']}</TableCell>
                <TableCell align="right">{row['40+']}</TableCell>
                <TableCell align="right">{row.FUM}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={response.count}
        onChangePage={(_, newPage): void => setPage(newPage)}
        onChangeRowsPerPage={(e): void => {
          setPageSize(parseInt(e.target.value, 10));
          setPage(0);
        }}
        page={page}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </main>
  );
};

export default App;

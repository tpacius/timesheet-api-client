import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHeader from './TableHeader';
import formatDollars from './utils/utils';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  cell: {
      color: "#4682B4"
  }
});

const useStyles2 = makeStyles({
    cell: {
        fontWeight: "bold",
    }
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const { projects } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHeader {...props}/>
        <TableBody>
          {projects.map((row, index) => (
            <TableRow key={index}>
              <TableCell className={classes.cell} align="justify">{row.project_name}</TableCell>
              <TableCell className={classes.cell} align="justify">{row.client_name}</TableCell>
              <TableCell className={classes.cell} align="justify">{(row.hours)}</TableCell>
              <TableCell align="justify">{row.billable ? `${row.hours} (100%)`: `0.00 (0%)`}</TableCell>
              <TableCell className={classes2.cell} align="justify">{formatDollars.format(row.billable_amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
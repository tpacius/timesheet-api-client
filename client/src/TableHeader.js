import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    cell: {
        outline: "1px solid light gray",
        backgroundColor: "#E8E8E8"
    }
});

const labels = [
    'Name',
    'Clients',
    'Hours',
    'Billable Hours',
    'Billable Amount',
];

const TableHeader = (props) => {
    const classes = useStyles();
    return (
    <TableHead>
        <TableRow>
        {labels.map((label) => {
            return (
                <TableCell className={classes.cell} align="justify" key={label}>{label}</TableCell>
                )
        })}
        </TableRow>
    </TableHead>
    );
}

export default TableHeader;
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import formatDollars from './utils/utils';
import { makeStyles } from '@material-ui/core';

const Header = (props) => {
    const { hoursTracked, billableAmount } = props;
    const useStyles = makeStyles({
        grid: {
          color: "grey"
        }
      });
    return (
        <div>
            <Grid className={useStyles().grid} container justify="space-between">
                <Typography variant="subtitle1" display="inline" align="left"> Hours Tracked</Typography>
                <Typography variant="subtitle1" display="inline" align="right">Billable Amount</Typography>
            </Grid>
            <Grid container justify="space-between">
                <Typography variant="h4" display="inline" align="left">{hoursTracked.toFixed(2)}</Typography>
                <Typography variant="h4" display="inline" align="right">{formatDollars.format(billableAmount)}</Typography>
            </Grid>
        </div>
    );
}

export default Header;
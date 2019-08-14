import React, { PureComponent } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import Server from '../../components/server';
import { IServer } from '../../interfaces/docker';

interface Props {
  getDockersFromDefinedServers(): void,
  classes: any,
  servers?: IServer[]
}


const styles = (theme: Theme) => createStyles({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 'auto',
  },
});

class Home extends PureComponent<Props> {

  componentDidMount() {
    this.props.getDockersFromDefinedServers();
  }

  render() {
    const { classes, servers } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            {servers && servers.map((server, index) => <Server key={`${server.name}${index}`} server={server} index={index} />)}
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <div>PLACE FOR THIS 2</div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
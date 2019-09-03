import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Server from '../../components/server';
import { IServer } from '../../interfaces/docker';
import useStyles from './styles';

interface Props {
  servers?: IServer[]
}

const Home: React.SFC<Props> = (props: Props) => {

  const classes = useStyles();
  const { servers } = props;
  const fixedHeightPaper = clsx(classes.wrapper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <div className={classes.wrapper}>
          {servers && servers.map((server, index) => <Server key={`${server.name}${index}`} server={server} index={index} />)}
        </div>
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

export default Home;
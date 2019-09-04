import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Server from '../../components/server';
import { IServer } from '../../interfaces/docker';
import useStyles from './styles';
import ServerBlock from '../../components/serverBlock';
import { List } from '@material-ui/core';

interface Props {
  servers?: IServer[]
}

const Home: React.SFC<Props> = (props: Props) => {

  const classes = useStyles();
  const { servers } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        {servers && servers.map((server, index) => <Server key={`${server.name}${index}`} server={server} index={index} />)}
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={classes.fixedHeight}>
          <List>
            {servers && servers.map((server, index) => <ServerBlock key={`${server.name}${index}`} server={server} />)}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Home;
import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from '../components/listItems';
import Header from './header';
import useStyles from './styles';
import Breadcrumbs from '../components/breadcrumbs';

interface IndexProps {
  children: JSX.Element[] | JSX.Element
}

const Index: React.SFC<IndexProps> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          Docker logger
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><ListItems /></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Breadcrumbs />
        <Container maxWidth="xl" className={classes.container}>
          {props.children}
        </Container>
      </main>
    </div>
  );
}

export default Index;
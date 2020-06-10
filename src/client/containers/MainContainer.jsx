import React from 'react';
import { Container, Typography, AppBar, Tabs, Tab, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavContainer from './NavContainer';
import FeedContainer from './FeedContainer';

// generate object to hold our custom stylings
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // header of entire app spans across the top
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(2),
  },
  header: {
    display: 'inline',
  },
  subHeader: {
    display: 'inline',
    marginLeft: theme.spacing(2),
    fontSize: 15
  },
  loginButton: {
    display: 'inline',
    marginLeft: '50%'
  }
}));



// holds our top header bar, as well as our side bar (drawer), will also hold our feed container
const MainContainer = (props) => {
  const classes = useStyles();
  // functions as css-reset
  return (
    <Container maxWidth="lg" className={classes.root}>
      {/* AppBar, where the title of website is, stays on top*/}
      <AppBar position="fixed" className={classes.appBar}>
        <Typography variant="h4" align="left" className={classes.header}>
          {'</DevShark>'}
          <Typography variant="inherit" className={classes.subHeader}>
          Developer Resource Aggregator
        </Typography>
        </Typography>

          <Button variant="contained" color="primary" className={classes.loginButton}>Login</Button>
      </AppBar>
      {/* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */}
      <div className={classes.offset}></div>
      <NavContainer />
      <FeedContainer />
    </Container>
  );
};

export default MainContainer; 

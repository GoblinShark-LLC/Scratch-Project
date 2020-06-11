import React from 'react';
import {NavLink} from 'react-router-dom';
import { Container, Typography, AppBar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UserLogin from './UserLogin'; 
import NavContainer from './NavContainer';
import FeedContainer from './FeedContainer';

// generate object to hold our custom stylings
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
  },
  // header of entire app spans across the top
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    marginRight: theme.spacing(1),
  },
  logoBox: {
    flexDirection: 'column',
  },
  header: {
    display: 'inline',
    width: "100%",
  },
  subHeader: {
    display: 'inline',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontSize: 15
  },
}));

// holds our top header bar, as well as our side bar (drawer), will also hold our feed container
const MainContainer = (props) => {
  const classes = useStyles();
  // functions as css-reset
  return (
    <Container maxWidth="lg" className={classes.root}>
      {/* AppBar, where the title of website is, stays on top*/}
      <AppBar position="fixed" className={classes.appBar}>
        <Box className={classes.logoBox}>
          <Typography variant="h4" align="left" className={classes.header}>
            {'</DevShark>'}
          </Typography>
          <Typography variant="inherit" className={classes.subHeader}>
              Developer Resource Aggregator
          </Typography>
        </Box>
        {/* <pre className={classes.spacer}></pre> */}
        <div>
        <NavLink to='/signin' style={{ textDecoration: 'none' }}>
          <Button className={classes.navButton} variant="outlined" color="secondary">
            Sign In
          </Button>
        </NavLink>
        <NavLink to='/signup' style={{ textDecoration: 'none' }}>
          <Button className={classes.navButton} variant="contained" color="secondary">
            Sign Up
          </Button>
        </NavLink> 
        </div>
      </AppBar>
      {/* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */}
      <div className={classes.offset}></div>
      <NavContainer />
      <FeedContainer />
    </Container>
  );
};

export default MainContainer; 

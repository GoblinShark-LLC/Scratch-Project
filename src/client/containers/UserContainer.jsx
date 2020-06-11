import React from 'react';
import { Container, Typography, AppBar, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, Redirect  } from 'react-router-dom';
import NavContainer from './NavContainer';
import FeedContainer from './FeedContainer';
import { signOut } from '../actions/actions';
import { useDispatch, useSelector } from "react-redux";

// generate object to hold our custom stylings
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // header of entire app spans across the top
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(2),
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    display: 'inline',
    width: "100%",
  },
  welcome: {
    display: 'inline',
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
  },
  feedContainer: {
    marginTop: theme.spacing(8),
    alignItems: 'center',
    width: '100%',
  },

  itemHeader: {
    marginTop: 15,
    marginBottom: 15,
  },
  subHeader: {
    display: 'inline',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontSize: 15
  },
  shiftDown: {
    marginTop: theme.spacing(10),
  },
  button1:{
    underline: 'none',
    display: 'inline',
    marginLeft: theme.spacing(7),
    align: 'inherit'|'right',
  },
}));

// holds our top header bar, as well as our side bar (drawer), will also hold our feed container
const UserContainer = () => {
  const props = useSelector(state => state)
  console.log('this is user props', props)
  const dispatch = useDispatch();
  const classes = useStyles();
  // functions as css-reset

  const handleOnClick = () => {
    dispatch(signOut(props.user));
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      {/* AppBar, where the title of website is, stays on top*/}
      <AppBar position="fixed" className={classes.appBar}>
        <div>
          <Typography variant="h4" align="left" className={classes.header}>
            {'</DevShark>'}
          </Typography>
          <Typography variant="inherit" className={classes.subHeader}>
            Developer Resource Aggregator
          </Typography>
        </div>
        <div>
          <Typography variant="h4" align="left" className={classes.header}></Typography>
          <Typography variant="h4" align="left" className={classes.welcome}>Welcome {props.user.user_name.toUpperCase()}</Typography>
          <Typography variant="h4" align="left" className={classes.header}>{props.user.icon}</Typography>
        </div>
        <div>
          <NavLink to="/" style={{ textDecoration: 'none', display: 'inline'}}>
            <Button 
            variant="contained" 
            color="secondary" 
            className={classes.button1}
            onClick={handleOnClick}
            >Sign out</Button>
          </NavLink>
        </div>
      </AppBar>
      {/* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */}
      <div className={classes.offset}></div>
      <div>
        <NavContainer />
      </div>
      <div className={classes.feedContainer}>
        <FeedContainer/>
      </div>
    </Container>
  );
};

export default UserContainer; 

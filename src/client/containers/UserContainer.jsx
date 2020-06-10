import React from 'react';
import { Container, Typography, AppBar, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import NavContainer from './NavContainer';

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
  },
  header: {
    display: 'inline',
    width: "100%",
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
const UserContainer = (props) => {
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
          <NavLink to="/" style={{ textDecoration: 'none', display: 'inline'}}>
            <Button variant="contained" color="primary" className={classes.button1}>Sign out</Button>
          </NavLink>
        </Typography>
      </AppBar>
      {/* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */}
      <div className={classes.offset}></div>
      <NavContainer />
    <div className={classes.shiftDown}>
      <div>
      <Box className={classes.itemHeader}>
        <Typography variant="h4" component="h4" align="center">
          {'What would you like to research?'}
        </Typography>
      </Box>
      </div>
    </div>
    </Container>
  );
};

export default UserContainer; 

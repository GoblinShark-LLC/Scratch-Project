import React from 'react';
import { Container, Typography, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavContainer from './NavContainer';
import FeedContainer from './FeedContainer';

// until we connect to redux/back end
const dummyState = {
  topics: [
    'Javascript',
    'React',
    'Redux',
    'Angular',
    'Vue',
    'MongoDB',
    'Jest',
    'Enzyme',
    'Puppeteer',
    'Typescript',
    'Node',
    'Express',
  ],
};

// generate object to hold our custom stylings
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // header of entire app spans across the top
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(2),
  },
  offset: theme.mixins.toolbar,
}));

// holds our top header bar, as well as our side bar (drawer), will also hold our feed container
const MainContainer = (props) => {
  const classes = useStyles();
  // functions as css-reset
  return (
    <Container maxWidth="lg" className={classes.root}>
      {/* AppBar, where the title of website is, stays on top*/}
      <AppBar position="fixed" className={classes.appBar}>
        <Typography variant="h4" align="left">
          Tails for TypeScript #neverforget
        </Typography>
      </AppBar>
      {/* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */}
      <div className={classes.offset}></div>
      <NavContainer topics={dummyState.topics} />
      <FeedContainer />
    </Container>
  );
};

export default MainContainer;

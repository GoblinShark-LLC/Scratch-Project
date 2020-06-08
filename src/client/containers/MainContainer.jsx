import React from 'react';
import { connect } from 'react-redux';
import { Container, Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavContainer from './NavContainer';
import FeedContainer from './FeedContainer';

const mapStateToProps = state => {
  topics: state.topics
}

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
  subHeader: {
    display: 'inline',
    marginLeft: theme.spacing(2)
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
        <Typography variant="h4" align="left">
          {'</DevShark>'}
          <Typography variant="h6" align="left" className={classes.subHeader}>
            Developer Resource Aggregator
          </Typography>
        </Typography>
      </AppBar>
      {/* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */}
      <div className={classes.offset}></div>
      <NavContainer topics={props.topics} />
      <FeedContainer />
    </Container>
  );
};

export default connect(mapStateToProps)(MainContainer);

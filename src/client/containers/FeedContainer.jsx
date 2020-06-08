import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import FeedForm from '../components/FeedForm';
import FeedHeader from '../components/FeedHeader';
import FeedItemContainer from './FeedItemContainer';

/*

Righthand portion of our app that displays the feed
of resources related to a certain topic

Form to submit new resource also attached here

*/

const useStyles = makeStyles((theme) => ({
  shiftDown: {
    marginTop: theme.spacing(10)
  }
}));


const FeedContainer = (props) =>{
  const classes = useStyles();

  return(
    <div className={classes.shiftDown}>
      <FeedHeader  />
      <FeedItemContainer />
      <FeedForm />
    </div>
  )
  
  
};

export default FeedContainer;
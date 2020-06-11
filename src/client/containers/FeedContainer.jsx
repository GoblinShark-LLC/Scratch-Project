import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 

import { makeStyles } from '@material-ui/core/styles';

import FeedForm from '../components/FeedForm';
import FeedHeader from '../components/FeedHeader';
import FeedItemContainer from './FeedItemContainer';

import * as actions from '../actions/actions';
/*

Righthand portion of our app that displays the feed
of resources related to a certain topic

Form to submit new resource also attached here

*/

const useStyles = makeStyles((theme) => ({
  shiftDown: {
    marginTop: theme.spacing(10),
  },
}));

// maps array of resources and current topic from store as props

const mapStateToProps = (state) => ({
  resources: state.resources,
  currentTopic: state.currentTopic,
  user: state.user,
});

// maps relevant dispatches to functions available as props for
// getting resources and upvoting / downvoting a particular resource

const mapDispatchToProps = (dispatch) => ({
  getResource: (tech_name) => {
    dispatch(actions.getResource(tech_name));
  },

  // upvote: (resource_id, resource_tech) => { 
  //   if(user === false){
  //     alert("Please sign in to vote")
  //   } else {
  //     dispatch(actions.upvote(resource_id, resource_tech));
  //   }
  // },
  // downvote: (resource_id, resource_tech) => {
  //   if(user === false){
  //     alert("Please sign in to vote")
  //   } else {
  //     dispatch(actions.downvote(resource_id, resource_tech));
  //   }
  // },

  likeFunc: (userId, resourceId, action) => {
    // updates store for fast UX
    // dispatch(actions.likeFunc(userId, resourceId, action));
    // updates database
    axios
      .put(`http://localhost:3000/resource/${action}/${resourceId}/${userId}`)
      .then(response => {
      })
  }
});

const FeedContainer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.shiftDown}>
      <FeedHeader currentTopic={props.currentTopic} />
      <FeedItemContainer
        addLike={props.addLike}
        addDislike={props.addDislike}
        subtractLike={props.subtractLike}
        subtractDislike={props.subtractDislike}
        resources={props.resources}
        upvote={props.upvote}
        downvote={props.downvote}
        likeFunc={props.likeFunc}
      />
      <FeedForm />
    </div>
  );
};

//makes state stored in redux store available to our mapping-to-props functions
export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);

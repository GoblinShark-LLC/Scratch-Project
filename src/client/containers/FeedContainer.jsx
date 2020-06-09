import React, { Component } from 'react';
import { connect } from 'react-redux';

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
});

// maps relevant dispatches to functions available as props for
// getting resources and upvoting / downvoting a particular resource

const mapDispatchToProps = (dispatch) => ({
  getResource: (tech_name) => {
    dispatch(actions.getResource(tech_name));
  },
  upvote: (resource_id, resource_tech) => {
    dispatch(actions.upvote(resource_id, resource_tech));
  },
  downvote: (resource_id, resource_tech) => {
    dispatch(actions.downvote(resource_id, resource_tech));
  },
});

const FeedContainer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.shiftDown}>
      <FeedHeader currentTopic={props.currentTopic} />
      <FeedItemContainer
        resources={props.resources}
        upvote={props.upvote}
        downvote={props.downvote}
      />
      <FeedForm />
    </div>
  );
};

//makes state stored in redux store available to our mapping-to-props functions
export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);

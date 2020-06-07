import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeedHeader from '../components/FeedHeader';
import FeedItemContainer from './FeedItemContainer';

/*

Righthand portion of our app that displays the feed
of resources related to a certain topic

*/


const FeedContainer = (props) => {

  return(
    <div>
      <FeedHeader />
      <FeedItemContainer />
    </div>
  )
};

export default FeedContainer;
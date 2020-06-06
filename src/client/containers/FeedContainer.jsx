import React, { Component } from 'react';
import { connect } from 'react-redux';


import FeedHeader from '../components/FeedHeader';
import FeedItemContainer from './FeedItemContainer';

const FeedContainer = (props) => {


  return(
    <div>
      <FeedHeader />
      <FeedItemContainer />
    </div>
  )
};

export default FeedContainer;
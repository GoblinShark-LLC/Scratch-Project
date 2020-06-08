import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeedItem from '../components/FeedItem';

/*

Renders a container showing all feed items related to a certain topic

*/

const FeedItemContainer = (props) => {
  const resources = props.resources;
  const items = resources.map((elem, index) => {
    return (
      <FeedItem
        name={elem.name}
        url={elem.url}
        description={elem.description}
        likes={elem.likes}
        id={elem._id}
        key={index}
        tech={elem.tech}
        upvote={props.upvote}
        downvote={props.downvote}
        liked={elem.liked}
      />
    );
  });
  return <div>{items}</div>;
};

export default FeedItemContainer;

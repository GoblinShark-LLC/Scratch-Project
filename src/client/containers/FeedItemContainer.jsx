import React, { Component } from 'react';
import { connect } from 'react-redux';

import FeedItem from '../components/FeedItem';

/*

Renders a container showing all feed items relate to a certain topic

*/
const FeedItemContainer = (props) => {

  const resources = [{
    title: 'Google Search',
    url: 'www.google.com',
    description: 'Test description text here, this resource is very handy.',
    tech: 'General',
    likes: 100,
    id: 1234,
    liked: false
  },
  {
    title: 'React Docs',
    url: 'www.google.com',
    description: 'The official documentation from the React team is one of the best',
    tech: 'React',
    likes: 124,
    id: 1567,
    liked: true
  }];
  const items = resources.map( (elem, index) => {
    return <FeedItem
            title={elem.title}
            url={elem.url}
            description={elem.description}
            category={elem.tech}
            likes={elem.likes}
            id={elem.id}
            key={index} />;
  })
  return(
    <div>
      {items}
    </div>
  )
};

export default FeedItemContainer;
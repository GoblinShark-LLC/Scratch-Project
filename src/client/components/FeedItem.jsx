import React, { useState } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Comments from '../containers/Comments';
import axios from 'axios'; 

import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

import * as actions from '../actions/actions'; 

const useStyles = makeStyles({
  itemWrap: {
    background: '#fdfdfd',
    marginBottom: 15,
    minWidth: 350,
  },
  itemActions: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  itemDiv: {
    marginTop: 8,
    marginBottom: 8,
  },
});

// GET COMMENTS, this will make a GET request in actions folder, which will then populate the store with comment info
// that info will flow down into each comment component 
const mapDispatchToProps = dispatch => ({
  getComments: (resourceId) => dispatch(actions.getComments(resourceId))
});

const mapStateToProps = state => ({
  comments: state.comments
})

const FeedItem = (props) => {
  const classes = useStyles();

  // toggles the heart icon and calls action to increment/decrement 'likes' accordingly
  // props.liked, props.tech, and props.id passed down from DB to parent component to FeedItem
  const toggleHeart = () => {
    if (props.liked) {
      props.downvote(props.id, props.tech);
    } else {
      props.upvote(props.id, props.tech);
    }
  };
  return (
    <Card className={classes.itemWrap}>
      <CardContent>
        <Box>
        {/* displays resource title */}
          <Typography variant="h6">{props.name}</Typography>
        </Box>
        {/* displays resource description */}
        <Typography variant="body1">{props.description}</Typography>

        {/* COMMENTS BUTTON, THIS WILL GET COMMENTS */}

        <Button onClick={() => props.getComments(props.id)}>GET COMMENTS</Button>
        <Comments comments={props.comments} />

        <Divider className={classes.itemDiv} />
        <div className={classes.itemActions}>
        {/* displays resource link */}
          <Button size="small" color="primary">
            <a href={props.url} target="_blank">
              Visit Resource
            </a>
          </Button>
          {/* toggles heart */}
          <Button onClick={props.liked === true ? () => props.likeFunc(2, props.id, 'subtractLike') : () => props.likeFunc(2, props.id, 'addLike')}>
            {props.liked === true ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </Button>
          {/* shows number of likes for that resource */}
            {props.likes}
          <Button onClick={props.liked === false ? () => props.likeFunc(2, props.id, 'subtractDislike') : () => props.likeFunc(2, props.id, 'addDislike')}>
            {props.liked === false ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);

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

import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

import * as actions from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const useStyles = makeStyles({
  itemWrap: {
    background: '#fdfdfd',
    marginBottom: 15,
    minWidth: 640,
  },
  itemActions: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  itemDiv: {
    marginTop: 8,
    marginBottom: 8,
  },
  embed: {
    width: 300,
    height: 100,
  },
});

// GET COMMENTS, this will make a GET request in actions folder, which will then populate the store with comment info
// that info will flow down into each comment component
const mapDispatchToProps = (dispatch) => ({
  getComments: (resourceId) => dispatch(actions.getComments(resourceId)),
  upvote: (resourceId, liked) => dispatch(actions.upvote(resourceId, liked)),
  downvote: (resourceId, liked) =>
    dispatch(actions.downvote(resourceId, liked)),
});

const mapStateToProps = (state) => ({
  comments: state.comments,
  user: state.user,
});

const FeedItem = (props) => {
  console.log(props.name, 'is liked? this is props.liked ', props.liked);
  // const {user, comments, likes, resources, feed, currentTopic, topics } = useSelector(state => state)
  // const likedCopy = props.liked;
  // const totalsCopy = props.likes;

  // const [liked, setLiked] = useState(likedCopy)
  // console.log('liked from useState is :', liked);
  // const [disLiked, setDisLiked] = useState(likedCopy)
  // const [total, setTotal] = useState(totalsCopy)

  // keep track of whether comments have been requested or not, initialized as FALSE
  const [commentsVisible, toggleCommentsVisible] = useState(false);

  const classes = useStyles();
  // toggles the heart icon and calls action to increment/decrement 'likes' accordingly
  // props.liked, props.tech, and props.id passed down from DB to parent component to FeedItem
  const handleOnClickThumbUpIcon = () => {
    console.log('user._id is :', props.user._id);
    if (props.liked === null) {
      props.upvote(props.id, true);
      // setLiked(true)
      // setTotal(JSON.parse(total)+1)
      likeFunc(props.user._id, props.id, 'addLike');
    } else if (props.liked === true) {
      props.downvote(props.id, null);
      // setLiked(null)
      // setTotal(JSON.parse(total)-1)
      props.likeFunc(props.user._id, props.id, 'subtractLike');
    } else if (props.liked === false) {
      alert('please change your orginal vote first');
    }
  };

  const handleOnClickThumbDownIcon = () => {
    if (props.liked === null) {
      props.downvote(props.id, false);
      // setLiked(false)
      // setTotal(JSON.parse(total)-1)
      likeFunc(props.user._id, props.id, 'subtractDislike');
    } else if (props.liked === false) {
      props.upvote(props.id, null);
      // setLiked(null)
      // setTotal(JSON.parse(total)+1)
      likeFunc(props.user._id, props.id, 'addLike');
    } else if (props.liked === true) {
      alert('please change your orginal vote first');
    }
  };

  let displayVideo;
  switch (props.url.includes('youtube.com/')) {
    case true:
      displayVideo = (
        <div>
          <iframe
            width="640"
            height="360"
            src={props.url}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      );
      break;
    default:
      displayVideo = <div></div>;
  }
  const handleCommentsClick = () => {
    console.log('in the handle comments function ');
    props.getComments(props.id);
    toggleCommentsVisible(!commentsVisible);
  };

  let displayLikes;
  switch (props.user) {
    case false:
      displayLikes = (
        <div>
          <Button
            onClick={() => {
              alert(' To vote, please login.');
            }}
          >
            <ThumbUpOutlinedIcon color="disabled" />
          </Button>
          {props.likes}
          <Button
            onClick={() => {
              alert(' To vote, please login.');
            }}
          >
            <ThumbDownOutlinedIcon color="disabled" />
          </Button>
        </div>
      );
      break;
    default:
      displayLikes = (
        <div>
          <Button onClick={handleOnClickThumbUpIcon}>
            {props.liked === true ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </Button>
          {props.likes}
          <Button onClick={handleOnClickThumbDownIcon}>
            {props.liked === false ? (
              <ThumbDownIcon />
            ) : (
              <ThumbDownOutlinedIcon />
            )}
          </Button>
        </div>
      );
  }

  // This function makes an AJAX call to update the likes for a particular resource and user so the information being currently rendered in local state persists on page reload
  const likeFunc = (userId, resourceId, action) => {
    axios
      .put(`http://localhost:3000/resource/${action}/${resourceId}/${userId}`)
      .then(console.log('successfully did like func!'));
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
        <Button onClick={handleCommentsClick}>
          {commentsVisible ? 'HIDE COMMENTS' : 'GET COMMENTS'}
        </Button>
        {/* visibility of comments dependent on whether user has made get request */}
        {commentsVisible ? (
          props.comments[props.id] ? (
            <Comments
              fetching={false}
              comments={props.comments[props.id]}
              resourceId={props.id}
            />
          ) : (
            <Comments fetching={true} comments={null} resourceId={props.id} />
          )
        ) : (
          ''
        )}
        <Divider className={classes.itemDiv} />
        <div className={classes.itemActions}>
          {/* displays resource link */}
          <Button size="small" color="primary">
            <a href={props.url} target="_blank">
              Visit Resource
            </a>
          </Button>
          {displayLikes}
        </div>
      </CardContent>
      {displayVideo}
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);

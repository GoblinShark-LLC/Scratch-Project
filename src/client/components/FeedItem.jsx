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

import { useDispatch, useSelector } from "react-redux";

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

const FeedItem = (props) => {
  const {user, comments, likes, resources, feed, currentTopic, topics } = useSelector(state => state)
  const [liked, setLiked] = useState(props.liked)
  const [total, setTotal] = useState(props.likes)
  const classes = useStyles();
  console.log('props.name  ', props.name, 'props.liked ', props.liked)
  ;
  // toggles the heart icon and calls action to increment/decrement 'likes' accordingly
  // props.liked, props.tech, and props.id passed down from DB to parent component to FeedItem
  const handleOnClickThumbUpIcon = () => {
    if(liked === true){
      setLiked(false)
      setTotal(total-1)
      props.likeFunc(2, props.id, 'subtractLike')
    } else {
      setLiked(true)
      setTotal(total+1)
      props.likeFunc(2, props.id, 'addLike')
    }
  };

  const handleOnClickThumbDownIcon = () => {
    if (liked === false){
      setLiked(true)
      setTotal(total-1)
      props.likeFunc(2, props.id, 'subtractDislike')
    } else { 
      setLiked(false)
      setTotal(total+1)
      props.likeFunc(2, props.id, 'addDislike')
    }
  };

  let displayLikes;
    switch(user) {
      case false :
        displayLikes = (
          <div>
          <Button onClick = {() => {alert(' To vote, please login.')}}>
          <ThumbUpOutlinedIcon color="disabled"/>
          </Button>
          {props.likes}
          <Button onClick = {() =>{alert(' To vote, please login.')}}>
          <ThumbDownOutlinedIcon color="disabled"/>
          </Button>
        </div>
        )
        break;
      default:
        displayLikes = (
      <div>
        <Button onClick={handleOnClickThumbUpIcon}>
        {liked === true ?<ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
        </Button>
        {total}
        <Button onClick={handleOnClickThumbDownIcon}>
            {liked === false ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
        </Button>
      </div>
      )
    }

  return (
    <Card className={classes.itemWrap}>
      <CardContent>
        <Box>
        {/* displays resource title */}
          <Typography variant="h6">{props.name}</Typography>
        </Box>
        {/* displays resource description */}
        <Typography variant="body1">{props.description}</Typography>

        {/* <Comments /> */}

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
    </Card>
  );
};

export default FeedItem;

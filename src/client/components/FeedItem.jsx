import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';

const useStyles = makeStyles({
  itemWrap: {
    background: '#fdfdfd',
    marginBottom: 15
  },
  itemActions: {
    justifyContent: 'space-between',
    display: 'flex'
  },
  itemDiv: {
    marginTop: 8,
    marginBottom: 8
  }
})

const FeedItem = (props) => {
  const classes = useStyles();
  let liked = true;
 
  const toggleHeart = () => {
    if (liked) {
      liked = false;
      console.log(liked);
    } else {
      liked = true;
      console.log(liked);
    }
  }
  return (
    <Card className={classes.itemWrap}>
      <CardContent>
        <Box>
          <Typography variant="h6" component="h6">
            {props.title}
          </Typography>
        </Box>
        <Typography variant="body1">
          {props.description}
        </Typography>
        <Divider className={classes.itemDiv}/>
        <div className={classes.itemActions}>
          <Button size="small" color="primary">
            Visit Resource
          </Button>
          <Button size="small" onClick={() => toggleHeart()}>
            {props.likes} {liked ? 
                            <FavoriteRoundedIcon/> : <FavoriteBorderRoundedIcon/>}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
};

export default FeedItem;
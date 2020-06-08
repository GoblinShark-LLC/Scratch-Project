import React, { useState } from 'react';
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
  
  //dummy react hook to for 'like' state
  let [liked, setLiked] = useState(props.liked);

  const toggleHeart = () => {
    setLiked( liked? false: true);
  }
  return (
    <Card className={classes.itemWrap}>
      <CardContent>
        <Box>
          {/* displays resource title */}
          <Typography variant="h6">
            {props.title}
          </Typography>
        </Box>
        {/* displays resource description */}
        <Typography variant="body1">
          {props.description}
        </Typography>
        <Divider className={classes.itemDiv}/>
        <div className={classes.itemActions}>
          <Button size="small" color="primary">
            Visit Resource
          </Button>
          {/* toggles the likes for each resource */}
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
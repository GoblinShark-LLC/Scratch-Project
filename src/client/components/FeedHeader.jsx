import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

/*

Displays the currently selected topic of the feed

*/

const useStyles = makeStyles({
  itemHeader: {
    marginTop: 15,
    marginBottom: 15,
  },
});

const FeedHeader = (props) => {
  const classes = useStyles();
  const topic = props.currentTopic;
  return (
    <div>
      <Box className={classes.itemHeader}>
        <Typography variant="h4" component="h4" align="center">
          {topic} Resources
        </Typography>
      </Box>
    </div>
  );
};

export default FeedHeader;

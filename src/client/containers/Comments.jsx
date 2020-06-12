import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  commentWrap: {
    padding: 14,
    background: '#fdfdfd',
    minWidth: 640,
    minHeight: 300,
  },
});

const Comments = ({ comments, fetching, resourceId }) => {
  const classes = useStyles();
  let commentsList;

  const { user } = useSelector((state) => state);

  if (fetching) {
    // render loading message if currently fetching data
    commentsList = (
      <Typography variant="p">{'Loading comments. Relaaaaaaaax :)'}</Typography>
    );
  } else {
    // else map comments data onto each comment
    commentsList = comments.map((comment) => {
      return (
        <Comment
          id={comment._id}
          body={comment.body}
          icon={comment.icon}
          author={comment.user_name}
          edited={comment.edited}
          createdAt={comment.created_at}
          lastUpdated={comment.last_updated}
        />
      );
    });
  }
  return (
    <Container className={classes.commentWrap}>
      {/* if there are no comments, tell them that, else render the comments list */}
      <h1>Comments</h1>
      {commentsList.length === 0 ? (
        <Typography variant="p">
          {'Nobody has commented on this post. Be the first!'}
        </Typography>
      ) : (
        <React.Fragment>
          {/* only render the AddComment component if the user is logged in */}
          {user._id ? <AddComment resourceId={resourceId} /> : ''}
          {commentsList}
        </React.Fragment>
      )}
    </Container>
  );
};

export default Comments;

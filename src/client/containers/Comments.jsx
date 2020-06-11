import React from 'React'; 
import Container from '@material-ui/core/Container'; 
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button'; 
import Comment from '../components/Comment';

const Comments = ({ comments, fetching }) => {

  let commentsList; 

  if (fetching) {
    // render loading message if currently fetching data
    commentsList = (
      <Typography variant='p'>
        {'Loading comments. Relaaaaaaaax :)'}
      </Typography>
    );
  } else {
    // else map comments data onto each comment
    commentsList = comments.map(comment => {
      return (
        <Comment 
          id={comment._id} 
          body={comment.body} 
          avatar={comment.avatar} 
          author={comment.user_name} 
          edited={comment.edited} 
          createdAt = {comment.created_at} 
          lastUpdated = {comment.last_updated} />
      )
    })
  }
  return (
    <Container>
      {/* if there are no comments, tell them that, else render the comments list */}
      { commentsList.length === 0 
        ? ( 
            <Typography variant='p'>
              {'Nobody has commented on this post. Be the first!'}
            </Typography>
          )
        : commentsList }
    </Container>
  )
}

 export default Comments; 
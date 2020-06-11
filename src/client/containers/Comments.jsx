import React from 'React'; 
import Container from '@material-ui/core/Container'; 
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button'; 
import Comment from ''

const Comments = ({ comments }) => {
  // map comments data onto each comment
  const commentsList = comments.map(comment => {
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
  return (
    
  )
}

export default Comments; 
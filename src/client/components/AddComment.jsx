import React, { useState } from 'react';
import * as actions from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

// TO DELETE: Using react hooks alternative instead useSelector
// const mapDispatchToProps = (dispatch) => ({
//   addComment: (userId, resourceId, body) =>
//     dispatch(actions.addComment(userId, resourceId, body)),
// });

const useStyles = makeStyles((theme) => ({
  addCommentContainer: {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
    width: '100%',
  },
  inputForm: { width: '100%', 'padding-right': '10px' },
}));

function AddComment(resourceId) {
  const [input, setInput] = useState('');
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const postComment = () => {
    let comment = input;
    setInput('');

    //   Add the users's comment to the DB
    dispatch(
      actions.addComment(user._id, Number(resourceId.resourceId), comment)
    );
    // reset the input field to be empty
  };

  return (
    <div className={classes.addCommentContainer}>
      <TextField
        id="addComment"
        // helperText="Incorrect entry."
        value={input}
        variant="outlined"
        name="addComment"
        multiline
        onChange={(event) => setInput(event.target.value)}
        className={classes.inputForm}
      />
      <Button color="primary" variant="contained" onClick={postComment}>
        Post
      </Button>
    </div>
  );
}

export default AddComment;

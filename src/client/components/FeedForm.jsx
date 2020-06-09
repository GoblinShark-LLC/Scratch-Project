import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import * as actions from '../actions/actions';

/*
Form to submit a new resource
*/

// component styling
const useStyles = makeStyles((theme) => ({
  floatedAdd: {
    position: 'fixed',
    bottom: 50,
    right: 60,
  },
  floatedForm: {
    position: 'absolute',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    padding: theme.spacing(5),
    boxShadow: theme.shadows[5],
    outline: 0,
    width: 500,
    backgroundColor: theme.palette.background.paper,
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  },
  formControl: {
    minWidth: 175,
  },
}));

const mapStateToProps = (state) => ({
  techs: state.topics,
});

const mapDispatchToProps = (dispatch) => ({
  addResource: (resource_obj) => {
    dispatch(actions.addResource(resource_obj));
  },
});

const FeedForm = (props) => {
  const classes = useStyles();

  // gets list of topics to populate our form's select menu items
  const techs = props.techs;

  // setting initial form states
  // as well as default values for resource object
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [tech, setTech] = useState('');

  const liked = false;
  const likes = 0;

  const validateForm = () => {
    if (name === '' || description === '' || url === '' || tech === '') {
      // at least one field is empty, return false
      console.log('All form fields are required');
      return false;
    } else {
      // form is validated
      console.log('Form is validated!');
      return true;
    }
  };

  // clears form when successfully submitting form
  // and when exiting modal
  const clearForm = () => {
    setName('');
    setDesc('');
    setUrl('');
    setTech('');
  };

  // called to toggle form modal
  const toggleForm = () => {
    setOpen(open ? false : true);
  };

  // called when 'submit' button is clicked
  // first ensures form is valid by checking that no field is left blank
  // then calls the appropriate dispatch action passed down as a prop
  // to add new resource to database
  // (small delay added before closing modal to simulate a brief 'thinking' period)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let resourceObj = { name, description, url, tech, liked, likes };
      console.log('Sending the following resource to db:');
      console.log(resourceObj);
      props.addResource(resourceObj);
      setTimeout(() => {
        console.log('Resetting form and closing modal');
        clearForm();
        setOpen(false);
      }, 250);
    }
  };

  // generic change event listener handling change for
  // all input fields based on their name attribute
  const handleChange = (e) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
      case 'name':
        setName(inputVal);
        break;
      case 'desc':
        setDesc(inputVal);
        break;
      case 'url':
        setUrl(inputVal);
        break;
      case 'tech':
        setTech(inputVal);
        break;
    }
  };

  // defines the form that gets populated in our modal
  const formBody = (
    <div className={classes.paper}>
      <Typography variant="h5">Add a Resource</Typography>
      <TextField
        required
        fullWidth
        name="name"
        label="Title"
        variant="outlined"
        value={name}
        onChange={handleChange}
      />
      <TextField
        required
        name="desc"
        label="Description"
        multiline
        fullWidth
        rows={4}
        value={description}
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        required
        name="url"
        label="URL"
        fullWidth
        value={url}
        variant="outlined"
        onChange={handleChange}
      />
      <FormControl required variant="outlined" className={classes.formControl}>
        <InputLabel>Tech</InputLabel>
        <Select name="tech" value={tech} onChange={handleChange} label="Tech">
          {techs.map((elem, index) => {
            return (
              <MenuItem key={index} value={elem.toLowerCase()}>
                {elem}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <div className={classes.floatedAdd} onClick={toggleForm}>
        <Fab color="primary" aria-label="add" variant="extended">
          <AddIcon className={classes.extendedIcon} />
          ADD RESOURCE
        </Fab>
      </div>
      <div className={classes.floatedForm}>
        <Modal open={open} onClose={toggleForm}>
          {formBody}
        </Modal>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedForm);

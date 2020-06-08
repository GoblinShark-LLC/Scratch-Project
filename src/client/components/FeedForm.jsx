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
  MenuItem
} from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

/*
Form to submit a new resource
*/

// component styling
const useStyles = makeStyles((theme) => ({
  floatedAdd: {
    position: 'absolute',
    bottom: 50,
    right: 60
  },
  floatedForm: {
    position: 'absolute'
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
      margin: theme.spacing(1, 0)
    }
  },
  formControl: {
    minWidth: 175
  }
}));

export default function FeedForm() {

  const classes = useStyles();

  const topics = ['Javascript','React','Redux','Angular','Vue','MongoDB','Jest','Enzyme','Puppeteer','Typescript','Node','Express' ];

  // setting initial form states
  // as well as default values for resource object
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [topic, setTopic] = useState('');
  
  const liked = false;
  const likes = 0;

  const validateForm = () => {
    if (title === '' || description === '' || url === '' || topic === '') {
      // at least one field is empty, return false
      console.log('All form fields are required');
      return false;
    } else {
      // form is validated
      console.log('Form is validated!');
      return true;
    }
  }

  // clears form when successfully submitting form
  // and when exiting modal
  const clearForm = () => {
    setTitle('');
    setDesc('');
    setUrl('');
    setTopic('');
  }

  // called to toggle form modal
  const toggleForm = () => {
    setOpen( open? false: true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let resourceObj = { title, description, url, topic, liked, likes };
      console.log('Sending the following resource to db:');
      console.log(resourceObj);
      setTimeout(() => {
        console.log('Resetting form and closing modal');
        clearForm();
        setOpen(false);
      }, 250);
    }
  }

  // generic change event listener handling change for
  // all input fields based on their name attribute
  const handleChange = (e) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
      case "title":
        setTitle(inputVal);
        break;
      case "desc":
        setDesc(inputVal);
        break;
      case "url":
        setUrl(inputVal);
        break;
      case "tech":
        setTopic(inputVal);
        break;
    }
  }

  const formBody = (
    <div className={classes.paper}>
      <Typography variant="h5">
        Add a Resource
      </Typography>
      <TextField required fullWidth name="title" label="Title" variant="outlined" value={title} onChange={handleChange} />
      <TextField required name="desc" label="Description" multiline fullWidth rows={4} value={description} variant="outlined" onChange={handleChange} />
      <TextField required name="url" label="URL" fullWidth value={url} variant="outlined" onChange={handleChange} />
      <FormControl required variant="outlined" className={classes.formControl}>
        <InputLabel>Tech</InputLabel>
        <Select name="tech" value={topic} onChange={handleChange} label="Tech">
        { 
          topics.map( (elem, index) => {
            return <MenuItem key={index} value={elem.toLowerCase()}>{elem}</MenuItem>
          })
        }
        </Select>
      </FormControl>
      <div>
        <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </div>
    </div>
  )

  return (
    <div>
      <div className={classes.floatedAdd} onClick={toggleForm}>
        <Fab color="primary" aria-label="add" variant="extended">
          <AddIcon className={classes.extendedIcon}/>
          ADD RESOURCE
        </Fab>
      </div>
      <div className={classes.floatedForm}>
        <Modal open={open} onClose={toggleForm}>
          {formBody}
        </Modal>
      </div>
    </div>
  )
}

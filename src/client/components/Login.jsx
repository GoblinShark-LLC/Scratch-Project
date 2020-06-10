import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';

// Add styling rules here
const useStyles = makeStyles((theme) => ({}));

const Login = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setOpen(open ? false : true);
  };

  const handleChange = (e) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
      case 'user':
        setUsername(inputVal);
        break;
      case 'password':
        setPassword(inputVal);
        break;
    }
  };

  const handleSubmit = (e) => {
      console.log('click fired on handleSubmit')
      e.preventDefault();
      setOpen(false);
      return;
  }

  const loginBody = (
    <div>
      <TextField
        required
        name="user"
        label="Username"
        fullWidth
        value={username}
        variant="outlined"
        onChange={handleChange}
      />

      <TextField
        required
        name="password"
        label="Password"
        fullWidth
        value={password}
        variant="outlined"
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Log In</Button>
    </div>
  )

  return (
    <div>
      <div onClick={toggleForm}>
        <Fab color="primary" aria-label="add" variant="extended">
          {/* <AddIcon className={classes.extendedIcon} /> */}
          Login
        </Fab>
      </div>
      <div className={classes.floatedForm}>
        <Modal open={open} onClose={toggleForm}>
          {loginBody}
        </Modal>
      </div>
    </div>
  )
}

export default Login



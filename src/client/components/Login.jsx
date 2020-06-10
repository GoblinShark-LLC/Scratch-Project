import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
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

const Login = () => {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const toggleLogin = (e) => {
    if (loginOpen === false){
      setSignupOpen(false);
    }
    setLoginOpen(loginOpen ? false : true);
     clearForm();
  };

const toggleSignup = (e) => {
  if (signupOpen === false){
    setLoginOpen(false);
  }
    setSignupOpen(signupOpen ? false : true);

    clearForm();

}

  const handleChange = (e) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
      case 'loginUser':
        setLoginUsername(inputVal);
        break;
      case 'loginPassword':
        setLoginPassword(inputVal);
        break;
      case 'signupUser':
        setSignupUsername(inputVal);
        break;
      case 'signupPassword':
        setSignupPassword(inputVal);
        break;

    }
  };

  const clearForm = () => {
    // doing extra work, could be refactored later
    setLoginUsername('');
    setLoginPassword('');
    setSignupUsername('');
    setSignupPassword('');
  };

  const handleLogin = (e) => {
      console.log('click fired on handleLogin')
      e.preventDefault();
      setLoginOpen(false);
      clearForm();
      
      return;
  }

  const handleSignup = (e) => {
    console.log('click fired on handleSignup');
    e.preventDefault();
    setSignupOpen(false);
    console.log(signupUsername);
    console.log(signupPassword);
    clearForm();
    return;
  }

  const loginBody = (
    <div className={classes.paper}>
      <Typography variant="h5">User Login</Typography>
      <TextField
        required
        name="loginUser"
        label="Username"
        fullWidth
        value={loginUsername}
        variant="outlined"
        onChange={handleChange}
      />

      <TextField
        required
        name="loginPassword"
        label="Password"
        fullWidth
        value={loginPassword}
        variant="outlined"
        onChange={handleChange}
      />
      <Button onClick={handleLogin}>Complete Login</Button>
      <Button onClick={toggleSignup}>  New user? Click here to sign up </Button>
    </div>
  )

  const signupBody = (
    <div className={classes.paper}>
      <Typography variant="h5">SIGNUP PAGE</Typography>
      <TextField
        required
        name="signupUser"
        label="Username"
        fullWidth
        value={signupUsername}
        variant="outlined"
        onChange={handleChange}
      />

      <TextField
        required
        name="signupPassword"
        label="Password"
        fullWidth
        value={signupPassword}
        variant="outlined"
        onChange={handleChange}
      />
      <Button onClick={toggleLogin}>Go Back to Login Page</Button>
      <Button onClick={handleSignup}> Complete Signup </Button>
    </div>
  )

  return (
    <div>
      <div onClick={toggleLogin}>
        <Button variant="outlined">
          {/* <AddIcon className={classes.extendedIcon} /> */}
          Login
        </Button>
      </div>
      <div className={classes.floatedForm}>
        <Modal open={loginOpen} onClose={toggleLogin} >
          {loginBody}
        </Modal>
        <Modal open={signupOpen} onClose={toggleSignup} >
          {signupBody}
        </Modal>
      </div>
    </div>
  )
}

export default Login



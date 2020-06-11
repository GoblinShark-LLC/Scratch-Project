import React, { useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { signIn } from '../actions/actions';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Typography, AppBar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoBox: {
    flexDirection: 'column',
  },
  navButton: {
    marginRight: theme.spacing(1),
  },
  header: {
    display: 'inline',
  },
  subHeader: {
    display: 'inline',
    marginLeft: theme.spacing(2),
    fontSize: 15
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },  
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  greetingMessage: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [fields, setFields] = useState({
    username: '',
    password: '',
    token: 'null',
  });
  const classes = useStyles();
  const greetings = [
      "Happy Days.",
      "おかえり",
      "So Pumped to Have You Back.",
      "お久しぶりですね!"
    ];

  const handleChange = (e) => {
    const targetName = e.target.name;
    const value = e.target.value;
    setFields({
      ...fields,
      [targetName]: value
    })
  }

  const handleOnClick = () => {
    console.log('fields', fields)
      axios.post(`http://localhost:3000/resource/test/signin-auth`, fields)
      .then((response) => {
        console.log('response returned from signin', response)
        dispatch(signIn(response));
      }).then(() => setRedirect(true));
  }
  if (redirect) return <Redirect to="/user" />
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <div className={classes.logoBox}>
            <Typography variant="h4" align="left" className={classes.header}>
            {'</DevShark>'}
            </Typography>
            <Typography variant="inherit" className={classes.subHeader}>
                Developer Resource Aggregator
            </Typography>
        </div>
        {/* <pre className={classes.spacer}></pre> */}
        <div>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <Button className={classes.navButton} variant="outlined" color="secondary">
            Home
          </Button>
        </NavLink>
        <NavLink to='/signup' style={{ textDecoration: 'none' }}>
          <Button className={classes.navButton} variant="contained" color="secondary">
            Sign Up
          </Button>
        </NavLink> 
        </div>
      </AppBar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.greetingMessage}>
          {greetings[Math.floor(Math.random() * greetings.length)]}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={fields.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={fields.password}
            onChange={handleChange}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleOnClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/signup" variant="body2">
                Don't have an account? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
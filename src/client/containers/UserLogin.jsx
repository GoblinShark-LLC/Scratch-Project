import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Typography, AppBar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {NavLink} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  greetingMessage: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
//   spacer: {
//       width: "61%"
//   },
}));

export default function Login() {
  const classes = useStyles();
  const greetings = [
      "Happy Days.",
      "おかえり",
      "So Pumped to Have You Back.",
      "お久しぶりですね!"
    ];

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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
                console.info("I'm a button.");
              }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="./signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
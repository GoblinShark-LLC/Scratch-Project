// import { NavLink, Redirect } from 'react-router-dom';

// export default function UserLogin({ topic, getFunc }) {
//   // do that if you want to do some functionality before you be redirect to that page
//   // const [redirect, setRedirect] = useState(false);
//   // const fetch () => {
//   //   // is 200 redirect
//   //   setRedirect(true)
//   // }
//   // if (redirect) return <Redirect to="/" />
//   return (
//     // each button item will send pass its respective topic to the function sending a GET request
//     // do that if you want to go direct to that page
//     // maybe to="login" if not working try to="/login"
//     // <NavLink to="SignUp">
//     //   <button>Sign Up</button>
//     // </NavLink>
//   )
// }
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
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },  
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  subHeader: {
    display: 'inline',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontSize: 15
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  spacer: {
      width: "61%",
  },
}));

export default function Login() {
  const classes = useStyles();
  const greetings = [
      "Greetings, Traveller.", 
      "We've Waited a Lifetime for You.", 
      "おかえり", 
      "Ah Suuuuh Dud.", 
      "Well Come on in, Friend.",
      "お久しぶりですね!"
    ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Typography variant="h4" align="left" className={classes.header}>
          {'</DevShark>'}
        </Typography>
        <Typography variant="inherit" className={classes.subHeader}>
            Developer Resource Aggregator
        </Typography>
        <pre className={classes.spacer}></pre>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <Button className={classes.rightButton} variant="contained" color="primary">
            Back to Homepage
          </Button>
        </NavLink>
      </AppBar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
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
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
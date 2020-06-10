import React, { Component, useState } from 'react';
import { Container, Typography, AppBar, Button, TextField, Paper, withStyles, Grid, MenuItem} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// generate object to hold our custom stylings
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // header of entire app spans across the top
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(2),
  },
  header: {
    display: 'inline',
  },
  subHeader: {
    display: 'inline',
    marginLeft: theme.spacing(2),
    fontSize: 15
  },
  margin: {
    margin: theme.spacing.unit * 25,
  },
  padding: {
    padding: theme.spacing.unit 
  },
  button1:{
    underline: 'none',
    display: 'inline',
    marginLeft: theme.spacing(7),
  },
}));


// holds our top header bar, as well as our side bar (drawer), will also hold our feed container
const UserSignUp = (props) => {
  const classes = useStyles();
  // functions as css-reset
  const dispatch = useDispatch ()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const handleClick = () => {
  //   // dispatch(login({
  //   //   user_name: username,
  //   //   password: password,
  //   //   token: null,
  //   // }))
  //   // if (redirect) 
  //   return <Redirect to="/user" />
  // }
  return (
    <Container maxWidth="lg" className={classes.root}>
      {/* AppBar, where the title of website is, stays on top*/}
      <AppBar position="fixed" className={classes.appBar}>
        <Typography variant="h4" align="left" className={classes.header}>
          {'</DevShark>'}
          <Typography variant="inherit" className={classes.subHeader}>
            Developer Resource Aggregator
          </Typography>
        <NavLink to="/" style={{ textDecoration: 'none', display: 'inline'}}>
          <Button variant="contained" color="primary" className={classes.button1}>Back</Button>
          </NavLink>
        </Typography>
      </AppBar>
      {/* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */}
      <Paper className={classes.padding}>
        <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
        <Grid item md={true} sm={true} xs={true}>
        <TextField id="username" label="Username" type="text" fullWidth autoFocus required />
        </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
         <Grid item md={true} sm={true} xs={true}>
        <TextField id="password" label="Password" type="password" fullWidth required />
        </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
         <Grid item md={true} sm={true} xs={true}>
        <TextField id="email" label="Email" type="email" fullWidth required />
        </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
        <Grid item md={true} sm={true} xs={true}>
        <TextField id="select" label="icon" value="🤖" select>
        <MenuItem value="🤖">🤖</MenuItem>
        <MenuItem value="💻">💻</MenuItem>
        <MenuItem value="💽">💽</MenuItem>
        <MenuItem value="💾">💾</MenuItem>
        <MenuItem value="🎮">🎮</MenuItem>
        <MenuItem value="🕹️">🕹️</MenuItem>
        <MenuItem value="🖥️">🖥️</MenuItem>
        <MenuItem value="⌨">⌨</MenuItem>
        <MenuItem value="🖲️">🖲️</MenuItem>
        <MenuItem value="⚙️">⚙️</MenuItem>
        <MenuItem value="📟">📟</MenuItem>
        </TextField>
        </Grid>
        </Grid>
        <Grid container alignItems="center" justify="space-between">
        <Grid item>
        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
        </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
        {/* <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={(event) => handleClick(event)}>Login</Button> */}
        <NavLink to="/user" style={{ textDecoration: 'none', display: 'inline'}}>
          <Button variant="contained" color="primary" className={classes.button1}>Login</Button>
        </NavLink>
        </Grid>
        </div>
      </Paper>
    </Container>
  );
};

export default UserSignUp; 

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import { NavLink, Redirect } from 'react-router-dom';

export default function NavItem({ topic, getFunc }) {
  // do that if you want to do some functionality before you be redirect to that page
  // const [redirect, setRedirect] = useState(false);
  // const fetch () => {
  //   // is 200 redirect
  //   setRedirect(true)
  // }
  // if (redirect) return <Redirect to="/" />
  return (
    // each button item will send pass its respective topic to the function sending a GET request
    // do that if you want to go direct to that page
    // maybe to="login" if not working try to="/login"
    // <NavLink to="login">
    //   <button>Login</button>
    // </NavLink>
    <ListItem button onClick={(e) => getFunc(topic)}>
      <ListItemText primary={topic} />
    </ListItem>
  );
}

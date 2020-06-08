import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';

// const useStyles = makeStyles(theme) => ({
//   root: {
//     width:
//   }
// })

export default function NavItem({ topic, getFunc }) {
  return (
    // each button item will send pass its respective topic to the function sending a GET request
    <ListItem button onClick={(e) => getFunc(topic)}>
      <ListItemText primary={topic} />
    </ListItem>
  );
}

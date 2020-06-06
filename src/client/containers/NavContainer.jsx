import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import { Drawer, AppBar, Toolbar, List, Typography, ListItem, ListItemText } from '@material-ui/core'; 
import NavItem from '../components/NavItem';

// define width of sidebar
const drawerWidth = 240; 

// custom styles for the sidebar
const useStyles = makeStyles((theme) => ({
  // drawer stays at fixed width, no matter the size of the screen
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto'
  }
}));

// placeholder for actual get function
const getFunc = (e, topic) => {
  e.preventDefault(); 
  console.log(`GET request sent to ${topic}`)
}

export default function NavContainer ({ topics }) {
  const classes = useStyles(); 
  
  /* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */
  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper
      }}
      className={classes.drawer}
      variant="permanent">
    {/* NOT QUITE SURE WHAT THIS TOOLBAR DOES, NEED TO LOOK UP */}
      <Toolbar />
      <div className={classes.drawerContainer}>
        {/* map topics to new navbar items (rendered as a list) */}
        <List> 
          {topics.map(topic => {
            return <NavItem topic={topic} key={topic} getFunc={getFunc} />
          })}
        </List>
      </div>
    </Drawer>
  )
}


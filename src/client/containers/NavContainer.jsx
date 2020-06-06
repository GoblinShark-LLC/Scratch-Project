import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import { Drawer, AppBar, Toolbar, List, Typography, ListItem, ListItemText } from '@material-ui/core'; 
import NavItem from '../components/NavItem';

// define width of sidebar
const drawerWidth = 400; 

// custom styles for the sidebar
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // header of entire app spans across the top
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(1),
  },
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

// placeholder for actual get function
const getFunc = (e, topic) => {
  e.preventDefault(); 
  console.log(`GET request sent to ${topic}`)
}

export default function NavContainer ({ topics }) {
  console.log('topics passed down :', topics)
  const classes = useStyles(); 

  return (
    // root stylings apply to container here
    <div className={classes.root}>
      {/* AppBar, where the title of website is, stays on top*/}
      <AppBar position="fixed" className={classes.appBar}>
        <Typography variant='h4' align="left">
          Tails for TypeScript #neverforget
        </Typography>
      </AppBar>
      {/* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */}
      <Drawer
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
    </div>
  )
}


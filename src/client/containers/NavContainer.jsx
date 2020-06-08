import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import NavItem from '../components/NavItem';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
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
    overflow: 'auto',
  },
}));

// pass in topic list from store

const mapStateToProps = (state) => ({
  topics: state.topics,
  currentTopic: state.currentTopic,
});

// pass in function that will make GET request to relevant topic from our DB

const mapDispatchToProps = (dispatch) => ({
  getResources: (tech_name) => {
    dispatch(actions.getResource(tech_name));
    dispatch(actions.updateTopic(tech_name));
  },
});

// placeholder for actual get function
// const getFunc = (e, topic) => {
//   e.preventDefault();
//   console.log(`GET request sent to ${topic}`);
// };

function NavContainer(props) {
  const classes = useStyles();

  useEffect(() => {
    props.getResources(props.currentTopic);
  }, []);
  /* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */
  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      className={classes.drawer}
      variant="permanent"
    >
      {/* NOT QUITE SURE WHAT THIS TOOLBAR DOES, NEED TO LOOK UP */}
      <Toolbar />
      <div className={classes.drawerContainer}>
        {/* map topics to new navbar items (rendered as a list) */}
        <List>
          {props.topics.map((topic) => {
            return (
              <NavItem topic={topic} key={topic} getFunc={props.getResources} />
            );
          })}
        </List>
      </div>
    </Drawer>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);

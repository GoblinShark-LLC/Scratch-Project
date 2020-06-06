import React from 'react';
import { Container, Typography } from '@material-ui/core';
import NavContainer from './NavContainer'; 

const dummyState = {
  topics: ['Javascript','React','Redux','Angular','Vue','MongoDB','Jest','Enzyme','Puppeteer','Typescript','Node','Express' ]
}

const MainContainer = props => {
  // functions as css-reset
  return(
  <Container maxWidth='lg'>
    <NavContainer topics={dummyState.topics}/>
  </Container>
  )
};

export default MainContainer; 

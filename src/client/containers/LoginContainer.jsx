import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Login = () => {
  return (
    <div className="loginPage">
      <Link to="/main">
        <Button variant="contained">Click to Enter</Button>
      </Link>
    </div>
  );
};

export default withRouter(Login);

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import key from 'uniqid';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { modelRoutes } from '../../routes/Private';
import Header from '../layouts/Header';
import Menu from '../layouts/Menu';

const Home = props => {
  const { currentUser } = props;

  return (
    <div className="home_container d-flex flex-column flex-lg-row-reverse">
      <div className="d-flex flex-grow-1 flex-column">
        <div><Header /></div>
        <div className="fragments-content flex-grow-1">
          <Switch>
            {modelRoutes(props).map(prop => (
              <Route
                exact
                path={prop.path}
                key={key()}
                component={prop.component}
              />
            ))}
          </Switch>
        </div>
      </div>
      <div className="menu_bar"><Menu currentUser={currentUser} /></div>
    </div>
  );
};

const mapStateToProps = state => {
  const currentUser = cookie.load('ft-current-user');
  try {
    jwt.verify(currentUser.token, process.env.REACT_APP_TOKEN_SECRET);
    return { ...state, currentUser };
  } catch (error) {
    return { ...state, error };
  }
};

export default connect(mapStateToProps, {})(Home);

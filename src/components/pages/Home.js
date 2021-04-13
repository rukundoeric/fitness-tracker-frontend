import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import key from 'uniqid';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import { modelRoutes } from '../../routes/Private';
import Header from '../layouts/Header';
import Menu from '../layouts/Menu';

const Home = props => {
  const { currentUser, match: { path }, history: { goBack } } = props;

  return (
    <div className="home_container d-flex flex-column flex-lg-row-reverse">
      <div className="d-flex flex-grow-1 flex-column">
        <div><Header path={path} goBack={goBack} /></div>
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
      <div className="menu_bar">
        <Menu currentUser={currentUser} path={path} />
      </div>
    </div>
  );
};

Home.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
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

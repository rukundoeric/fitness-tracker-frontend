import React from 'react';
import { Switch, Route } from 'react-router-dom';
import key from 'uniqid';
import { modelRoutes, navigationRoutes } from '../../routes/Private';
import Header from '../layouts/Header';
import Menu from '../layouts/Menu';

export default function Home(props) {
  return (
    <div className="home_container">
      <div className="d-flex flex-column">
        <Header />
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
      <Menu navigationRoutes={navigationRoutes} />
    </div>
  );
}

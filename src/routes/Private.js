import React from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import Measurements from '../components/fragments/Measurements';
import MeasurementDetails from '../components/fragments/MeasurementDetails';
import NewMeasurement from '../components/fragments/NewMeasurement';
import Progress from '../components/fragments/Progress';
import Profile from '../components/fragments/Profile';
import More from '../components/fragments/More';
import Users from '../components/fragments/Users';

function redirectToLogin({ location: { pathname } }) {
  return <Redirect to={`/login?redirect=${pathname}`} />;
}

const Component = (props, component) => {
  if (props.currentUser) {
    return component;
  }
  return redirectToLogin;
};

class Routes {
  constructor(props) {
    this.routes = [
      {
        path: '/',
        name: 'Measuments',
        icon: 'ti-loop',
        component: Component(props, Measurements),
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/measurement-details',
        name: 'Measuments',
        icon: 'ti-loop',
        component: Component(props, MeasurementDetails),
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/new-measurement',
        name: 'Add',
        icon: 'icon-user',
        component: Component(props, NewMeasurement),
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/progress',
        name: 'Progress',
        icon: 'icon-settings',
        component: Component(props, Progress),
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/more',
        name: 'More',
        icon: 'icon-settings',
        component: Component(props, More),
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/profile',
        name: 'More',
        icon: 'icon-settings',
        component: Component(props, Profile),
        type: 'model',
        access: ['admin', 'user'],
      },
      {
        path: '/users',
        name: 'More',
        icon: 'icon-settings',
        component: Component(props, Users),
        type: 'model',
        access: ['admin'],
      },
      {
        path: '/things-to-measure',
        name: 'More',
        icon: 'icon-settings',
        component: Component(props, Users),
        type: 'model',
        access: ['admin'],
      },
    ];
  }

  filter(key, value, isArray) {
    if (isArray) {
      this.routes = this.routes.filter(object => object[key].includes(value));
    } else {
      const object = {};
      object[key] = `${value}`;
      this.routes = _.filter(this.routes, object);
    }
    return this;
  }

  get(args) {
    const currentList = this.routes;
    if (currentList.length === 0) {
      return -1;
    }
    if (args) {
      return currentList.map(item => _.pick(item, ...args));
    }
    return currentList;
  }
}

export const modelRoutes = props => {
  const { currentUser } = props;
  if (!currentUser) {
    return [];
  }
  const routes = new Routes(props)
    .filter('access', currentUser.role, true)
    .get();
  return routes;
};

export const navigationRoutes = props => {
  const { currentUser } = props;
  if (!currentUser) {
    return [];
  }
  const routes = new Routes(props)
    .filter('type', 'navigation')
    .filter('access', currentUser.role, true)
    .get();
  return routes;
};

import React from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import Measurements from '../components/fragments/Measurements';
import ThingsToMeasure from '../components/fragments/ThingsToMeasure';
import NewThingToMeasure from '../components/fragments/NewThingToMeasure';
import NewMeasurement from '../components/fragments/NewMeasurement';
import Progress from '../components/fragments/Progress';
import More from '../components/fragments/More';
import Help from '../components/fragments/Help';
import CreateMeasurement from '../components/fragments/CreateMeasurement';

const redirectToMeasurements = () => <Redirect to="/measurements" />;

class Routes {
  constructor() {
    this.routes = [
      {
        path: '/',
        name: 'Measuments',
        icon: 'ti-loop',
        Component: redirectToMeasurements,
        type: 'application',
        access: ['admin', 'moderator', 'user'],
      },
      {
        path: '/measurements',
        name: 'Measuments',
        icon: 'ti-loop',
        Component: Measurements,
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/new-measurement',
        name: 'Add measure',
        icon: 'ti-plus',
        Component: NewMeasurement,
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/new-measurement/:id',
        name: 'Add measure',
        icon: 'ti-plus',
        Component: CreateMeasurement,
        type: 'model',
        access: ['admin', 'user'],
      },
      {
        path: '/progress',
        name: 'Progress',
        icon: 'ti-pie-chart',
        Component: Progress,
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/more',
        name: 'More',
        icon: 'ti-more',
        Component: More,
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/things-to-measure',
        name: 'More',
        icon: 'icon-settings',
        Component: ThingsToMeasure,
        type: 'model',
        access: ['admin'],
      },
      {
        path: '/new-thing-to-measure',
        name: 'More',
        icon: 'icon-settings',
        Component: NewThingToMeasure,
        type: 'model',
        access: ['admin'],
      },
      {
        path: '/help',
        name: 'More',
        icon: 'ti-help',
        Component: Help,
        type: 'model',
        access: ['admin', 'user'],
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

export const modelRoutes = () => new Routes().get();

export const navigationRoutes = () => {
  const routes = new Routes()
    .filter('type', 'navigation')
    .get();
  return routes;
};

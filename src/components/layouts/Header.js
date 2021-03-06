/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const withAdd = ['/things-to-measure', '/measurements'];
const withBack = [
  '/things-to-measure',
  '/new-thing-to-measure',
  '/new-measurement/:id',
  '/help',
];

const toAdd = path => {
  switch (path) {
    case '/things-to-measure':
      return '/new-thing-to-measure';
    case '/measurements':
      return '/new-measurement';
    default:
      return '/';
  }
};

const Header = ({ path, goBack }) => (
  <header className="nav_bar d-flex justify-content-between justify-lg-content-start align-items-center px-4">
    {withBack.includes(path) ? (<button type="button" onClick={goBack} className="ti-angle-left" />) : (<div />)}
    <span data-testid="component-header" className="text-capitalize">{path.split('/')[1].split('-').join(' ')}</span>
    {withAdd.includes(path) ? (<Link to={toAdd(path)}><i className="ti-plus" /></Link>) : (<div />)}
  </header>
);

Header.propTypes = {
  path: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default Header;

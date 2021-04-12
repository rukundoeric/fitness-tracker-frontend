import React from 'react';
import key from 'uniqid';
import { navigationRoutes } from '../../routes/Private';
import NavItem from '../items/NavItem';

export default function Menu(props) {
  return (
    <nav className="row">
      {navigationRoutes(props).map(nav => (<NavItem nav={nav} key={key()} />))}
    </nav>
  );
}

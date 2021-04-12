import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NavItem({ nav: { icon, name, path: url }, path }) {
  return (
    <Link
      to={url}
      className={`${url === path ? 'active' : ''} nav-item col-3 col-lg-12 d-flex align-items-center justify-content-center rounded-lg-end`}
    >
      <div
        className="d-flex d-lg-block flex-column flex-lg-row align-items-center justify-content-center"
      >
        <i className={icon} />
        <small className="mt-1 ml-lg-3">{name}</small>
      </div>
    </Link>
  );
}

NavItem.propTypes = {
  nav: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
  path: PropTypes.string.isRequired,
};

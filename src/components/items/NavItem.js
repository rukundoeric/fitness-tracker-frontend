import React from 'react';
import PropTypes from 'prop-types';

export default function NavItem({ nav: { icon, name } }) {
  return (
    <div className="nav-item col-3 col-lg-12 d-flex align-items-center justify-content-center">
      <div className="d-flex d-lg-block flex-column flex-lg-row align-items-center justify-content-center">
        <i className={icon} />
        <small className="mt-1 ml-lg-3">{name}</small>
      </div>
    </div>
  );
}

NavItem.propTypes = {
  nav: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

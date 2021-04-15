import React from 'react';
import key from 'uniqid';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const More = ({
  currentUser: {
    role, name, email,
  },
}) => {
  const options = [
    {
      icon: 'ti-settings',
      title: 'Manage things to measure',
      access: ['admin'],
      path: '/things-to-measure',
    },
    {
      icon: 'ti-help',
      title: 'Help',
      access: ['user', 'admin'],
      path: '/help',
    },
    {
      icon: 'icon-logout',
      title: 'Logout',
      access: ['user', 'admin'],
      path: '/login',
    },
  ];
  const filterOptions = options.filter(object => object.access.includes(role));

  return (
    <div className="more-container">
      <div className="section-1 p-3 d-flex">
        <div className="profile-pic d-flex justify-content-center align-items-center">
          <i>{name.substring(0, 2).toUpperCase()}</i>
        </div>
        <div className="d-flex flex-column mx-2">
          <small data-testid="profile-name" className="name fw-bold mt-1">{name}</small>
          <small data-testid="profile-email" className="email">{email}</small>
        </div>
      </div>
      <div className="section-2 d-flex flex-column flex-grow-1">
        {
          filterOptions.map(({
            path, icon, title,
          }) => (
            <Link
              to={path}
              key={key()}
              className="option-item p-3"
            >
              <i className={icon} />
              <span className="mx-3">{title}</span>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

More.propTypes = {
  currentUser: PropTypes.shape({
    role: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string,
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

export default connect(mapStateToProps)(More);

/* eslint-disable no-unused-vars */
import React, {
  useEffect, useState, useRef,
} from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from '../commons/loader';
import { getThingToMeasure } from '../../redux/actions/ThingsToMeasure';
import { getMeasurements } from '../../redux/actions/Measurements';

const Measurements = ({
  measurements,
  currentUser,
  getMeasurements,
  history: { location: { pathname } },
}) => {
  if (!currentUser) {
    return (<Redirect to={`/login?redirect=${pathname}`} />);
  }
  // const dispach = useDispatch();
  // const [measurementsList, setMeasurementsList] = useState(initialState);

  useEffect(() => { getMeasurements(currentUser.token); }, []);
  // if (ttMeasure.status === 'pending') { return (<Loader />); }
  return (
    <div className="create-measurements d-flex flex-column">
      <h1>Measurements</h1>
    </div>
  );
};

Measurements.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  getMeasurements: PropTypes.func.isRequired,
  measurements: PropTypes.shape({
    mList: PropTypes.shape({
    }),
  }).isRequired,
  currentUser: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => {
  const currentUser = cookie.load('ft-current-user');
  try {
    jwt.verify(currentUser.token, process.env.REACT_APP_TOKEN_SECRET);
    return { ...state, currentUser };
  } catch (error) {
    return { ...state, currentUser: null };
  }
};

export default connect(
  mapStateToProps,
  {
    getMeasurements,
  },
)(Measurements);

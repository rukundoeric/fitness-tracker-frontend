import React, {
  useEffect, useState,
} from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import key from 'uniqid';
import Item from '../items/MeasurementRangeItem';
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

  const [measurementsList, setMeasurementsList] = useState({});

  useEffect(() => { getMeasurements(currentUser.token); }, []);
  useEffect(() => {
    setMeasurementsList(measurements.mList);
  }, [measurements.mList]);

  const mlKeys = measurementsList
    ? Object.keys(measurementsList)
      .sort((a, b) => new Date(b) - new Date(a))
    : [];

  return (
    <div className="measurement-list d-flex flex-column">
      {measurements.status === 'pending' && (
      <div>
        <div className="progress">
          <div className="indeterminate"> </div>
        </div>
      </div>
      )}
      <div className="range-list d-flex flex-column">
        {mlKeys.length > 0 && mlKeys.map(objKey => (
          <Item
            key={key()}
            title={objKey}
            measurementsList={measurementsList[objKey]}
          />
        ))}
      </div>
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
    status: PropTypes.string,
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

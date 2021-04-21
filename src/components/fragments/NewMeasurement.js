import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import key from 'uniqid';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getThingsToMeasure } from '../../redux/actions/ThingsToMeasure';
import Icon from '../commons/image';

const NewMeasurement = ({
  currentUser,
  thingsToMeasure,
  getThingsToMeasure,
}) => {
  if (!currentUser) {
    return (<Redirect to="/login?redirect=/things-to-measure" />);
  }

  const progressBar = useRef();
  const [ttmList, setTtmList] = useState([]);
  useEffect(() => {
    progressBar.current.classList.remove('hidden');
    getThingsToMeasure(currentUser.token);
  }, []);
  useEffect(() => {
    progressBar.current.classList.add('hidden');
    setTtmList(thingsToMeasure.ttmList);
  }, [thingsToMeasure.ttmList]);

  return (
    <div className="new-measurements px-3">
      <div ref={progressBar} className="hidden">
        <div className="progress">
          <div className="indeterminate"> </div>
        </div>
      </div>
      <div className="p-2 row">
        {ttmList ? ttmList.map(({
          id, icon, name, unit,
        }) => (
          <Link to={`new-measurement/${id}`} key={key()} className="ttm-item p-3 d-flex col-6 justify-content-center align-items-center">
            <div className="d-flex">
              <div className="d-flex">
                <Icon
                  src={icon}
                  defaultSrc="https://res.cloudinary.com/newpoint/image/upload/v1618405363/fitness-tracker/yoga_ra1tkf.png"
                />
              </div>
              <div className="d-flex flex-column">
                <span className="mx-3">{name}</span>
                <div className="d-flex mx-2 info">
                  <small className="mx-1 text-uppercase unit">Unit:</small>
                  <small className="text-uppercase">{unit}</small>
                </div>
              </div>
            </div>
          </Link>
        )) : (<div />)}
      </div>
    </div>
  );
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

NewMeasurement.propTypes = {
  currentUser: PropTypes.shape().isRequired,
  getThingsToMeasure: PropTypes.func.isRequired,
  thingsToMeasure: PropTypes.shape({
    ttmList: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  { getThingsToMeasure },
)(NewMeasurement);

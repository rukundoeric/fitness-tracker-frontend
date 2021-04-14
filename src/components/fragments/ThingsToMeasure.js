import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import key from 'uniqid';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getThingsToMeasure } from '../../redux/actions/ThingsToMeasure';
import Icon from '../commons/image';

const ThingsToMeasure = ({
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
    <div className="things-to-measure">
      <div ref={progressBar} className="hidden">
        <div className="progress">
          <div className="indeterminate"> </div>
        </div>
      </div>
      <div className="p-2 d-flex flex-column">
        {ttmList ? ttmList.map(({ icon, name, unit }) => (
          <div key={key()} className="ttm-item my-2 p-3 d-flex">
            <div className="flex-grow-1 d-flex align-items-center">
              <Icon
                src={icon}
                defaultSrc="https://res.cloudinary.com/newpoint/image/upload/v1618405363/fitness-tracker/yoga_ra1tkf.png"
              />
              <span className="mx-3">{name}</span>
            </div>
            <div className="d-flex align-items-center">
              <small className="mx-1 text-uppercase">Unit:</small>
              <small className="mx-2 text-uppercase">{unit}</small>
            </div>
          </div>
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

ThingsToMeasure.propTypes = {
  currentUser: PropTypes.shape().isRequired,
  getThingsToMeasure: PropTypes.func.isRequired,
  thingsToMeasure: PropTypes.shape({
    ttmList: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  { getThingsToMeasure },
)(ThingsToMeasure);

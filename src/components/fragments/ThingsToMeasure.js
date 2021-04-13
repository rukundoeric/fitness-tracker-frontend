/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import key from 'uniqid';
import { connect } from 'react-redux';
import { getThingsToMeasure } from '../../redux/actions/ThingsToMeasure';

const ThingsToMeasure = ({
  currentUser: { token },
  getThingsToMeasure,
  ttmList: tList,
}) => {
  const progressBar = useRef();
  const [ttmList, setTtmList] = useState([]);

  // useEffect(() => { console.log('hrllo there'); }, []);
  // useEffect(() => { getThingsToMeasure(token); }, []);
  // useEffect(() => { setTtmList(tList); }, [tList]);
  return (
    <div className="things-to-measure">
      <div ref={progressBar} className="hidden">
        <div className="progress">
          <div className="indeterminate"> </div>
        </div>
      </div>
      <div className="p-2 d-flex flex-column">
        <div className="ttm-item my-2 p-3 d-flex">
          <div className="flex-grow-1 d-flex align-items-center">
            <img src="https://res.cloudinary.com/newpoint/image/upload/v1618310973/fitness-tracker/speed_v2nyld.png" alt="icon" />
            <span className="mx-3">Speed</span>
          </div>
          <div className="d-flex align-items-center">
            <small className="mx-1 text-uppercase">Unit:</small>
            <small className="mx-2 text-uppercase">m/s</small>
          </div>
        </div>
      </div>
    </div>
  );
};

ThingsToMeasure.propTypes = {
  currentUser: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
  getThingsToMeasure: PropTypes.func.isRequired,
  ttmList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ thingsToMeasure: { ttmList } }) => {
  console.log(ttmList);
  const currentUser = cookie.load('ft-current-user');
  try {
    jwt.verify(currentUser.token, process.env.REACT_APP_TOKEN_SECRET);
    return { ttmList, currentUser };
  } catch (error) {
    return { ttmList, error };
  }
};

export default connect(mapStateToProps, {
  getThingsToMeasure,
})(ThingsToMeasure);

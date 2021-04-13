/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import key from 'uniqid';
import jwt from 'jsonwebtoken';
import Inputfield from '../commons/input';
import { createThingToMeasure, ttReset } from '../../redux/actions/ThingsToMeasure';

const NewThingToMeasure = ({
  createThingToMeasure,
  ttReset,
  currentUser: { token },
  thingsToMeasure: { ttResponce },
  history,
}) => {
  const progressBar = useRef();
  const handleSave = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const icon = data.get('icon');
    const name = data.get('name');
    const unit = data.get('unit');
    createThingToMeasure({ icon, name, unit }, token);
  };
  useEffect(() => {
    switch (ttResponce.status) {
      case 'success': {
        ttReset();
        history.push('/things-to-measure');
        break;
      }
      case 'pending': {
        progressBar.current.classList.remove('hidden');
        break;
      }
      case 'fail': {
        break;
      }
      default:
    }
  }, [ttResponce]);

  return (
    <div className="d-flex flex-column">
      <div ref={progressBar} className="hidden">
        <div className="progress">
          <div className="indeterminate"> </div>
        </div>
      </div>
      <div id="formContainer" className="goRight">
        <form
          id="login-form"
          className="form"
          onSubmit={handleSave}
        >
          <Inputfield
            label="Icon url"
            type="text"
            id="icon"
            placeholder="default"
            name="icon"
            appendIcon={<i className="ti-themify-favicon" />}
          />
          <Inputfield
            label="Name"
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            appendIcon={<i className="ti-text" />}
          />
          <Inputfield
            label="Unit"
            type="text"
            id="unit"
            placeholder="kg, m/s or number"
            name="unit"
            appendIcon={<i className="ti-text" />}
          />
          {ttResponce.data.error ? (
            <div className="error-container d-flex align-items-center mt-3">
              <span className="error" id="error">
                {Object.keys(ttResponce.data.error).map(objKey => (
                  <div key={key()} className="d-flex flex-column">
                    <span className="text-capitalize mr-2">
                      {objKey}
                      :
                    </span>
                    <div>
                      {
                      ttResponce.data.error[objKey].map(value => (
                        <small key={key()}>
                          {value}
                          ,
                        </small>
                      ))
                    }
                    </div>
                  </div>
                ))}
              </span>
            </div>
          ) : (
            <div />
          )}
          <div className="form-control btn_container mt-3">
            <input
              type="submit"
              className="btn btn-create"
              value="Create"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

NewThingToMeasure.propTypes = {
  currentUser: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
  createThingToMeasure: PropTypes.func.isRequired,
  ttReset: PropTypes.func.isRequired,
  thingsToMeasure: PropTypes.shape({
    ttResponce: PropTypes.shape({
      data: PropTypes.shape({
        error: PropTypes.shape({
          keys: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
      status: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
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

export default connect(
  mapStateToProps,
  {
    createThingToMeasure,
    ttReset,
  },
)(NewThingToMeasure);

import React, {
  useEffect, useState, useRef,
} from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../commons/loader';
import Inputfield from '../commons/input';
import { getThingToMeasure } from '../../redux/actions/ThingsToMeasure';
import { createMeasurement } from '../../redux/actions/Measurements';

const CreateMeasurement = ({
  thingsToMeasure: { ttMeasure },
  measurements: { cmResponse },
  getThingToMeasure,
  currentUser,
  match: { params: { id } },
  history: { location: { pathname }, push },
  createMeasurement,
}) => {
  if (!currentUser) {
    return (<Redirect to={`/login?redirect=${pathname}`} />);
  }

  const dispatch = useDispatch();
  const progressBar = useRef();
  const [thingToMeasure, setThingToMeasure] = useState({});

  useEffect(() => {
    getThingToMeasure(currentUser.token, id);
    dispatch({ type: 'C_M_RESET' });
  }, []);
  useEffect(() => { setThingToMeasure(ttMeasure); }, [ttMeasure]);
  useEffect(() => {
    switch (cmResponse.status) {
      case 'success':
        progressBar.current.classList.add('hidden');
        toast.success('Measurement recorded successfully');
        dispatch({ type: 'C_M_RESET' });
        push('/new-measurement');
        break;
      default:
    }
  }, [cmResponse.status]);

  const handleSave = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = data.get('value');
    createMeasurement({ value, things_to_measure_id: id }, currentUser.token);
    progressBar.current.classList.remove('hidden');
  };
  const { unit, name } = thingToMeasure;

  if (ttMeasure.status === 'pending') { return (<Loader />); }
  return (
    <div className="create-measurements d-flex flex-column">
      <div ref={progressBar} className="hidden">
        <div className="progress">
          <div className="indeterminate"> </div>
        </div>
      </div>
      <div className="div-1 d-flex justify-content-center align-items-center">
        <span className="text-h">
          Enter your
          <i className="mx-2 text-capitalize">{name}</i>
          measurement
        </span>
      </div>
      <div className="div-2 flex-grow-1">
        <div id="formContainer" className="goRight">
          <form
            id="login-form"
            className="form"
            onSubmit={handleSave}
          >
            <Inputfield
              type="text"
              id="value"
              placeholder={name}
              name="value"
              appendIcon={<i className="text-uppercase">{unit}</i>}
            />
            <div className="btn_container mt-3 d-flex justify-content-end">
              <input
                type="submit"
                className="btn btn-create"
                value="Save"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateMeasurement.propTypes = {
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
  thingsToMeasure: PropTypes.shape({
    ttMeasure: PropTypes.shape({
      status: PropTypes.string,
      name: PropTypes.string,
      unit: PropTypes.string,
    }),
  }).isRequired,
  measurements: PropTypes.shape({
    cmResponse: PropTypes.shape({
      status: PropTypes.string,
    }),
  }).isRequired,
  getThingToMeasure: PropTypes.func.isRequired,
  createMeasurement: PropTypes.func.isRequired,
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
    getThingToMeasure,
    createMeasurement,
  },
)(CreateMeasurement);

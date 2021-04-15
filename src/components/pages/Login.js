import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import QueryString from 'query-string';
import image from '../../assets/images/logo.jpg';
import Inputfield from '../commons/input';
import { logIn } from '../../redux/actions/Auth';

const Login = ({
  logIn, auth, location, history,
}) => {
  const progressBar = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const handleLogin = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');
    logIn({ email, password });
  };
  const handleLoginSuccess = user => {
    cookie.save('ft-current-user', user);
    const redirect = location.state ? location.state.redirect
      : QueryString.parse(location.search).redirect;
    history.push(redirect || '/');
  };

  useEffect(() => {
    cookie.remove('ft-current-user');
  }, []);
  useEffect(() => {
    switch (auth.status) {
      case 'success': {
        handleLoginSuccess(JSON.stringify(auth.data.user));
        break;
      }
      case 'pending': {
        progressBar.current.classList.remove('hidden');
        emailInput.current.classList.remove('errorresponse');
        passwordInput.current.classList.remove('errorresponse');
        break;
      }
      case 'fail': {
        progressBar.current.classList.add('hidden');
        emailInput.current.classList.add('errorresponse');
        passwordInput.current.classList.add('errorresponse');
        break;
      }
      default:
    }
  }, [auth]);

  return (
    <div className="row login-container ">
      <div className="container-fluid">
        <div className="valign-wrapper screenHeight d-flex align-items-center justify-content-center">
          <div className="col-md-8 card   setMaxWidth  inner-container ">
            <div ref={progressBar} className="hidden">
              <div className="progress">
                <div className="indeterminate"> </div>
              </div>
            </div>
            <div className="clearfix mar-all pad-all"> </div>
            <img src={image} className="logoImage" alt="App logo" />
            <div className="mar-all pad-all d-flex align-items-center justify-content-center">
              <h5 className="center-align mar-top mar-bottom">Sign In</h5>
            </div>
            <div id="formContainer" className="goRight">
              <form
                id="login-form"
                className="form"
                onSubmit={handleLogin}
              >
                <Inputfield
                  refValue={emailInput}
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="Email or Username"
                  name="email"
                  appendIcon={<i className="icon-user" />}
                />
                <Inputfield
                  refValue={passwordInput}
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  appendIcon={<i className="icon-lock" />}
                />
                {auth.data.error ? (
                  <div className="error-container d-flex align-items-center mt-3">
                    <span className="error" id="error">
                      {auth.data.error.message}
                    </span>
                  </div>
                ) : (
                  <div />
                )}
                <br />
                <small className="forget-password">
                  <span className="pr-3">Forgot password?</span>
                </small>
                <div className="form-control btn_container mt-3">
                  <input
                    type="submit"
                    className="btn btn-login"
                      // onClick={this.handleLogin}
                    value="Login"
                  />
                </div>
              </form>
            </div>
            <div className="clearfix mar-all pad-all"> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  auth: PropTypes.shape({
    data: PropTypes.shape({
      user: PropTypes.shape({}),
      error: PropTypes.shape({
        message: PropTypes.string,
      }),
    }),
    status: PropTypes.string.isRequired,
  }).isRequired,
  logIn: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      redirect: PropTypes.string,
    }),
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, { logIn })(Login);

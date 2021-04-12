import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import image from '../../assets/images/logo.jpg';
import Inputfield from '../commons/input';

const Login = props => {
  const { res } = props;
  return (
    <div className="row login-container ">
      <div className="container-fluid">
        <div className="valign-wrapper screenHeight d-flex align-items-center justify-content-center">
          <div className="col-md-8 card   setMaxWidth  inner-container ">
            <div id="progress-bar" className="hidden">
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
                onSubmit={e => console.log(e)}
              >
                <Inputfield
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="Email or Username"
                  name="email"
                  appendIcon={<i className="icon-user" />}
                />
                <Inputfield
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  appendIcon={<i className="icon-lock" />}
                />
                {/* {this.state.show_error ? (
                  <div className="error-container d-flex align-items-center">
                    <span className="error" id="error">
                      {this.props.loginResponse.data.message}
                    </span>
                    <span>
                      <i className="fas fa-times" />
                    </span>
                  </div>
                ) : (
                  <div />
                )} */}
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
  user: PropTypes.shape({ }).isRequired,
};

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
});

export default connect(mapStateToProps)(Login);

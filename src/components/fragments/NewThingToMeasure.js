import React from 'react';
import { connect } from 'react-redux';
import Inputfield from '../commons/input';

const NewThingToMeasure = () => (
  <div className="d-flex flex-column">
    <div id="formContainer" className="goRight">
      <form
        id="login-form"
        className="form"
      >
        <Inputfield
          label="Icon"
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
        {/* {auth.data.error ? (
            <div className="error-container d-flex align-items-center mt-3">
              <span className="error" id="error">
                {auth.data.error.message}
              </span>
            </div>
          ) : (
            <div />
          )} */}
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

export default connect()(NewThingToMeasure);

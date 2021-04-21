/* eslint-disable react/style-prop-object */
import 'hammerjs';
import '@progress/kendo-drawing';
import '@progress/kendo-react-intl';
import '@progress/kendo-licensing';
import * as React from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import key from 'uniqid';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
} from '@progress/kendo-react-charts';
import getProgressReport from '../../redux/actions/Progress';

const { useState, useEffect } = React;

const Progress = ({
  currentUser,
  progress,
  getProgressReport,
}) => {
  if (!currentUser) {
    return (<Redirect to="/login?redirect=/progress" />);
  }
  const [series, setSeries] = useState([]);
  useEffect(() => { getProgressReport(currentUser.token); }, []);
  useEffect(() => { setSeries(progress.sReport); }, [progress.sReport]);
  return (
    <div className="progress-container">
      {progress.status === 'pending' && (
      <div>
        <div className="progress">
          <div className="indeterminate"> </div>
        </div>
      </div>
      )}
      <div className="div-1 d-flex justify-content-center align-items-center">
        <span className="text-h">
          This is your progress report
        </span>
      </div>
      <div className="p-3">
        <Chart>
          <ChartLegend position="bottom" orientation="horizontal" />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={[]} startAngle={45} />
          </ChartCategoryAxis>
          <ChartSeries>
            {series.map(item => (
              <ChartSeriesItem
                key={key()}
                type="line"
                style="smooth"
                data={item.data}
                name={item.name}
              />
            ))}
          </ChartSeries>
        </Chart>
      </div>
    </div>
  );
};

Progress.propTypes = {
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
  getProgressReport: PropTypes.func.isRequired,
  progress: PropTypes.shape({
    status: PropTypes.string,
    pReport: PropTypes.shape({
    }),
    sReport: PropTypes.arrayOf(PropTypes.shape({})),
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
    getProgressReport,
  },
)(Progress);

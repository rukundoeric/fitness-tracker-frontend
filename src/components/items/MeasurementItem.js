import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar as MGraph, buildStyles } from 'react-circular-progressbar';
import { DateString } from '../../helpers/Date';

const MeasurementItem = ({
  measurement: {
    value,
    created_at: date,
    things_to_measure: {
      unit,
      name,
      maxValue,
    },
  },
}) => {
  const v = (Number(value) * 100) / maxValue;
  const color = (a, b) => {
    if (a <= b) {
      return '#e2716d';
    } if (a > b && a < (b * 2)) {
      return '#ffc549';
    }
    return '#79DE73';
  };
  return (
    <div className="d-flex p-3 m-item">
      <div className="d-flex flex-grow-1 align-items-center">
        <div className="graph">
          <MGraph
            value={value}
            maxValue={maxValue}
            styles={buildStyles({
              pathColor: color(v, 100 / 3),
            })}
          />
        </div>
        <div className="d-flex flex-column mx-3">
          <small className="date">{DateString(date)}</small>
          <small className="info-d">{name}</small>
        </div>
      </div>
      <div className="d-flex align-items-center mx-2">
        <small className="value">{value}</small>
        <small className="unit mx-1 text-uppercase">{unit}</small>
      </div>
    </div>
  );
};

MeasurementItem.propTypes = {
  measurement: PropTypes.shape({
    value: PropTypes.string,
    created_at: PropTypes.string,
    things_to_measure: PropTypes.shape({
      unit: PropTypes.string,
      name: PropTypes.string,
      maxValue: PropTypes.string,
    }),
  }).isRequired,
};

export default MeasurementItem;

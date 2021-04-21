import React from 'react';
import key from 'uniqid';
import PropTypes from 'prop-types';
import Item from './MeasurementItem';
import { DateDif } from '../../helpers/Date';

const MeasurementRangeItem = ({ title, measurementsList }) => (
  <div className="d-flex flex-column">
    <div className="d-flex align-items-center px-3 py-2">
      <span>{DateDif(title)}</span>
    </div>
    <div className="items-list d-flex flex-column">
      {measurementsList.map(m => (
        <Item
          key={key()}
          measurement={m}
        />
      ))}
    </div>
  </div>
);

MeasurementRangeItem.propTypes = {
  title: PropTypes.string.isRequired,
  measurementsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MeasurementRangeItem;

import React from 'react';

export default function ThingsToMeasure() {
  return (
    <div className="things-to-measure p-2 d-flex flex-column">
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
  );
}

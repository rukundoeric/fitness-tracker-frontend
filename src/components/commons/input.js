import React from 'react';

export default function input({
  refValue,
  label,
  type,
  id,
  placeholder,
  name,
  appendIcon,
}) {
  return (
    <div className="form-group my-3">
      <label htmlFor={label}>{label}</label>
      <div className="input-group d-flex">
        <input
          ref={refValue}
          type={type}
          id={id}
          className={`txts-inputs ${appendIcon ? 'border-2' : 'border-1'}`}
          placeholder={placeholder}
          aria-describedby="inputGroupPrepend2"
          name={name}
          required
        />
        {appendIcon ? (
          <div className="input-group-prepend">
            <span
              className="input-group-text prepend-style"
              id="inputGroupPrepend2"
            >
              {appendIcon}
            </span>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

import React from "react";

export default function selector({
  label,
  id,
  name,
  appendIcon
}) {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <div className="input-group d-flex">
        <select
          id={id}
          className={`txts-inputs  ${appendIcon ? "border-2" : "border-1"}`}
          name={name}
          required
        >
          <option value="">Select user role</option>
          <option value="admin">Admin</option>
          <option value="modurator">Modurator</option>
          <option value="manager">Agency manager</option>
          <option value="teller">Teller</option>
        </select>
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

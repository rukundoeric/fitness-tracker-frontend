import React from "react";

export default function image({ src, name }) {
  return (
    <div className="avata">
      {src ? (
        <img className="pic" src={src} alt="avata"></img>
      ) : (
        <label>
          <div className="pic">{name.charAt(0)}</div>
        </label>
      )}
    </div>
  );
}

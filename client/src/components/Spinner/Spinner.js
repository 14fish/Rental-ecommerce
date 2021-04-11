import React from "react";
import "./Spinner.css"

export const Spinner = (props) => {
  return (
    <div className='lds-roller'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

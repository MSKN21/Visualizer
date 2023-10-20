import React from "react";

const Singlebar = (props) => {
  let style;
  if (props.arrsize <= 20) {
    style = {
      height: `${props.size}px`,
      width: `40px`,
      marginLeft: `5px`,
      backgrounColor: `rgb(130, 177, 253)`,
    };
  } else if (props.arrsize <= 40) {
    style = {
      height: `${props.size}px`,
      width: `30px`,
      marginLeft: `4px`,
      backgrounColor: `rgb(130, 177, 253)`,
    };
  } else if (props.arrsize <= 60) {
    style = {
      height: `${props.size}px`,
      width: `20px`,
      marginLeft: `3px`,
      backgrounColor: `rgb(130, 177, 253)`,
    };
  } else if (props.arrsize <= 80) {
    style = {
      height: `${props.size}px`,
      width: `15px`,
      marginLeft: `3px`,
    };
  } else if (props.arrsize <= 110) {
    style = {
      height: `${props.size}px`,
      width: `10px`,
      marginLeft: `3px`,
      backgrounColor: `rgb(130, 177, 253)`,
    };
  } else if (props.arrsize <= 150) {
    style = {
      height: `${props.size}px`,
      width: `5px`,
      marginLeft: `3px`,
      backgrounColor: `rgb(130, 177, 253)`,
    };
  } else {
    style = {
      height: `${props.size}px`,
      width: `2px`,
      marginLeft: `2px`,
      backgrounColor: `rgb(130, 177, 253)`,
    };
  }

  return (
    <>
      <div
        className="bars"
        id={`bar_${props.ind + 1}`}
        value={`${props.ind + 1}`}
        style={style}
      ></div>
    </>
  );
};

export default Singlebar;

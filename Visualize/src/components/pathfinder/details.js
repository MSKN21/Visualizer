import React from "react";
import "../../styles/pathfinder/details.css";
import { GrTarget } from "react-icons/gr";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { GiWeight } from "react-icons/gi";
import { FaBomb } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  wallnodeclr,
  normalborderclr,
  normalnodeclr,
  visited1,
  visited3,
  pathnodeclr,
} from "./colors";

const Details = (props) => {
  const [wgtbool, setwgtbool] = useState(false);
  useEffect(() => {
    if (props.algonum === 6 || props.algonum === 7) setwgtbool(true);
    else setwgtbool(false);
  }, onclick);

  return (
    <div id="details_box">
      <div className="detl_divs">
        <IoIosArrowDroprightCircle className="nodeicn" />
        <span> StartNode</span>
      </div>
      <div className="detl_divs">
        <GrTarget className="nodeicn" />
        <span> TargetNode</span>
      </div>
      <div className="detl_divs">
        <FaBomb className="nodeicn" />
        <span> BombNode</span>
      </div>
      <div className="detl_divs">
        <GiWeight className="nodeicn" />
        {!wgtbool && <span> WeightNode</span>}
        {wgtbool && (
          <span>
            <s> WeightNode</s>
          </span>
        )}
      </div>
      <div className="detl_divs">
        <i
          className="clr_boxs"
          style={{
            backgroundColor: normalnodeclr,
            border: "1px solid lightblue",
          }}
        ></i>
        <span> UnvisitedNode</span>
      </div>
      <div className="detl_divs">
        <i className="clr_boxs" style={{ backgroundColor: visited3 }}></i>
        <i className="clr_boxs" style={{ backgroundColor: visited1 }}></i>
        <span> VisitedNode</span>
      </div>
      <div className="detl_divs">
        <i className="clr_boxs" style={{ backgroundColor: pathnodeclr }}></i>
        <span> ShortestPathNode</span>
      </div>
      <div className="detl_divs">
        <i className="clr_boxs" style={{ backgroundColor: wallnodeclr }}></i>
        <span> WallNode</span>
      </div>
    </div>
  );
};

export default Details;

import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Details from "./details";
import sort from "../../storage/sort.png";
import grid from "../../storage/grid.png";
import "../../styles/pathfinder/pathhome.css";
import { Link } from "react-router-dom";
import { clearboard } from "./clearfuncs";
import { wallnodefunc, addweight, initialize, bmbinit } from "./setup";
import Tutorial from "./tutorial";
import { GrHelp } from "react-icons/gr";

const Pathhome = () => {
  let arr = [];
  for (let i = 1; i <= 2059; i++) arr.push(`${i}`);

  useEffect(() => initialize());

  let descs = [
    "Dijkstra's Algorithm is weighted and guarantees the shortest path!",
    "A* Search is weighted and guarantees the shortest path!",
    "Greedy Best-first Search is weighted and does not guarantee the shortest path!",
    "A* Search is weighted and guarantees the shortest path!",
    "A* Search is weighted and guarantees the shortest path!",
    "A* Search is weighted and guarantees the shortest path!",
    "Depth-first Search is unweighted and does not guarantee the shortest path!",
    "Breath-first Search is unweighted and guarantees the shortest path!",
  ];

  const clearboardfunc = () => {
    clearboard();
    initialize();
  };

  const [descstr, setdescstr] = useState(descs[0]);
  const [algosnum, setalgosnum] = useState(0);
  const [nfvst, setnfvst] = useState(0);
  const [totdist, settotdist] = useState(0);
  const [tutsbtn, settutsbtn] = useState(false);

  const descsfunc = (vl) => {
    setdescstr(descs[vl]);
    setalgosnum(vl);
  };

  let src = (
    <div draggable="true" class="first" id="source">
      <i class="fa fa-chevron-right"></i>
    </div>
  );

  let dest = (
    <div draggable="true" class="last" id="dest">
      <i class="fa fa-bullseye"></i>
    </div>
  );

  return (
    <div>
      {tutsbtn && <Tutorial tutsdisp={settutsbtn} />}
      {/* {active && <div id="blk_div"></div>} */}
      <Navbar
        clearboard={clearboardfunc}
        desc={(vl) => descsfunc(vl)}
        setv={setnfvst}
        setp={settotdist}
      />
      <Details algonum={algosnum} />
      <div id="algo_info">{descstr}</div>
      <div id="main_grid_box">
        {arr.map((val) => {
          let innerhtml = <></>;
          if (val == 860) innerhtml = src;
          else if (val == 915) innerhtml = dest;

          return (
            <div
              className="nodes"
              id={`node${val}`}
              name={`${val}`}
              style={{ backgroundColor: "white" }}
              onClick={(e) => wallnodefunc(e)}
              onDoubleClick={(e) => {
                if (!(algosnum === 6 || algosnum === 7)) addweight(e);
              }}
            >
              {innerhtml}
            </div>
          );
        })}
      </div>
      <div className="algoinfo">
        <span>
          <b>No Of Nodes Visited :</b> {nfvst}
        </span>
        <span>
          <b>Total Distance Of Path Found :</b> {totdist}
        </span>
      </div>
      <div onClick={() => settutsbtn(true)} className="btntut">
        <GrHelp className="qicn" />
      </div>
      <div id="icons_div">
        <div id="icon_in_div">
          <Link to="/sorting">
            <div id="iconsrt">
              <img src={sort} height="100%" width="100%" />
            </div>
          </Link>
          <Link to="/pathfinder">
            <div id="iconpath">
              <img src={grid} height="100%" width="100%" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pathhome;

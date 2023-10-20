import React, { useState } from "react";
import "../../styles/sorting/navbar.css";
import title from "../../storage/sorttitle.png";
import { BsCaretDownFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
const Navbar = (props) => {
  const [barvalue, setbarvalue] = useState(100);
  const [drpmenu, setdrpmenu] = useState(false);
  const [sortopt, setsortopt] = useState("Merge Sort");
  const [sortnum, setsortnum] = useState(1);
  const [active, setactive] = useState(false);

  const optionfunc = (e, val) => {
    setsortopt(e.target.innerHTML);
    setsortnum(val);
    setdrpmenu(false);
  };

  const history = useHistory();
  const reloadfunc = () => {
    history.go("http://localhost:3000/sorting");
  };

  return (
    <nav>
      {drpmenu && (
        <div
          id="blk_div2"
          onClick={() => {
            if (drpmenu) setdrpmenu(false);
            else setdrpmenu(true);
          }}
        ></div>
      )}
      <div id="navbar1">
        <div id="logo_div" onClick={() => reloadfunc()}>
          <img src={title} height="100%" width="100%" />
        </div>
        <div>
          <div id="newarr" onClick={props.newarr}>
            New Array
          </div>
        </div>
        <div id="rangebar">
          <label id="lb1">Range&nbsp;&&nbsp;Speed</label>
          <input
            type="range"
            min="5"
            max="300"
            value={barvalue}
            onChange={(e) => {
              setbarvalue(e.target.value);
              props.barval(e.target.value);
            }}
          />
          <label id="lb2">{barvalue}</label>
        </div>
        <div id="sorts_sec">
          <div
            id="selctd"
            onClick={() => {
              if (drpmenu) setdrpmenu(false);
              else setdrpmenu(true);
            }}
          >
            <label id="selctd_srt">{sortopt}</label>
            <BsCaretDownFill id="dropicon" />
          </div>
          {drpmenu && (
            <div id="opt_box">
              <p className="options" onClick={(e) => optionfunc(e, 1)}>
                Merge Sort
              </p>
              <p className="options" onClick={(e) => optionfunc(e, 2)}>
                Bubble Sort
              </p>
              <p className="options" onClick={(e) => optionfunc(e, 3)}>
                Quick Sort
              </p>
              <p className="options" onClick={(e) => optionfunc(e, 4)}>
                Heap Sort
              </p>
              <p className="options" onClick={(e) => optionfunc(e, 5)}>
                Radix Sort
              </p>
              <p className="options" onClick={(e) => optionfunc(e, 6)}>
                Insertion Sort
              </p>
              <p className="options" onClick={(e) => optionfunc(e, 7)}>
                Selection Sort
              </p>
            </div>
          )}
        </div>
        <div>
          <div
            id="sort_btn"
            onClick={() => {
              props.sortfunc(sortnum);
              props.activfunc(true);
            }}
          >
            {sortopt}!
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

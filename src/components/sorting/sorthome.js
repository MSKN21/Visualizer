import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Singlebar from "./singlebar";
import sort from "../../storage/sort.png";
import grid from "../../storage/grid.png";
import "../../styles/sorting/sorthome.css";
import { bubblesort } from "./sorts/bubblesort";
import { selectionsort } from "./sorts/selcsort";
import { heap } from "./sorts/heapsort";
import { insertionsort } from "./sorts/insrtsort";
import { radix } from "./sorts/radixsort";
import { merge } from "./sorts/mergesort";
import { quick } from "./sorts/quicksort";
import { Link } from "react-router-dom";

const Sorthome = () => {
  let arr = [];
  const [array, setarray] = useState(arr);
  const [arsize, setarsize] = useState(50);
  const [speed, setspeed] = useState(50);
  const [active, setactive] = useState(false);

  const selectspeed = (val) => {
    if (val <= 15) {
      setspeed(150);
    } else if (val <= 30) {
      setspeed(80);
    } else if (val <= 60) {
      setspeed(50);
    } else if (val <= 80) {
      setspeed(15);
    } else if (val <= 110) {
      setspeed(10);
    } else if (val <= 150) {
      setspeed(5);
    } else {
      setspeed(3);
    }
  };
  const colorred = () => {
    document.getElementById("navbar1").style.color = "red";
  };
  const colornormal = () => {
    document.getElementById("navbar1").style.color = "aliceblue";
  };
  const activateit = () => {
    setTimeout(() => {
      setactive(false);
      colornormal();
    }, 100);
  };
  const sortd = () => {
    let bars = document.getElementsByClassName("bars");
    let allbars = [...bars];
    let vals = [];
    for (let i = 0; i < allbars.length; i++) {
      vals[i] = parseInt(allbars[i].style.height.replace("px", ""));
    }
    for (let i = 0; i < vals.length; i++) {
      let j = i + 1;
      if (vals[j] - vals[i] < 0) return false;
    }
    return true;
  };
  const sorttype = (num) => {
    console.log(num);
    colorred();
    if (!sortd()) {
      switch (num) {
        case 1:
          merge(speed);
          break;
        case 2:
          bubblesort(speed);
          break;
        case 3:
          quick(speed);
          break;
        case 4:
          heap(speed);
          break;
        case 5:
          radix(speed);
          break;
        case 6:
          insertionsort(speed);
          break;
        case 7:
          selectionsort(speed);
          break;

        default:
          console.log("sort not choosen");
          break;
      }
    }
    console.log("end");
    setTimeout(() => activateit(), 100);
  };

  const randomnum = () => {
    return Math.floor(Math.random() * (700 - 80 + 1) + 80);
  };

  const arrayvalue = (val) => {
    setarsize(val);
    selectspeed(val);
    arr = [];
    for (let i = 0; i < val; i++) {
      arr.push(randomnum());
    }
    setarray(arr);
  };

  useEffect(() => {
    arrayvalue(100);
  }, []);

  const newarray = () => {
    arrayvalue(arsize);
  };

  return (
    <div>
      {active && <div id="blk_div"></div>}
      <Navbar
        barval={arrayvalue}
        newarr={newarray}
        sortfunc={sorttype}
        activfunc={setactive}
      />
      <div id="main_box">
        <div id="bars_div">
          {array.map((val, index) => (
            <Singlebar size={val} arrsize={arsize} ind={index} />
          ))}
        </div>
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

export default Sorthome;

import React, { useState } from "react";
import "../../styles/pathfinder/navbar.css";
import title from "../../storage/pathtitle2.png";
import { BsCaretDownFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import {
  clearwalls_nodes,
  clearpath,
  randomwall,
  randomweights,
  randomweightsnwalls,
} from "./clearfuncs";
import { zigzag } from "./mazes/zigzag";
import { setnodes } from "./mazes/dfsmaze";
import { dijkstras } from "./algorithms/dijkstra";
import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";
import { gbfs } from "./algorithms/greedybfs";
import { astar } from "./algorithms/astar";
import { removeweights, addbomb, rmbomb } from "./setup";

function Navbar(props) {
  const [drpmenu, setdrpmenu] = useState(false);
  const [algomenu, setalgomenu] = useState(false);
  const [mazemenu, setmazemenu] = useState(false);
  const [algoval, setalgoval] = useState("Dijkstra's");
  const [speedval, setspeedval] = useState("Fast");
  const [speedmenu, setspeedmenu] = useState(false);
  const [clearmenu, setclearmenu] = useState(false);
  const [algonum, setalgonum] = useState(0);
  const [spdvl, setspdvl] = useState(10);
  const [bmbbtn, setbmbbtn] = useState(false);

  const callalgo = (cs) => {
    let infoarr;
    switch (cs) {
      case 0:
        infoarr = dijkstras(spdvl, bmbbtn);
        break;
      case 1:
        infoarr = astar(spdvl, bmbbtn);
        break;
      case 2:
        infoarr = gbfs(spdvl, bmbbtn);
        break;
      case 6:
        infoarr = dfs(spdvl, bmbbtn);
        break;
      case 7:
        infoarr = bfs(spdvl, bmbbtn);
        break;
      default:
        infoarr = dijkstras(spdvl, bmbbtn);
        break;
    }
    props.setv(infoarr[0]);
    props.setp(infoarr[1]);
  };

  const setalgo = (val) => {
    setalgomenu(false);
    setalgoval(val);
  };

  const setspeed = (val) => {
    setspeedmenu(false);
    setspeedval(val);
  };

  const history = useHistory();
  const reloadfunc = () => {
    history.go("http://localhost:3000/pathfinder");
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
      <div id="navbar2">
        <div id="logo_div2" onClick={() => reloadfunc()}>
          <img src={title} height="100%" width="100%" />
        </div>
        <div>
          <div
            className="instrctns dropmns"
            onClick={() => {
              if (algomenu) setalgomenu(false);
              else setalgomenu(true);
              setspeedmenu(false);
              setmazemenu(false);
              setclearmenu(false);
            }}
          >
            <span>Algorithms</span>
            <BsCaretDownFill className="drpdwnicn" />
          </div>
          {algomenu && (
            <div id="algo_box">
              <p
                onClick={() => {
                  setalgo("Dijkstra's");
                  props.desc(0);
                  setalgonum(0);
                }}
              >
                Dijkstra's Algorithm
              </p>
              <p
                onClick={() => {
                  setalgo("A*");
                  props.desc(1);
                  setalgonum(1);
                }}
              >
                A* search
              </p>
              <p
                onClick={() => {
                  setalgo("GreedyBestFirst");
                  props.desc(2);
                  setalgonum(2);
                }}
              >
                Greedy Best-first Search
              </p>
              <p
                onClick={() => {
                  setalgo("DFS");
                  props.desc(6);
                  setalgonum(6);
                  removeweights();
                }}
              >
                Depth-first Search
              </p>
              <p
                onClick={() => {
                  setalgo("BFS");
                  props.desc(7);
                  setalgonum(7);
                  removeweights();
                }}
              >
                Breadth-first Search
              </p>
            </div>
          )}
        </div>
        <div>
          <div
            className="instrctns dropmns"
            onClick={() => {
              if (mazemenu) setmazemenu(false);
              else setmazemenu(true);
              setspeedmenu(false);
              setalgomenu(false);
              setclearmenu(false);
            }}
          >
            <span>Mazes & Patterns</span>
            <BsCaretDownFill className="drpdwnicn" />
          </div>
          {mazemenu && (
            <div id="algo_box">
              <p
                onClick={() => {
                  setmazemenu(false);
                  setnodes(1, bmbbtn);
                }}
              >
                Randomized Prim's Maze
              </p>
              <p
                onClick={() => {
                  setmazemenu(false);
                  setnodes(3, bmbbtn);
                }}
              >
                Randomized Krushkal's Maze
              </p>
              <p
                onClick={() => {
                  setmazemenu(false);
                  setnodes(2, bmbbtn);
                }}
              >
                Randomized&nbsp;DFS&nbsp;Maze
              </p>
              <p
                onClick={() => {
                  setmazemenu(false);
                  randomwall();
                }}
              >
                Basic Random Maze
              </p>
              <p
                onClick={() => {
                  setmazemenu(false);
                  if (!(algonum === 6 || algonum === 7)) randomweights();
                }}
              >
                Basic Weight Maze
              </p>
              <p
                onClick={() => {
                  setmazemenu(false);
                  if (!(algonum === 6 || algonum === 7)) randomweightsnwalls();
                }}
              >
                Random Walls & Weights Maze
              </p>
              <p
                onClick={() => {
                  setmazemenu(false);
                  zigzag();
                }}
              >
                Simple Stair Pattern
              </p>
            </div>
          )}
        </div>
        <div>
          <div
            className="instrctns dropmns"
            onClick={() => {
              if (speedmenu) setspeedmenu(false);
              else setspeedmenu(true);
              setmazemenu(false);
              setalgomenu(false);
              setclearmenu(false);
            }}
          >
            <span>Speed:{speedval}</span>
            <BsCaretDownFill className="drpdwnicn" />
          </div>
          {speedmenu && (
            <div id="algo_box" style={{ width: "200px" }}>
              <p
                onClick={() => {
                  setspeed("Fast");
                  setspdvl(10);
                }}
              >
                Fast
              </p>
              <p
                onClick={() => {
                  setspeed("Average");
                  setspdvl(50);
                }}
              >
                Average
              </p>
              <p
                onClick={() => {
                  setspeed("Slow");
                  setspdvl(125);
                }}
              >
                Slow
              </p>
            </div>
          )}
        </div>
        <div>
          <div
            className="instrctns"
            id="visulize_btn"
            onClick={() => callalgo(algonum)}
          >
            Visualize {algoval}!
          </div>
        </div>
        <div>
          {!bmbbtn && (
            <div
              className="instrctns"
              id="visulize_btn"
              onClick={() => {
                addbomb();
                setbmbbtn(true);
              }}
            >
              AddBomb
            </div>
          )}
          {bmbbtn && (
            <div
              className="instrctns"
              id="bmb_btn"
              onClick={() => {
                rmbomb();
                setbmbbtn(false);
              }}
            >
              RemoveBomb
            </div>
          )}
        </div>
        <div>
          <div
            id="hambrgricn"
            onClick={() => {
              if (clearmenu) setclearmenu(false);
              else setclearmenu(true);
              setspeedmenu(false);
              setmazemenu(false);
              setalgomenu(false);
            }}
          >
            <GiHamburgerMenu id="hambrgr" />
          </div>
          <div id="clear_btns_box">
            <div>
              <div
                className="instrctns clearbtns"
                onClick={() => {
                  props.clearboard();
                  setbmbbtn(false);
                }}
              >
                ClearBoard
              </div>
            </div>
            <div>
              <div className="instrctns clearbtns" onClick={() => clearpath()}>
                ClearPath
              </div>
            </div>
            <div>
              <div
                className="instrctns clearbtns"
                onClick={() => clearwalls_nodes()}
              >
                ClearWalls&Weights
              </div>
            </div>
          </div>
        </div>
      </div>
      {clearmenu && (
        <div id="hamoptions">
          <p
            onClick={() => {
              props.clearboard();
              setclearmenu(false);
              setbmbbtn(false);
            }}
          >
            ClearBoard
          </p>
          <p
            onClick={() => {
              clearpath();
              setclearmenu(false);
            }}
          >
            ClearPath
          </p>
          <p
            onClick={() => {
              clearwalls_nodes();
              setclearmenu(false);
            }}
          >
            ClearWalls&Weights
          </p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

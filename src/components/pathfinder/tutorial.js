import React from "react";
import { useEffect } from "react";
import "../../styles/pathfinder/tutorial.css";
import pathtitle2 from "../../storage/pathtitle2.png";
import algopic from "../../storage/algopic.png";
import mazepic from "../../storage/mazepic.png";
import wallpic from "../../storage/wallpic.png";
import bmbpic from "../../storage/bmbpic.png";
import strpic from "../../storage/strpic.png";
import bombpic from "../../storage/bombpic.png";
import trgpic from "../../storage/trgpic.png";
import navpic from "../../storage/navpic.png";
import spdpic from "../../storage/spdpic.png";
const Tutorial = (props) => {
  let slideIndex = 1;

  const plusSlides = (n) => {
    showSlides((slideIndex += n));
  };

  const currentSlide = (n) => {
    showSlides((slideIndex = n));
  };
  const showSlides = (n) => {
    let slide = document.getElementsByClassName("mySlides");
    let slides = [...slide];
    let i;
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  };

  const tutbtns = (e) => {
    e = e || window.event;

    if (e.keyCode == "37") {
      plusSlides(-1);
    }
    if (e.keyCode == "39") {
      plusSlides(1);
    }
  };

  useEffect(() => {
    showSlides(slideIndex);
    document.addEventListener("keydown", tutbtns);
  }, onclick);

  return (
    <div>
      <div onClick={() => props.tutsdisp(false)} className="tut_main_div"></div>
      <div className="tut_main">
        <div class="slideshow_container">
          <div className="mySlides tut_info1">
            <h1>Welcome to PathFinder Visualizer</h1>
            <p>
              This short tutorial will walk you through all of the features of
              this application.
            </p>
            <p style={{ fontSize: "23px" }}>
              If you want to dive right in, feel free to press the "Skip
              Tutorial" button below.
              <br /> Otherwise, press "Next"!
            </p>
            <img src={pathtitle2} className="tut_pathtitle"></img>
          </div>

          <div className="mySlides tut_info2">
            <h1>Picking an algorithm</h1>
            <p>Choose an algorithm from the "Algorithms" drop-down menu.</p>
            <p style={{ fontSize: "20px" }}>
              Note that some algorithms are&nbsp;
              <i>
                <b>unweighted</b>
              </i>
              , while others are&nbsp;
              <i>
                <b>weighted</b>
              </i>
              . Unweighted algorithms do not take turns or weight nodes into
              account, whereas weighted ones do. Additionally, not all
              algorithms guarantee the shortest path.
            </p>
            <img src={algopic} className="tut_algopic"></img>
          </div>
          <div className="mySlides tut_info3">
            <h1>Picking an Maze / Pattern</h1>
            <p>
              Choose an maze algorithm from the "Mazes & Pattern" drop-down
              menu.
            </p>
            <img src={mazepic} className="tut_mazepic"></img>
          </div>
          <div className="mySlides tut_info4">
            <h1>Meet The Algorithms</h1>
            <p>
              <b>Search Algorithms.</b>
            </p>
            <p style={{ fontSize: "18px" }}>
              <b>Dijkstra's Algorithm </b>(weighted): The father of pathfinding
              algorithms; guarantees the shortest path
              <br />
              <b> A* Search</b> (weighted): Arguably the best pathfinding
              algorithm; uses heuristics to guarantee the shortest path much
              faster than Dijkstra's Algorithm
              <br />
              <b>Greedy Best-first Search</b>
              (weighted): A faster, more heuristic-heavy version of A*; does not
              guarantee the shortest path
              <br />
              <b>Breath-first Search</b> (unweighted): A great algorithm;
              guarantees the shortest path
              <br />
              <b>Depth-first Search</b>
              (unweighted): A very bad algorithm for pathfinding; does not
              guarantee the shortest path
            </p>
            <p>
              <b>Maze Algorithms.</b>
            </p>
            <p style={{ fontSize: "18px" }}>
              <b>Randomized Prim's Algorithm: </b>This Algorithm creates maze by
              connecting the vertices in a minimum spanning tree.
              <br />
              <b>Randomized Krushkal's Algorithm:</b> This Algorithm creates
              maze by connecting the edges that are selected randomly from list.
              <br />
              <b>Randomized DFS Algorithm:</b> This Algorithm creates maze by
              connecting the edges that are selected randomly from stack.
            </p>
          </div>
          <div className="mySlides tut_info5">
            <h1>Adding walls and weights</h1>
            <p>
              Click on the grid to add a wall. DoubleClick on the grid to add a
              weight. Generate mazes and patterns from the "Mazes & Patterns"
              drop-down menu.
            </p>
            <p style={{ fontSize: "20px" }}>
              Walls are impenetrable, meaning that a path cannot cross through
              them. Weights, however, are not impassable. They are simply more
              "costly" to move through. In this application, moving through a
              weight node has a "cost" of 15.
              <br />
              <b>Note:</b> weight node can't be added if algorithm selected is
              BFS or DFS
            </p>
            <img src={wallpic} className="tut_wallpic"></img>
          </div>
          <div className="mySlides tut_info6">
            <h1>Adding a Bomb</h1>
            <p>Click the "Add Bomb" button.</p>
            <p style={{ fontSize: "20px" }}>
              Adding a bomb will change the course of the chosen algorithm. In
              other words, the algorithm will first look for the bomb (in an
              effort to diffuse it) and will then look for the target node.
            </p>
            <p>Click the "Remove Bomb" button to remove bomb.</p>
            <img src={bmbpic} className="tut_bmbpic"></img>
          </div>
          <div className="mySlides tut_info7">
            <h1>Draggable Nodes</h1>
            <p>
              Click and drag the start, bomb, and target nodes to move them.
            </p>
            <div className="tut_drags">
              <img src={strpic} className="tut_drgpic"></img>
              <img src={bombpic} className="tut_drgpic"></img>
              <img src={trgpic} className="tut_drgpic"></img>
            </div>
            <h1>Visualizing,Clearing & Other Funcs.</h1>
            <p>
              Use the navbar buttons to visualize algorithms and to do other
              stuff
            </p>
            <p style={{ fontSize: "20px" }}>
              You can clear the current path, clear walls and weights, clear the
              entire board, and adjust the visualization speed, all from the
              navbar. If you want to access this tutorial again, click on "Help
              Button" in the bottom right corner of your screen. If you want to
              stop animation/visualization , click on "PathFinder Title" in the
              top left corner of your screen.
            </p>
            <div className="tut_navs">
              <img src={spdpic} className="tut_nav1"></img>
              <img src={navpic} className="tut_nav2"></img>
            </div>
          </div>
          <div className="mySlides tut_info8">
            <h1>Enjoy &#128512;</h1>
            <p>
              I Hope You Have Fun Playing Around with this visualization tool.
            </p>
          </div>
        </div>
        <div className="tut_btns">
          <div className="tut_btn1" onClick={() => props.tutsdisp(false)}>
            Skip Tutorial
          </div>
          <div className="tut_btn2" onClick={() => plusSlides(-1)}>
            Previous
          </div>
          <div onClick={() => plusSlides(1)} className="tut_btn3">
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;

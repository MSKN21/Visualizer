import {
  wallnodeclr,
  normalborderclr,
  normalnodeclr,
  visited1,
  visited2,
  visited3,
  pathnodeclr,
} from "./colors";

export const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

const clearanimation = (allnodes, val) => {
  console.log("hi");
  if (val == -1) {
    for (let i = 0; i <= 2058; i++) {
      allnodes[i].style.animation = "";
    }
  } else {
    val.style.animation = "";
  }
};

export const activateit = (allnodes, val) => {
  setTimeout(() => {
    clearanimation(allnodes, val);
  }, 0);
  // sleep(25);
};

export const clearpath = () => {
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  for (let i of allnodes) {
    let color = i.style.backgroundColor;
    if (
      color === visited1 ||
      color === visited2 ||
      color === visited3 ||
      color === pathnodeclr
    ) {
      i.style.backgroundColor = normalnodeclr;
      i.style.borderColor = normalborderclr;
    }
  }
  clearanimation(allnodes, -1);
};

export const clearwalls_nodes = () => {
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  for (let i of allnodes) {
    let color = i.style.backgroundColor;
    if (color === wallnodeclr) {
      i.style.backgroundColor = normalnodeclr;
      i.style.borderColor = normalborderclr;
    }
    if (i.children.length == 1 && i.children[0].className === "weight") {
      i.children[0].remove();
      i.style.backgroundColor = normalnodeclr;
      i.style.borderColor = normalborderclr;
    }
  }
  clearanimation(allnodes, -1);
};

const points = (node, str) => {
  let a = new DOMParser();
  let y = a.parseFromString(str, "text/html");
  console.log(y.body.firstChild);
  node.style.backgroundColor = normalnodeclr;
  node.append(y.body.firstChild);
};

export const clearboard = () => {
  clearpath();
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  for (let i of allnodes) {
    let color = i.style.backgroundColor;
    if (color === wallnodeclr) {
      i.style.backgroundColor = normalnodeclr;
      i.style.borderColor = normalborderclr;
    }
    if (i.children.length == 1) {
      i.children[0].remove();
      i.style.backgroundColor = normalnodeclr;
      i.style.borderColor = normalborderclr;
    }
  }
  for (let i of allnodes) {
    if (i.id == "node860") {
      console.log("860");
      let src = `<div draggable="true" id="source">
          <i class="fa fa-chevron-right"></i>
        </div>`;

      points(i, src);
      i.style.animation = "popup 250ms ease-out";
    } else if (i.id == "node915") {
      console.log("915");
      let dest = `<div draggable="true" id="dest">
          <i class="fa fa-bullseye"></i>
        </div>`;
      points(i, dest);
      i.style.animation = "popup 250ms ease-out";
    }
  }
  setTimeout(() => activateit(allnodes, -1), 0);
};

const randomnum = () => {
  return Math.floor(Math.random() * (2057 - 2 + 1) + 2);
};

export const randomwall = () => {
  clearwalls_nodes();
  clearpath();
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  for (let i = 0; i <= 750; i++) {
    let val = randomnum();
    if (allnodes[val].children.length == 0) {
      allnodes[val].style.backgroundColor = wallnodeclr;
      allnodes[val].style.borderColor = wallnodeclr;
      allnodes[val].style.animation = "popup 250ms ease-out";
    }
  }
  setTimeout(() => activateit(allnodes, -1), 0);
};

export const randomweights = () => {
  clearwalls_nodes();
  clearpath();
  let w = `<div class="weight">
      <i class="fas fa-weight-hanging"></i>
    </div>`;
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  for (let i = 0; i <= 500; i++) {
    let val = randomnum();
    console.log(val);
    if (allnodes[val].children.length == 0) {
      points(allnodes[val], w);
      allnodes[val].style.animation = "popup 250ms ease-out";
    }
  }
  setTimeout(() => activateit(allnodes, -1), 0);
};

export const randomweightsnwalls = () => {
  clearwalls_nodes();
  clearpath();
  let w = `<div class="weight">
      <i class="fas fa-weight-hanging"></i>
    </div>`;
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  for (let i = 0; i <= 750; i++) {
    let val = randomnum();
    console.log(val);
    if (i % 2 === 1 && allnodes[val].children.length == 0) {
      allnodes[val].style.backgroundColor = normalnodeclr;
      allnodes[val].style.borderColor = normalborderclr;
      points(allnodes[val], w);
      allnodes[val].style.animation = "popup 250ms ease-out";
    }
    if (i % 2 === 0 && allnodes[val].children.length == 0) {
      allnodes[val].style.backgroundColor = wallnodeclr;
      allnodes[val].style.borderColor = wallnodeclr;
      allnodes[val].style.animation = "popup 250ms ease-out";
    }
  }
  setTimeout(() => activateit(allnodes, -1), 0);
};

import {
  wallnodeclr,
  normalborderclr,
  normalnodeclr,
  visited1,
  visited2,
  visited3,
  pathnodeclr,
} from "../colors";
import { activateit, clearpath, sleep } from "../clearfuncs";

export const visitclr = (i, alldivs, speed, clr) => {
  alldivs[i].style.backgroundColor = clr;
  alldivs[i].style.borderColor = clr;
  if (clr === visited1 || clr === visited2)
    alldivs[i].style.animation = "popup3 1000ms ease-out";
  if (clr === visited3) alldivs[i].style.animation = "popup7 1000ms ease-out";
  // alldivs[i].style.transition = "linear";
  sleep(speed);
  // sleep(speed + speed * 0.4);
};

export let adjlist = new Map();

const addEdge = (u, v, dist) => {
  adjlist.get(u).push([v, dist]);
};

const addVertex = (v) => {
  adjlist.set(v, []);
};

const wallVertex = (v) => {
  let list = adjlist.get(v);
  for (let edg of list) {
    let lst = adjlist.get(edg[0]);
    for (let i = 0; i < lst.length; i++) {
      if (lst[i][0] === v) {
        adjlist.get(edg[0]).splice(i, 1);
        i--;
      }
    }
  }
  adjlist.set(v, []);
};

const weightVertex = (v) => {
  let list = adjlist.get(v);
  adjlist.set(v, []);
  for (let edge of list) {
    edge[1] = 15;
    adjlist.get(v).push(edge);
  }
  console.log(adjlist.get(v));
};

const pathclr = (i, alldivs, speed) => {
  alldivs[i].style.backgroundColor = pathnodeclr;
  alldivs[i].style.borderColor = pathnodeclr;
  alldivs[i].style.animation = "popup2 250ms ease-in";
  sleep(speed);
  // sleep(speed + speed * 0.4);
};

const callvisit = (i, alldivs, speed) => {
  setTimeout(() => {
    pathclr(i, alldivs, speed);
  }, 0);
  // sleep(20);
};

export const getweight = (a, b, adjlst) => {
  let lst = adjlst.get(b);
  for (let i of lst) if (i[0] === a) return i[1];
};

export const pathcolor = (path, speed) => {
  let divs = document.getElementsByClassName("nodes");
  console.log(divs);
  let alldivs = [...divs];
  console.log(alldivs);
  // for (let i = path.length - 1; i >= 0; i--) {
  //   alldivs[path[i] - 1].style.animation = "";
  // }
  setTimeout(() => activateit(alldivs, -1), 0);
  for (let i = path.length - 1; i >= 0; i--) {
    setTimeout(() => callvisit(path[i] - 1, alldivs, speed), 0);
  }
};

const graphsetup = () => {
  let val = 0;
  let arr = new Array(29);
  for (let i = 0; i < 29; i++) {
    arr[i] = new Array(71);
  }
  for (let i = 0; i < 29; i++) {
    for (let j = 0; j < 71; j++) {
      val++;
      arr[i][j] = val;
    }
  }
  for (let i = 1; i <= 2059; i++) {
    addVertex(i);
  }
  for (let i = 0; i < 29; i++) {
    for (let j = 0; j < 71; j++) {
      let vrtx = arr[i][j];
      if (i - 1 >= 0) {
        addEdge(vrtx, arr[i - 1][j], 1);
      }
      if (j + 1 < 71) {
        addEdge(vrtx, arr[i][j + 1], 1);
      }
      if (i + 1 < 29) {
        addEdge(vrtx, arr[i + 1][j], 1);
      }
      if (j - 1 >= 0) {
        addEdge(vrtx, arr[i][j - 1], 1);
      }
    }
  }
};

export const graph_init = () => {
  graphsetup();
  clearpath();
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  for (let i = 0; i < allnodes.length; i++) {
    if (allnodes[i].style.backgroundColor === wallnodeclr) {
      console.log(allnodes[i].id);
      wallVertex(i + 1);
    }
  }
  let wnodes = document.getElementsByClassName("weight");
  let allwnodes = [...wnodes];
  for (let m of allwnodes) {
    let wn = parseInt(m.parentNode.id.slice(4));
    console.log(wn);
    weightVertex(wn);
  }
};

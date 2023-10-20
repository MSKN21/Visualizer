import { activateit, sleep, clearwalls_nodes, clearpath } from "../clearfuncs";
import { adjlist } from "../algorithms/gridsetup";

import {
  wallnodeclr,
  normalborderclr,
  normalnodeclr,
  visited1,
  visited2,
  pathnodeclr,
} from "../colors";

import { getcoord } from "./krushkals";

let stack = [];
let krush = [];
let visited = [];
let stk2 = [];
let stk3 = [];
let stk4 = [];
let wallsarr = [];
let arr = [];
let directions1 = [
  [0, 2],
  [0, -2],
  [-2, 0],
  [2, 0],
];
let directions2 = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

const dfssetup = () => {
  stack = [];
  visited = [];
  stk2 = [];
  stk3 = [];
  stk4 = [];
  wallsarr = [];
  for (let i = 0; i < 29; i++) {
    let temp = [];
    for (let j = 0; j < 71; j++) temp.push(false);
    visited.push(temp);
  }
  arr = [];
  let val = 0;
  for (let i = 0; i < 29; i++) {
    let temp = [];
    for (let j = 0; j < 71; j++) {
      temp.push(val);
      val++;
    }
    arr.push(temp);
  }

  directions1 = [
    [0, 2],
    [0, -2],
    [-2, 0],
    [2, 0],
  ];
  directions2 = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  for (let i = 0; i < 2059; i++) {
    wallsarr[i] = true;
  }
};
// dfssetup();

function getRndnDirec() {
  let array = [
    [0, 2],
    [0, -2],
    [-2, 0],
    [2, 0],
  ];
  var currentIndex = array.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export const shuffle = (array) => {
  var currentIndex = array.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

function DFS(i, j) {
  stack.push([i, j]);
  var temp = getRndnDirec();
  visited[i][j] = true;
  temp.forEach(([x, y]) => {
    let p = i + x,
      q = j + y;
    if (0 <= p && p < 29 && 0 <= q && q < 71) {
      if (!visited[p][q]) {
        stk2.push([
          [i, j],
          [p, q],
        ]);
        DFS(p, q);
      }
    }
  });
}

const prims = (i, j) => {
  stack.push([
    [i, j],
    [i, j],
  ]);
  while (stack.length !== 0) {
    stack = shuffle(stack);
    let node = stack[0];
    stk2.push(node);
    visited[node[1][0]][node[1][1]] = true;
    stack.shift();
    directions1.forEach(([x, y]) => {
      let p = node[1][0] + x,
        q = node[1][1] + y;
      if (0 <= p && p < 29 && 0 <= q && q < 71) {
        if (!visited[p][q]) {
          stack.push([
            [node[1][0], node[1][1]],
            [p, q],
          ]);
          visited[p][q] = true;
        }
      }
    });
  }
};

//mhg

let root = new Array(2060);
let visitd = new Array(2060);

const addEdge = (u, v, dist) => {
  adjlist.get(u).push([v, dist]);
};

const addVertex = (v) => {
  adjlist.set(v, []);
};

export const graphsetup = () => {
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
  for (let i = 73; i <= 2059; i += 2) {
    addVertex(i);
  }
  for (let i = 1; i < 29; i += 2) {
    for (let j = 1; j < 71; j += 2) {
      let vrtx = arr[i][j];
      if (i - 2 >= 0) {
        addEdge(vrtx, arr[i - 2][j], 1);
      }
      if (j + 2 < 71) {
        addEdge(vrtx, arr[i][j + 2], 1);
      }
      if (i + 2 < 29) {
        addEdge(vrtx, arr[i + 2][j], 1);
      }
      if (j - 2 >= 0) {
        addEdge(vrtx, arr[i][j - 2], 1);
      }
    }
  }
  for (let i = 73; i <= 2059; i += 2) {
    root[i] = i;
  }

  for (let i = 73; i <= 2059; i += 2) {
    let m = adjlist.get(i);
    for (let nd of m) {
      if (!visitd[nd[0]]) krush.push([i, nd[0]]);
    }
    visitd[m] = 1;
  }
};

export const parent = (a) => {
  while (root[a] != a) {
    root[a] = root[root[a]];
    a = root[a];
  }
  return a;
};

export const union_find = (a, b) => {
  let d = parent(a);
  let e = parent(b);
  root[d] = root[e];
};

//mh

const kruskal = () => {
  graphsetup();
  let a, b;
  for (let i = 0; i < 5; i++) krush = shuffle(krush);
  for (let node of krush) {
    a = node[0];
    b = node[1];
    if (parent(a) != parent(b)) {
      //only select edge if it does not create a cycle (ie the two nodes forming it have different root nodes)
      stk2.push([getcoord(a), getcoord(b)]);
      union_find(a, b);
    }
  }
};

function cmpr(x, y) {
  for (let i = 0; i < directions1.length; i++) {
    if (directions1[i][0] == x && directions1[i][1] == y) {
      return directions2[i];
    }
  }
  return [0, 0];
}

function diff(a, b, p, q) {
  let x = p - a;
  let y = q - b;
  let arr = cmpr(x, y);
  stk3.push([a + arr[0], b + arr[1]]);
  stk4.push([
    [a, b],
    [a + arr[0], b + arr[1]],
    [p, q],
  ]);
}

const paths = () => {
  for (let i = 0; i < stk2.length; i++) {
    let a = stk2[i][0][0];
    let b = stk2[i][0][1];
    let p = stk2[i][1][0];
    let q = stk2[i][1][1];
    diff(a, b, p, q);
  }
  // console.log(stk3);
};

const pointsurroundingwalls = (num) => {
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  let val = 0;
  let i, j;
  for (let x = 0; x < 29; x++) {
    for (let y = 0; y < 71; y++) {
      val++;
      if (val == num) {
        i = x;
        j = y;
      }
    }
  }
  console.log(i, j);
  if (i >= 0 && i <= 28 && j >= 0 && j <= 70) {
    if (j + 1 <= 70 && wallsarr[arr[i][j + 1]]) {
      wallsarr[arr[i][j + 1]] = false;
      setTimeout(() => {
        callvisit(arr[i][j + 1], allnodes, 7, normalnodeclr);
      }, 0);
    } else if (j - 1 >= 0 && wallsarr[arr[i][j - 1]]) {
      wallsarr[arr[i][j - 1]] = false;
      setTimeout(() => {
        callvisit(arr[i][j - 1], allnodes, 7, normalnodeclr);
      }, 0);
    } else if (i + 1 <= 28 && wallsarr[arr[i + 1][j]]) {
      wallsarr[arr[i + 1][j]] = false;
      setTimeout(() => {
        callvisit(arr[i + 1][j], allnodes, 7, normalnodeclr);
      }, 0);
    } else if (i - 1 >= 0 && wallsarr[arr[i - 1][j]]) {
      wallsarr[arr[i - 1][j]] = false;
      setTimeout(() => {
        callvisit(arr[i - 1][j], allnodes, 7, normalnodeclr);
      }, 0);
    }
  }
};

const visitclr = (i, alldivs, speed, clr) => {
  alldivs[i].style.backgroundColor = normalnodeclr;
  alldivs[i].style.borderColor = normalborderclr;
  alldivs[i].style.animation = "popup4 300ms ease-in";
  sleep(speed);
  // sleep(speed + speed * 0.4);
};

const callvisit = (i, alldivs, speed, clr) => {
  setTimeout(() => {
    visitclr(i, alldivs, speed, clr);
  }, 0);
  // sleep(20);
};

const callvisit2 = (i, alldivs, speed, clr) => {
  setTimeout(() => {
    callvisit(i, alldivs, speed, clr);
  }, 0);
  // sleep(20);
};

export const setnodes = (algonum, bmb) => {
  clearwalls_nodes();
  clearpath();
  dfssetup();
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  let src, dest, bomb;
  for (let i = 0; i < 2059; i++) {
    if (
      allnodes[i].children.length == 1 &&
      allnodes[i].children[0].id === "source"
    ) {
      let str = allnodes[i].children[0].parentNode.id;
      str = str.replace("node", "");
      src = parseInt(str);
      console.log(src);
    } else if (
      allnodes[i].children.length == 1 &&
      allnodes[i].children[0].id === "dest"
    ) {
      let str = allnodes[i].children[0].parentNode.id;
      str = str.replace("node", "");
      dest = parseInt(str);
      console.log(dest);
    } else if (
      bmb &&
      allnodes[i].children.length == 1 &&
      allnodes[i].children[0].id === "bomb"
    ) {
      let str = allnodes[i].children[0].parentNode.id;
      str = str.replace("node", "");
      bomb = parseInt(str);
      console.log(bomb);
    }
  }
  if (algonum === 1) prims(1, 1);
  if (algonum === 2) DFS(1, 1);
  if (algonum === 3) kruskal();
  paths();
  for (let i = 0; i < 2059; i++) {
    allnodes[i].style.backgroundColor = wallnodeclr;
    allnodes[i].style.borderColor = wallnodeclr;
  }
  allnodes[src - 1].style.backgroundColor = normalnodeclr;
  allnodes[src - 1].style.borderColor = normalborderclr;
  allnodes[dest - 1].style.backgroundColor = normalnodeclr;
  allnodes[dest - 1].style.borderColor = normalborderclr;
  if (bmb) {
    allnodes[bomb - 1].style.backgroundColor = normalnodeclr;
    allnodes[bomb - 1].style.borderColor = normalborderclr;
  }
  for (let i = 0; i < stk4.length; i++) {
    for (let j = 0; j < stk4[i].length; j++) {
      let num = arr[stk4[i][j][0]][stk4[i][j][1]];
      wallsarr[num] = false;
      setTimeout(() => {
        callvisit(num, allnodes, 5, normalnodeclr);
      }, 0);
    }
  }
  pointsurroundingwalls(src);
  pointsurroundingwalls(dest);
  if (bmb) pointsurroundingwalls(bomb);

  console.log(stk4);
  // for (let i = 0; i < 2059; i++) {
  //   if (wallsarr[i] && allnodes[i].children.length == 0) {
  //     allnodes[i].style.backgroundColor = wallnodeclr;
  //     allnodes[i].style.borderColor = wallnodeclr;
  //     allnodes[i].style.animation = "popup 150ms ease-out";
  //   }
  // }
  setTimeout(() => activateit(allnodes, -1), 0);
};

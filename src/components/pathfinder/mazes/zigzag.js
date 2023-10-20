import {
  clearwalls_nodes,
  clearpath,
  randomwall,
  randomweights,
  activateit,
  sleep,
} from "../clearfuncs";

import {
  wallnodeclr,
  normalborderclr,
  normalnodeclr,
  visited1,
  visited2,
  pathnodeclr,
} from "../colors";

const randomnum = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};

let arr = [],
  num = 0;
for (let i = 0; i < 29; i++) {
  for (let j = 0; j < 71; j++) {
    arr[i] = [];
  }
}
for (let i = 0; i < 29; i++) {
  for (let j = 0; j < 71; j++) {
    num++;
    arr[i][j] = num;
  }
}
const animatenode = (node) => {
  node.style.backgroundColor = wallnodeclr;
  node.style.borderColor = wallnodeclr;
  node.style.animation = "popup 100ms ease-out";
  sleep(30);
};

const animewait = (node) => {
  setTimeout(() => animatenode(node), 0);
};

const addwall = (allnodes, val) => {
  if (allnodes[val].children.length == 0) {
    setTimeout(() => animewait(allnodes[val]), 0);
  }
};

export const zigzag = () => {
  clearwalls_nodes();
  clearpath();
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  let top = 1;
  let num = randomnum(5, 27);
  console.log(num);
  let i = num,
    j = 1;
  console.log(i, " ", j, arr[i][j]);
  while (j <= 69 && (i >= 1 || i <= 27)) {
    if (top == 1) {
      if (i <= 1) top = 0;
      else {
        console.log(i, " ", j, arr[i][j]);
        addwall(allnodes, arr[i][j] - 1);
        i--;
        j++;
      }
    } else if (top == 0) {
      if (i >= 27) top = 1;
      else {
        console.log(i, " ", j, arr[i][j]);
        addwall(allnodes, arr[i][j] - 1);
        i++;
        j++;
      }
    }
  }
  setTimeout(() => activateit(allnodes, -1), 0);
};

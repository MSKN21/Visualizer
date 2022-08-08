import {
  wallnodeclr,
  normalborderclr,
  normalnodeclr,
  visited1,
  visited2,
  visited3,
  pathnodeclr,
} from "../colors";

import {
  adjlist,
  graph_init,
  pathcolor,
  visitclr,
  getweight,
} from "./gridsetup";
import { sleep, activateit } from "../clearfuncs";

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

const activateit2 = (alldivs, val, i, speed, clr) => {
  setTimeout(() => activateit(alldivs, val), 0);
  setTimeout(() => callvisit(i, alldivs, speed, clr), 0);
};

const getcoord = (x) => {
  let val = 0;
  let arr = new Array(2);
  for (let i = 0; i < 29; i++) {
    for (let j = 0; j < 71; j++) {
      val++;
      if (val == x) {
        arr[0] = i;
        arr[1] = j;
        return arr;
      }
    }
  }
};

const herucalc = (a, b) => {
  let first = getcoord(a);
  let last = getcoord(b);
  let hval = Math.abs(last[1] - first[1]) + Math.abs(last[0] - first[0]);
  return hval;
};

const sortFunction = (a, b) => {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return a[0] < b[0] ? -1 : 1;
  }
};

const startGBFS = (u, dest, speed, clr) => {
  let dist = new Array(2100).fill(50000);
  let prev = new Array(2100).fill(-1);
  let visit = new Array(2100).fill(0);
  let novst = 0;
  let totdst = 0;
  let st = [];
  let m = herucalc(u, dest);
  st.push([m, u]);
  dist[u] = m;
  let divs = document.getElementsByClassName("nodes");
  let alldivs = [...divs];

  while (st.length != 0) {
    st.sort(sortFunction);
    let now = st[0];
    st.shift();

    let v = now[1];
    let w = now[0];
    visit[v] = 1;
    setTimeout(
      () => activateit2(alldivs, alldivs[v - 1], v - 1, speed * 2, clr),
      0
    );
    novst++;
    if (v === dest) break;

    let edges = adjlist.get(v);
    for (let to of edges) {
      if (visit[to[0]] === 0) {
        visit[to[0]] = 1;
        dist[to[0]] = herucalc(to[0], dest);
        prev[to[0]] = v;
        st.push([dist[to[0]], to[0]]);
      }
    }
  }
  let path = [];
  let crawl = dest;
  path.push(crawl);
  while (prev[crawl] != -1) {
    path.push(prev[crawl]);
    totdst += getweight(crawl, prev[crawl], adjlist);
    crawl = prev[crawl];
  }
  console.log(path);
  return [novst, totdst, path];
};

export const gbfs = (speed, bmb) => {
  graph_init();
  let src = parseInt(document.getElementById("source").parentNode.id.slice(4));
  let dst = parseInt(document.getElementById("dest").parentNode.id.slice(4));
  let bomb;
  if (bmb) {
    bomb = parseInt(document.getElementById("bomb").parentNode.id.slice(4));
    let a, b;
    a = startGBFS(src, bomb, speed, visited3);
    if (a[2][a[2].length - 1] === src)
      b = startGBFS(bomb, dst, speed, visited1);
    setTimeout(() => pathcolor(a[2], speed * 2), 0);
    if (a[2][a[2].length - 1] === src)
      setTimeout(() => pathcolor(b[2], speed * 2), 0);
    let res;
    if (a[2][a[2].length - 1] === src) res = [a[0] + b[0], a[1] + b[1]];
    else return [a[0], 0];
    return res;
  }
  let ar = startGBFS(src, dst, speed, visited1);
  setTimeout(() => pathcolor(ar[2], speed * 2), 0);
  return ar;
};

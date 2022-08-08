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
import { sleep, activateit, clearpath } from "../clearfuncs";

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

const startDFS = (u, dest, speed, clr) => {
  let dist = new Array(2100).fill(0);
  let prev = new Array(2100).fill(-1);
  let visit = new Array(2100).fill(0);
  let st = [];
  let novst = 0;
  let totdst = 0;
  st.push([0, u]);
  dist[u] = 0;
  let divs = document.getElementsByClassName("nodes");
  let alldivs = [...divs];

  while (st.length != 0) {
    let now = st[st.length - 1];
    st.pop();
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
    for (let to of edges.slice().reverse()) {
      if (visit[to[0]] === 0) {
        dist[to[0]] = w + to[1];
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

export const dfs = (speed, bmb) => {
  graph_init();
  let src = parseInt(document.getElementById("source").parentNode.id.slice(4));
  let dst = parseInt(document.getElementById("dest").parentNode.id.slice(4));
  let bomb;
  if (bmb) {
    bomb = parseInt(document.getElementById("bomb").parentNode.id.slice(4));
    let a, b;
    a = startDFS(src, bomb, speed, visited3);
    if (a[2][a[2].length - 1] === src) b = startDFS(bomb, dst, speed, visited1);
    setTimeout(() => pathcolor(a[2], speed * 2), 0);
    if (a[2][a[2].length - 1] === src)
      setTimeout(() => pathcolor(b[2], speed * 2), 0);
    let res;
    if (a[2][a[2].length - 1] === src) res = [a[0] + b[0], a[1] + b[1]];
    else return [a[0], 0];
    return res;
  }
  let ar = startDFS(src, dst, speed, visited1);
  setTimeout(() => pathcolor(ar[2], speed * 2), 0);
  return ar;
};

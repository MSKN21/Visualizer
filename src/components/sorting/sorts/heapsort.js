import { sleep, swap, gothrough, clearbar, compr, compr2 } from "./timingfuns";

function updat(i, j, allbars, speed) {
  console.log(i, " key ", j);
  allbars[i].style.height = j + "px";
  sleep(speed);
}
const bfrcolor = (i, j, allbars, speed) => {
  console.log(i, " ", j);
  allbars[i].style.backgroundColor = "rgb(255, 119, 119)";
  allbars[j].style.backgroundColor = "rgb(255, 119, 119)";
  sleep(speed);
};

const aftrcolor = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(130, 177, 253)";
  allbars[j].style.backgroundColor = "rgb(130, 177, 253)";
  sleep(speed + speed * 0.5);
};
const bfrcolor2 = (i, j, allbars, speed) => {
  console.log(i, " ", j);
  allbars[i].style.backgroundColor = "blue";
  allbars[j].style.backgroundColor = "blue";
  sleep(speed);
};

function update2(i, j, allbars, speed) {
  console.log(i, " ", j);
  let pr = speed;
  if (speed == 5) pr = 15;
  else if (speed == 8) pr = speed + speed * 1.5;
  else if (speed == 15) pr = speed + speed * 1;
  else if (speed == 25) pr = 30;
  else if (speed == 40) pr = speed + speed * 1;

  setTimeout(function () {
    bfrcolor(i, i, allbars, pr);
  }, 0);

  setTimeout(function () {
    updat(i, j, allbars, speed);
  }, 0);

  setTimeout(function () {
    aftrcolor(i, i, allbars, speed);
  }, 0);
  //   sleep(10);
}

function update1(i, j, allbars, speed) {
  console.log(i, " ", j);

  setTimeout(function () {
    bfrcolor2(i, i, allbars, speed);
  }, 0);

  setTimeout(function () {
    updat(i, j, allbars, speed);
  }, 0);

  //   sleep(10);
}

function waiting5(i, j, allbars, speed) {
  setTimeout(function () {
    update2(i, j, allbars, speed);
  }, 0);
  //   sleep(1);
}

function waiting(i, j, allbars, speed) {
  setTimeout(function () {
    update1(i, j, allbars, speed);
  }, 0);
  //   sleep(1);
}

function maxheap(vals, i, n, allbars, speed) {
  let largest;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l <= n - 1 && vals[l] > vals[i]) {
    largest = l;
  } else {
    largest = i;
  }
  if (r <= n - 1 && vals[r] > vals[largest]) {
    largest = r;
  }
  if (largest != i) {
    let temp = vals[i];
    vals[i] = vals[largest];
    vals[largest] = temp;
    maxheap(vals, largest, n);
  }
}

function buildheap(vals, n, allbars, speed) {
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    maxheap(vals, i, n, allbars, speed);
  }
}

function delmax(vals, n, allbars, speed) {
  if (n == 0) {
    console.log("error");
  }
  let max = vals[0];
  vals[0] = vals[n - 1];
  vals.pop();
  n--;
  maxheap(vals, 0, n, allbars, speed);
  return max;
}

const setspeed = (speed) => {
  if (speed == 150) speed = 100;
  else if (speed == 80) speed = 40;
  else if (speed == 50) speed = 25;
  else if (speed == 15) speed = 15;
  else if (speed == 10) speed = 8;
  else if (speed == 5) speed = 5;
  return speed;
};

export const heap = (speed) => {
  speed = setspeed(speed);
  let bars = document.getElementsByClassName("bars");
  console.log(bars);
  let allbars = [...bars];
  let vals = [];
  for (let i = 0; i < allbars.length; i++) {
    vals[i] = parseInt(allbars[i].style.height.replace("px", ""));
  }
  console.log(vals);
  let n = vals.length;
  let q = n;
  let b = [];

  buildheap(vals, n, allbars, speed);
  for (let j = 0; j < vals.length; j++) waiting5(j, vals[j], allbars, speed);
  console.log(vals);

  for (let i = q - 1; i >= 1; i--, n--) {
    b[i] = delmax(vals, n, allbars, speed);
    waiting(i, b[i], allbars, speed);
    for (let j = 0; j < vals.length; j++) waiting5(j, vals[j], allbars, speed);
    console.log(vals);
  }
  b[0] = vals[0];
  waiting5(0, b[0], allbars, speed);
  console.log(b);
  setTimeout(() => gothrough(allbars), 10);
  setTimeout(() => clearbar(allbars), 10);
};

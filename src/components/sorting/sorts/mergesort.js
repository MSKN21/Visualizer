import { sleep, gothrough, clearbar } from "./timingfuns";

const bfrcolor = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(255, 119, 119)";
  sleep(speed + speed * 0.5);
};

const aftrcolor = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(130, 177, 253)";
  sleep(speed + speed * 0.5);
};

function update(i, j, allbars, speed) {
  console.log(i, " key ", j);
  allbars[i].style.height = j + "px";
  let pr = 0.5;
  if (speed == 5) pr = 2;
  sleep(speed + speed * pr);
}

function update1(i, j, allbars, speed) {
  console.log(i, " ", j);

  setTimeout(function () {
    bfrcolor(i, j, allbars, speed);
  }, 0);

  setTimeout(function () {
    update(i, j, allbars, speed);
  }, 0);

  setTimeout(function () {
    aftrcolor(i, j, allbars, speed);
  }, 0);
  // sleep(10);
}

function waiting2(i, j, allbars, speed) {
  setTimeout(function () {
    update1(i, j, allbars, speed);
  }, 0);
  // sleep(10);
}
const setclr2 = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "lightgreen";
  allbars[j].style.backgroundColor = "lightgreen";
  sleep(speed);
};

export const gothrough2 = (i, j, allbars, speed) => {
  setTimeout(() => setclr2(i, j, allbars, speed), 0);
};

function waiting(i, j, allbars, speed) {
  setTimeout(function () {
    gothrough2(i, j, allbars, speed);
  }, 0);
  // sleep(10);
}

let speed2 = 25;

function merging(vals, l, m, r, allbars, speed) {
  console.log("hi");
  console.log(vals);
  let n1 = parseInt(m) - parseInt(l) + 1;
  let n2 = parseInt(r) - parseInt(m);
  // if (n1 == 1 && n2 == 1) {
  //   return;
  // }
  console.log(n1, " ", n2);
  // Create temp arrays
  let L = [],
    R = [];

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) {
    console.log("hi1");

    L[i] = vals[parseInt(l) + i];
  }
  for (let j = 0; j < n2; j++) {
    console.log("hi2");

    R[j] = vals[parseInt(m) + 1 + j];
  }

  for (let j = 0, i = 0; j < n2 || i < n1; j++, i++) {
    if (j >= n2) j--;
    let x = parseInt(l) + i;
    let y = parseInt(m) + 1 + j;
    waiting(x, y, allbars, speed2);
  }
  console.log(n1, "  ", L);
  console.log(n2, "  ", R);
  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = parseInt(l);

  while (i < n1 && j < n2) {
    console.log("hi3");

    if (L[i] <= R[j]) {
      vals[k] = L[i];
      i++;
      waiting2(k, L[i - 1], allbars, speed);
    } else {
      vals[k] = R[j];
      j++;
      waiting2(k, R[j - 1], allbars, speed);
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    console.log("hi4");

    vals[k] = L[i];
    i++;
    k++;
    waiting2(k - 1, L[i - 1], allbars, speed);
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    console.log("hi5");

    vals[k] = R[j];
    j++;
    k++;
    waiting2(k - 1, R[j - 1], allbars, speed);
  }
  console.log(vals);
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergesort(vals, l, r, allbars, speed) {
  if (parseInt(l) >= parseInt(r)) {
    return;
  }
  let m = parseInt(l) + (parseInt(r) - parseInt(l)) / 2;
  mergesort(vals, parseInt(l), m, allbars, speed);
  mergesort(vals, m + 1, parseInt(r), allbars, speed);
  merging(vals, parseInt(l), m, parseInt(r), allbars, speed);
}
const go1 = (allbars) => {
  setTimeout(() => gothrough(allbars), 20);
};

const go2 = (allbars) => {
  setTimeout(() => clearbar(allbars), 20);
};

export const merge = (speed) => {
  if (speed == 15) speed2 = 50;
  else if (speed == 50) speed2 = 80;
  else if (speed > 50) speed2 = 120;
  else speed2 = 25;
  let bars = document.getElementsByClassName("bars");
  console.log(bars);
  let allbars = [...bars];
  let vals = [];
  for (let i = 0; i < allbars.length; i++) {
    vals[i] = parseInt(allbars[i].style.height.replace("px", ""));
  }
  console.log(vals);
  let n = vals.length;
  mergesort(vals, 0, n - 1, allbars, speed);
  console.log(vals);
  setTimeout(() => go1(allbars), 0);
  setTimeout(() => go2(allbars), 0);
};

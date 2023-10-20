import { sleep, gothrough, clearbar, compr, compr2 } from "./timingfuns";

const clrit = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "blue";
  allbars[j].style.backgroundColor = "blue";
  sleep(speed);
};

const clrmin = (i, j, allbars, speed) => {
  setTimeout(() => clrit(i, j, allbars, speed), 0);
};

function waiting(i, j, allbars, speed) {
  setTimeout(function () {
    clrmin(i, j, allbars, speed);
  }, 0);
  // sleep(10);
}

const bfrcolor2 = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "blue";
  allbars[j].style.backgroundColor = "blue";
  sleep(speed * 3);
};

const change2 = (i, j, allbars, speed) => {
  let a = allbars[i].style.height;
  allbars[i].style.height = allbars[j].style.height;
  allbars[j].style.height = a;
  sleep(speed);
};

// const aftrcolor = (i, j, allbars, speed) => {
//   allbars[i].style.backgroundColor = "rgb(130, 177, 253)";
//   allbars[j].style.backgroundColor = "rgb(130, 177, 253)";
//   sleep(speed);
// };

export const swap2 = (i, j, allbars, speed) => {
  //   console.log(i, " ", j);

  setTimeout(() => bfrcolor2(i, j, allbars, speed), 0);

  setTimeout(() => change2(i, j, allbars, speed), 0);

  // setTimeout(() => aftrcolor(i, j, allbars, speed), 0);
};

function waiting3(i, j, allbars, speed) {
  setTimeout(function () {
    swap2(i, j, allbars, speed);
  }, 0);
  //   sleep(10);
}

const bfrcolor = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(255, 119, 119)";
  allbars[j].style.backgroundColor = "rgb(255, 119, 119)";
  let pr = 0.4;
  if (speed == 10) pr = 2;
  else if (speed == 15) pr = 3;
  else if (speed == 50) pr = 4;
  sleep(speed + speed * pr);
};

const change = (i, j, allbars, speed) => {
  let a = allbars[i].style.height;
  allbars[i].style.height = allbars[j].style.height;
  allbars[j].style.height = a;
  sleep(speed);
};

const aftrcolor = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(130, 177, 253)";
  allbars[j].style.backgroundColor = "rgb(130, 177, 253)";
  sleep(speed);
};

export const swap = (i, j, allbars, speed) => {
  //   console.log(i, " ", j);
  setTimeout(() => bfrcolor(i, j, allbars, speed), 0);

  setTimeout(() => change(i, j, allbars, speed), 0);

  setTimeout(() => aftrcolor(i, j, allbars, speed), 0);
};

function waiting2(i, j, allbars, speed) {
  setTimeout(function () {
    swap(i, j, allbars, speed);
  }, 0);
  //   sleep(10);
}

function partition(low, high, vals, allbars, speed) {
  let pivot = vals[high]; // pivot
  let i = low - 1; // Index of smaller element and indicates the right position of pivot found so far
  // waiting(low, high, allbars, speed);
  for (let j = low; j <= high - 1; j++) {
    if (vals[j] < pivot) {
      i++;
      let b = vals[i];
      vals[i] = vals[j];
      vals[j] = b;
      waiting2(i, j, allbars, speed);
      console.log(i, " ", j);
    }
  }
  let d = vals[i + 1];
  vals[i + 1] = vals[high];
  vals[high] = d;
  waiting3(i + 1, high, allbars, speed);
  return i + 1;
}

function quickSort(low, high, vals, allbars, speed) {
  if (low < high) {
    let pi = partition(low, high, vals, allbars, speed);
    quickSort(low, pi - 1, vals, allbars, speed);
    quickSort(pi + 1, high, vals, allbars, speed);
  }
  console.log(vals);
}

export const quick = (speed) => {
  let bars = document.getElementsByClassName("bars");
  console.log(bars);
  let allbars = [...bars];
  let vals = [];
  for (let i = 0; i < allbars.length; i++) {
    vals[i] = parseInt(allbars[i].style.height.replace("px", ""));
  }
  console.log(vals);
  let n = vals.length;
  quickSort(0, n - 1, vals, allbars, speed + 20);
  console.log(vals);
  setTimeout(function () {
    gothrough(allbars);
  }, 10);
  setTimeout(function () {
    clearbar(allbars);
  }, 10);
};

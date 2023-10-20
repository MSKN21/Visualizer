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
  let pr = 0.5;
  if (speed == 5) pr = 2;
  sleep(speed + speed * pr);
  sleep(speed + speed * pr);
};

const aftrcolor = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(130, 177, 253)";
  allbars[j].style.backgroundColor = "rgb(130, 177, 253)";
  sleep(speed + speed * 0.5);
};
function update2(i, j, allbars, speed) {
  console.log(i, " ", j);

  setTimeout(function () {
    bfrcolor(i, i, allbars, speed);
  }, 0);

  setTimeout(function () {
    updat(i, j, allbars, speed);
  }, 0);

  setTimeout(function () {
    aftrcolor(i, i, allbars, speed);
  }, 0);
  //   sleep(10);
}

function waiting5(i, j, allbars, speed) {
  setTimeout(function () {
    update2(i, j, allbars, speed);
  }, 0);
  //   sleep(1);
}
let speed2 = 20;
const setclr2 = (i, j, k, allbars, speed) => {
  allbars[i].style.backgroundColor = "lightgreen";
  allbars[j].style.backgroundColor = "lightgreen";
  allbars[k].style.backgroundColor = "lightgreen";
  sleep(speed);
};

const bacclr2 = (i, j, k, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(130, 177, 253)";
  allbars[j].style.backgroundColor = "rgb(130, 177, 253)";
  allbars[k].style.backgroundColor = "rgb(130, 177, 253)";
  sleep(speed / 2);
};

export const gothrough2 = (i, j, k, allbars, speed) => {
  setTimeout(() => setclr2(i, j, k, allbars, speed), 0);
  setTimeout(() => bacclr2(i, j, k, allbars, speed), 0);
};

function waiting(i, j, k, allbars, speed) {
  setTimeout(function () {
    gothrough2(i, j, k, allbars, speed);
  }, 0);
  // sleep(10);
}

function getMax(vals, n) {
  let mx = vals[0];
  for (let i = 1; i < parseInt(n); i++) if (vals[i] > mx) mx = vals[i];
  return mx;
}

function countSort(vals, n, exp, allbars, speed) {
  let output = []; // output valsay
  let i,
    count = [];
  for (let j = 0; j < 10; j++) {
    count[j] = 0;
  }

  for (i = 0; i < parseInt(n); i++) {
    let num = vals[i] / parseInt(exp);
    let num2 = Math.floor(num);
    count[num2 % 10]++;
  }

  for (i = 1; i < 10; i++) count[i] += count[i - 1];

  for (i = parseInt(n) - 1; i >= 0; i--) {
    let num = vals[i] / parseInt(exp);
    let num2 = Math.floor(num);
    output[count[num2 % 10] - 1] = vals[i];
    count[num2 % 10]--;
  }
  for (i = 0; i < n - 2; i++) {
    waiting(i, i + 1, i + 2, allbars, speed2);
  }
  for (i = 0; i < n; i++) {
    vals[i] = output[i];
    waiting5(i, output[i], allbars, speed);
  }
  console.log(vals);
}

function radixsort(vals, n, allbars, speed) {
  let m = parseInt(getMax(vals, parseInt(n)));

  for (let exp = 1; Math.floor(parseInt(m / exp)) > 0; exp *= 10) {
    countSort(vals, parseInt(n), exp, allbars, speed);
  }
}

export const radix = (speed) => {
  if (speed == 15) speed2 = 50;
  else if (speed == 50) speed2 = 50;
  else if (speed > 50) speed2 = 120;
  else speed2 = 20;
  let bars = document.getElementsByClassName("bars");
  console.log(bars);
  let allbars = [...bars];
  let vals = [];
  for (let i = 0; i < allbars.length; i++) {
    vals[i] = parseInt(allbars[i].style.height.replace("px", ""));
  }
  console.log(vals);
  let n = vals.length;
  radixsort(vals, n, allbars, speed);
  console.log(vals);
  setTimeout(() => gothrough(allbars), 10);
  setTimeout(() => clearbar(allbars), 10);
};

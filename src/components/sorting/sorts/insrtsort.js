import { sleep, swap, gothrough, clearbar, compr, compr2 } from "./timingfuns";

const clrit = (i, allbars, speed) => {
  allbars[i].style.backgroundColor = "red";
  sleep(speed);
};

const clrmin = (i, allbars, speed) => {
  setTimeout(() => clrit(i, allbars, speed), 0);
};

function waiting3(i, allbars, speed) {
  setTimeout(function () {
    clrmin(i, allbars, speed);
  }, 0);
  // sleep(10);
}

const clrit2 = (i, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(130, 177, 253)";
  sleep(speed);
};

const clrmin2 = (i, allbars, speed) => {
  setTimeout(() => clrit2(i, allbars, speed), 0);
};

function waiting4(i, allbars, speed) {
  setTimeout(function () {
    clrmin2(i, allbars, speed);
  }, 0);
  // sleep(10);
}

const bfrcolor = (i, j, allbars, speed) => {
  console.log(i, " ", j);
  allbars[i].style.backgroundColor = "rgb(255, 119, 119)";
  allbars[j].style.backgroundColor = "rgb(255, 119, 119)";
  let pr = 0.8;
  if (speed == 10) pr = 3;
  else if (speed == 5) pr = 3;
  // else if (speed == 50) pr = 4;
  sleep(speed + speed * pr);
};

const aftrcolor = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(130, 177, 253)";
  allbars[j].style.backgroundColor = "rgb(130, 177, 253)";
  sleep(speed);
};

function pushback(i, j, allbars, speed) {
  console.log(i, " ", j);
  allbars[i].style.height = allbars[j].style.height;
  sleep(speed);
}

function pushback1(i, j, allbars, speed) {
  console.log(i, " ", j);

  setTimeout(function () {
    bfrcolor(i, j, allbars, speed);
  }, 0);

  setTimeout(function () {
    pushback(i, j, allbars, speed);
  }, 0);

  setTimeout(function () {
    aftrcolor(i, j, allbars, speed);
  }, 0);
  // sleep(10);
}

function update(i, j, allbars, speed) {
  console.log(i, " key ", j);
  allbars[i].style.height = j + "px";
  sleep(speed);
}

function update1(i, j, allbars, speed) {
  console.log(i, " ", j);

  setTimeout(function () {
    bfrcolor(i, i, allbars, speed);
  }, 0);

  setTimeout(function () {
    update(i, j, allbars, speed);
  }, 0);

  setTimeout(function () {
    aftrcolor(i, i, allbars, speed);
  }, 0);
  // sleep(10);
}

function waiting1(i, j, allbars, speed) {
  setTimeout(function () {
    pushback1(i, j, allbars, speed);
  }, 0);
  // sleep(10);
}

function waiting2(i, j, allbars, speed) {
  setTimeout(function () {
    update1(i, j, allbars, speed);
  }, 0);
  // sleep(10);
}
const go1 = (allbars) => {
  setTimeout(() => gothrough(allbars), 20);
};

const go2 = (allbars) => {
  setTimeout(() => clearbar(allbars), 20);
};
function printarray(arr) {
  console.log(arr);
}
export const insertionsort = (speed) => {
  let bars = document.getElementsByClassName("bars");
  console.log(bars);
  let allbars = [...bars];

  let vals = [];
  for (let i = 0; i < allbars.length; i++) {
    vals[i] = parseInt(allbars[i].style.height.replace("px", ""));
  }
  console.log(vals);
  let n = vals.length;

  let i, key, j;
  for (i = 1; i < n; i++) {
    key = vals[i];
    j = i - 1;

    /* Move elements of vals[0..i-1], that are
      greater than key, to one position ahead
      of their current position */
    while (j >= 0 && vals[j] > key) {
      vals[j + 1] = vals[j];
      j = j - 1;
      console.log(j + 2, " ", j + 1);
      waiting1(j + 2, j + 1, allbars, speed);
      printarray(vals);
    }
    vals[j + 1] = key;
    console.log(j + 1, " key ", key);
    waiting2(j + 1, key, allbars, speed);
    printarray(vals);
  }
  setTimeout(() => go1(allbars), 10);
  setTimeout(() => go2(allbars), 10);
};

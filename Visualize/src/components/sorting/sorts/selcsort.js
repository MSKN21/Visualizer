import { sleep, swap, gothrough, clearbar, compr, compr2 } from "./timingfuns";

const clrit = (i, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(255, 119, 119)";
  sleep(speed);
};

const clrmin = (i, allbars, speed) => {
  setTimeout(() => clrit(i, allbars, speed), 0);
};

function waiting(i, j, allbars, speed) {
  setTimeout(function () {
    swap(i, j, allbars, speed);
  }, 0);
  // sleep(10);
}

function waiting1(i, j, allbars, speed) {
  setTimeout(function () {
    compr(i, j, allbars, speed);
  }, 0);
}

function waiting2(i, j, allbars, speed) {
  setTimeout(function () {
    compr2(i, j, allbars, speed);
  }, 0);
}

function waiting3(i, allbars, speed) {
  setTimeout(function () {
    clrmin(i, allbars, speed);
  }, 0);
  // sleep(10);
}

const setspeed = (speed) => {
  if (speed == 150) speed = 100;
  else if (speed == 80) speed = 40;
  else if (speed == 50) speed = 25;
  else if (speed == 15) speed = 15;
  else if (speed == 10) speed = 10;
  else if (speed == 5) speed = 10;
  return speed;
};

export const selectionsort = (speed) => {
  let speed2 = setspeed(speed);
  let bars = document.getElementsByClassName("bars");
  // console.log(bars);
  let allbars = [...bars];
  let vals = [];
  for (let i = 0; i < allbars.length; i++) {
    vals[i] = parseInt(allbars[i].style.height.replace("px", ""));
  }
  // console.log(vals);
  let n = vals.length;
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    let min = i;
    for (let j = i + 1; j < n; j++) {
      waiting1(min, j, allbars, speed2);
      if (speed == 5) waiting2(min, j, allbars, speed2 / 2);
      else waiting2(min, j, allbars, speed2);
      if (vals[j] < vals[min]) {
        min = j;
      }
      waiting1(min, j, allbars, speed2);
      if (speed == 5) waiting2(min, j, allbars, speed2);
      else waiting2(min, j, allbars, speed2 / 2);
    }

    // Swap the found minimum element with the first element
    if (min != i) {
      let b = vals[min];
      vals[min] = vals[i];
      vals[i] = b;
      console.log(min, " ", i);
      waiting(min, i, allbars, speed);
    }
    waiting3(i, allbars, speed);
  }
  setTimeout(() => gothrough(allbars), 10);
  setTimeout(() => clearbar(allbars), 10);
};

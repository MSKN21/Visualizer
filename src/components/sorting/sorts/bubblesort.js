import { sleep, gothrough, clearbar, compr, compr2 } from "./timingfuns";

const bfrcolor = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(255, 119, 119)";
  allbars[j].style.backgroundColor = "rgb(255, 119, 119)";

  sleep(speed + speed * 0.4);
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

const bfrcolor2 = (i, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(80, 1, 207)";
  sleep(speed);
};

function update1(i, allbars, speed) {
  setTimeout(function () {
    bfrcolor2(i, allbars, speed);
  }, 0);

  //   sleep(10);
}

function waiting(i, allbars, speed) {
  setTimeout(function () {
    update1(i, allbars, speed);
  }, 0);
  //   sleep(1);
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

export const bubblesort = (speed) => {
  speed = setspeed(speed);
  let bars = document.getElementsByClassName("bars");
  // console.log(bars);
  let allbars = [...bars];
  let vals = [];
  for (let i = 0; i < allbars.length; i++) {
    vals[i] = parseInt(allbars[i].style.height.replace("px", ""));
  }
  // console.log(vals);
  let n = vals.length;
  for (let i = 0; i < n - 1; ++i) {
    let x;
    for (let j = 0; j < n - i - 1; ++j) {
      x = j;
      setTimeout(() => compr(j, j + 1, allbars, speed * 1.4), 0);

      if (vals[j] > vals[j + 1]) {
        let b = vals[j];
        vals[j] = vals[j + 1];
        vals[j + 1] = b;

        setTimeout(() => swap(j, j + 1, allbars, speed), 0);
      }
      setTimeout(() => compr2(j, j + 1, allbars, speed), 0);
    }
    setTimeout(function () {
      update1(x + 1, allbars, speed);
    }, 0);
  }
  // console.log(vals);
  setTimeout(() => gothrough(allbars), 10);
  setTimeout(() => clearbar(allbars), 10);
};

export const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

//functions for swap operation

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

//functions for sorted coloring

const setclr = (i, allbars) => {
  allbars[i].style.backgroundColor = "red";
  sleep(20);
};

export const gothrough = (allbars) => {
  for (let i = 0; i < allbars.length; i++) {
    setTimeout(() => setclr(i, allbars), 10);
  }
};

//functions for sorted clearing

const setclr2 = (i, allbars) => {
  allbars[i].style.backgroundColor = "rgb(130, 177, 253)";
};

export const clearbar = (allbars) => {
  for (let i = 0; i < allbars.length; i++) {
    setTimeout(() => setclr2(i, allbars), 10);
  }
};

//functions for comparing green

const cmpclr = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(201, 255, 76)";
  allbars[j].style.backgroundColor = "rgb(201, 255, 76)";
  sleep(speed);
};

export const compr = (i, j, allbars, speed) => {
  //   console.log(i, " ", j);
  setTimeout(() => cmpclr(i, j, allbars, speed), 0);
};

//functions for comparing green to normal

const cmpclr2 = (i, j, allbars, speed) => {
  allbars[i].style.backgroundColor = "rgb(130, 177, 253)";
  allbars[j].style.backgroundColor = "rgb(130, 177, 253)";
  sleep(speed);
};

export const compr2 = (i, j, allbars, speed) => {
  //   console.log(i, " ", j);
  setTimeout(() => cmpclr2(i, j, allbars, speed), 0);
};

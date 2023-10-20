import { activateit } from "./clearfuncs";
import { shuffle } from "./mazes/dfsmaze";
const wallnodeclr = "rgb(84, 55, 90)";
const normalnodeclr = "white";
const normalborderclr = "rgba(255, 201, 255, 0.411)";

export const wallnodefunc = (e) => {
  console.log(e.target);
  let x;
  if (e.target.className == "nodes") x = e.target;
  else if (e.target.parentNode.className == "nodes") x = e.target.parentNode;
  else if (e.target.parentNode.parentNode.className == "nodes")
    x = e.target.parentNode.parentNode;
  else if (e.target.parentNode.parentNode.parentNode.className == "nodes")
    x = e.target.parentNode.parentNode.parentNode;
  console.log(x.children.length);
  if (x.children.length == 0) {
    if (x.style.backgroundColor === normalnodeclr) {
      x.style.backgroundColor = wallnodeclr;
      x.style.borderColor = wallnodeclr;
      x.style.animation = "popup 250ms ease-out";
      setTimeout(() => activateit(0, x), 0);
    } else {
      x.style.backgroundColor = normalnodeclr;
      x.style.borderColor = normalborderclr;
    }
  }
};

let b = `<div draggable="true" class="middle" id="bomb">
<i class="fa fa-bomb"></i>
</div>`;

export const addbomb = () => {
  let rand = [];
  let nodes = document.getElementsByClassName("nodes");
  let allnodes = [...nodes];
  for (let i = 0; i <= 2058; i++) {
    if (
      allnodes[i].children.length === 0 &&
      allnodes[i].style.backgroundColor === normalnodeclr
    ) {
      rand.push(i);
    }
  }
  for (let i = 0; i < 5; i++) rand = shuffle(rand);
  let ind = rand[0];
  let x = allnodes[ind];
  let a = new DOMParser();
  let y = a.parseFromString(b, "text/html");
  console.log(y.body.firstChild);
  x.style.backgroundColor = normalnodeclr;
  x.style.borderColor = normalborderclr;
  x.append(y.body.firstChild);
  x.style.animation = "popup 250ms ease-out";
  bmbinit();
  setTimeout(() => activateit(0, x), 0);
};

export const rmbomb = () => {
  let divs = document.getElementById("bomb");
  divs.parentNode.removeChild(divs.parentNode.firstElementChild);
};

let w = `<div class="weight">
      <i class="fas fa-weight-hanging"></i>
    </div>`;

export const addweight = (e) => {
  console.log(e.target);
  let x;
  if (e.target.className == "nodes") x = e.target;
  else if (e.target.parentNode.className == "nodes") x = e.target.parentNode;
  else if (e.target.parentNode.parentNode.className == "nodes")
    x = e.target.parentNode.parentNode;
  else if (e.target.parentNode.parentNode.parentNode.className == "nodes")
    x = e.target.parentNode.parentNode.parentNode;
  console.log(x);
  if (x.children.length == 0) {
    let a = new DOMParser();
    let y = a.parseFromString(w, "text/html");
    console.log(y.body.firstChild);
    x.style.backgroundColor = normalnodeclr;
    x.style.borderColor = normalborderclr;
    x.append(y.body.firstChild);
    x.style.animation = "popup 250ms ease-out";
    setTimeout(() => activateit(0, x), 0);
  } else if (x.children.length == 1 && x.children[0].className === "weight") {
    x.children[0].remove();
  }
};

export const removeweights = () => {
  let divs = document.getElementsByClassName("weight");
  let alldivs = [...divs];
  for (let e of alldivs) {
    e.parentNode.removeChild(e.parentNode.firstElementChild);
  }
};

let src, empties, dest, bmb, x;

export const initialize = () => {
  src = document.querySelector("#source");
  console.log(src);
  dest = document.querySelector("#dest");

  empties = document.querySelectorAll(".nodes");
  src.addEventListener("dragstart", dragStart);
  src.addEventListener("dragend", dragEnd);
  dest.addEventListener("dragstart", dragStart2);
  dest.addEventListener("dragend", dragEnd2);
  for (const empty of empties) {
    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("dragenter", dragEnter);
    empty.addEventListener("dragleave", dragLeave);
    empty.addEventListener("drop", dragDrop);
  }
};

export const bmbinit = () => {
  bmb = document.querySelector("#bomb");
  bmb.addEventListener("dragstart", dragStart3);
  bmb.addEventListener("dragend", dragEnd3);
};

function dragStart() {
  x = 1;
  console.log(src);
}

function dragStart2() {
  x = 2;
}

function dragStart3() {
  x = 3;
}

function dragEnd() {
  this.id = "source";
}

function dragEnd2() {
  this.id = "dest";
}

function dragEnd3() {
  this.id = "bomb";
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  // this.className += " hovered";
}

function dragLeave() {
  this.className = "nodes";
}

function dragDrop() {
  let str = this.children.length;
  console.log(this.children.length);
  this.className = "nodes";
  this.style.backgroundColor = normalnodeclr;
  this.style.borderColor = normalborderclr;
  if (str == 1 && this.children[0].className === "weight") {
    console.log("yes");
    this.children[0].remove();
    if (x == 1) {
      this.append(src);
      this.style.animation = "popup 250ms ease-out";
      setTimeout(() => activateit(0, this), 0);
    } else if (x == 2) {
      this.append(dest);
      this.style.animation = "popup 250ms ease-out";
      setTimeout(() => activateit(0, this), 0);
    } else if (x == 3) {
      this.append(bmb);
      this.style.animation = "popup 250ms ease-out";
      setTimeout(() => activateit(0, this), 0);
    }
  } else if (str == 0) {
    console.log(x);
    if (x == 1) {
      this.append(src);
      this.style.animation = "popup 250ms ease-out";
      setTimeout(() => activateit(0, this), 0);
    } else if (x == 2) {
      this.append(dest);
      this.style.animation = "popup 250ms ease-out";
      setTimeout(() => activateit(0, this), 0);
    } else if (x == 3) {
      this.append(bmb);
      this.style.animation = "popup 250ms ease-out";
      setTimeout(() => activateit(0, this), 0);
    }
  }
  x = 0;
  console.log(this.children.length);
}

export const getcoord = (x) => {
  let val = 0;
  let arr = new Array(2);
  for (let i = 0; i < 29; i++) {
    for (let j = 0; j < 71; j++) {
      val++;
      if (val == x) {
        arr[0] = i;
        arr[1] = j;
        return arr;
      }
    }
  }
};

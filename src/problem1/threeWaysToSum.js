var n = 5;

var sum_to_n_a = (n) => {
  var arrayNums = [];
  var totalCal = 1;
  arrayNums.push(n);
  var sum = 0;
  for (let i = 0; i < arrayNums.length; i++) {
    if (arrayNums.length) {
      totalCal = arrayNums[i] - 1;
      if (totalCal == 0) {
        break;
      }
      arrayNums.push(totalCal);
    }
  }

  for (let e = 0; e < arrayNums.length; e++) {
    sum += arrayNums[e];
  }

  //   console.log(sum);
};

sum_to_n_a(n);

var sum_to_n_b = (n) => {
  var result = 1;
  result = (n * (n + 1)) / 2;
  //   console.log(result);
  return result;
};

sum_to_n_b(n);

var sum_to_n_c = (n) => {
  if (n <= 1) return n;
  var result = 0;
  result = n + sum_to_n_c(n - 1);
  console.log(result);
  return result;
};

sum_to_n_c(n);

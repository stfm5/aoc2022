import readInput from "../input.helper";
const runSample = false; 
type Input = any;

const parseData = (): Input => {
    console.time("parseData")
    const input = readInput(8, runSample).split("\n").map((line) => line.split("").map(tree => parseInt(tree)));
    console.log(input);
    console.timeEnd("parseData")
    return input;
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let visible = (input.length * 2) + ((input.length - 2) * 2);
  for(let i = 1; i < input.length-1; i++) {
    for(let j = 1; j < input.length-1; j++) {
      let tree = input[i][j]

      if(checkDown(input, i, j, tree)[0]) {
        visible++
        continue;
      }
      if(checkUp(input, i, j, tree)[0]) {
        visible++
        continue;
      }
      if(checkLeft(input, i, j, tree)[0]) {
        visible++
        continue;
      }
      if(checkRight(input, i, j, tree)[0]) {
        visible++
        continue;
      }
    }
  } 
	console.timeEnd("sol1")
	return visible 
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let largest = Number.MIN_SAFE_INTEGER;
  for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input.length; j++) {
      let tree = input[i][j]
      let val = 1; 

      val *= checkDown(input, i, j, tree)[1]
      val *= checkUp(input, i, j, tree)[1]
      val *= checkLeft(input, i, j, tree)[1]
      val *= checkRight(input, i, j, tree)[1]

      if(val > largest) {
        largest = val
      }
    }
  } 
	console.timeEnd("sol2")
	return largest;
}

const checkRight = (input: any, i, j, tree): [boolean, number] => {
  let isVisible = true;
  let m = 1;
  while(i+m < input.length) {
    if(input[i+m][j] >= tree) {
      isVisible = false
      m++;
      break;
    }
    m++;
  }
  m--;
  return [isVisible,m];
}
const checkLeft = (input: any, i, j, tree): [boolean, number] => {
  let isVisible = true;
  let m = -1;
  while(i+m >= 0) {
    if(input[i+m][j] >= tree) {
      isVisible = false
      m--;
      break;
    }
    m--;
  }
  m++;
  return [isVisible,Math.abs(m)];


}
const checkDown = (input: any, i, j, tree): [boolean, number] => {
  let isVisible = true
  let m = 1
  while(j+m < input.length) {
    if(input[i][j+m] >= tree) {
      isVisible = false;
      m++;
      break;
    }
    m++;
  }
  m--;
  return [isVisible,m];
}

const checkUp = (input: any, i, j, tree): [boolean, number] => {
  let isVisible = true;
  let m = -1
  while(j+m >= 0) {
    if(input[i][j+m] >= tree) {
      isVisible = false;
      m--
      break;
    }
    m--;
  }
  m++;
  return [isVisible,Math.abs(m)]
}

const input = parseData();
console.log(`Solution 1: ${sol1(input)}`);
console.log(`Solution 2: ${sol2(input)}`);
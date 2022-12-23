import readInput from "../input.helper";
const runSample = false; 
type Input = any;

type Elves = {
  [key: string]: boolean;
}

const MOVES = [
  //N,NE,NW
  [[-1,0],[-1,1],[-1,-1]],
  //S, SE, SW
  [[1,0],[1,1],[1,-1]],
  //W, NW, SW
  [[0,-1],[-1,-1],[1,-1]],
  //E
  [[0,1],[-1,1],[1,1]],
]

const DIRS = { 
  0: [-1,0],
  1: [1,0],
  2: [0,-1],
  3: [0,1],
}
let CUR_DIR = 0;

const parseData = (): Input => {
  console.time("parseData")
  const lines = readInput(23,runSample).split("\n")
  const elves: Elves = {};
  lines.forEach(( line, i ) => {
    line.split("").forEach((pos, j) => {
      if(pos === "#") {
        elves[`${i},${j}`] = true;
      }
    })
  })
  console.timeEnd("parseData")
  return elves
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let i = 0
  while(true) {
    i++;
    const elves = Object.keys(input);
    const newElves = {} 
    let hasMoved = false
    for(let j = 0; j < elves.length;j++) {
      const elf = elves[j];
      const dir = getDir(elf,input)
      if(hasNeighbours(elf, input) || typeof dir === 'undefined') {
        continue;
      };
      const mod = DIRS[dir];
      let parsedElf = elf.split(",").map((c) => parseInt(c));
      let newPos = [parsedElf[0]+mod[0],parsedElf[1]+mod[1]].toString()
      newElves[elf] = newPos
    }

    let newElvesK = Object.keys(newElves);
    let newElvesV = Object.values(newElves);

    newElvesK.forEach((key) => {
      let val = newElves[key];
      let numTimes = newElvesV.filter((v) => v === val);
      if(numTimes.length === 1) {
        hasMoved = true;
        delete input[key];
        input[val] = true;
      }
    })
    if(!hasMoved) {
      break;
    }
    CUR_DIR = (CUR_DIR+1)
  } 
  console.log(i);
  let minX = Number.MAX_SAFE_INTEGER
  let minY = Number.MAX_SAFE_INTEGER
  let maxX = Number.MIN_SAFE_INTEGER
  let maxY = Number.MIN_SAFE_INTEGER
  Object.keys(input).forEach((k) => {
    let [x,y] = k.split(",").map((c) => parseInt(c))
    if(x > maxX) {
      maxX = x
    } else if(x < minX) {
      minX = x
    }
    if(y > maxY) {
      maxY = y
    } else if(y < minY) {
      minY= y
    }
  })
  let sizeX = Math.abs(maxX - minX) + 1;
  let sizeY = Math.abs(maxY - minY) + 1;
	console.timeEnd("sol1")
	return (sizeX * sizeY) - Object.keys(input).length
}

const hasNeighbours = (elf: string, input: Elves) => {
  let [x,y] = elf.split(",").map((c) => parseInt(c));
  let xM = [-1,1,0,-1,1,0,-1,1]
  let yM = [0,0,1,1,1,-1,-1,-1]
  let isAlone = true;
  for(let i = 0; i < xM.length;i++) {
    let neigh = [x+ xM[i], y + yM[i]];
    if(input[neigh.toString()]) {
      isAlone = false
      break;
    }
  }
  return isAlone
}

const getDir = (elf: string, input: Elves) => {
  let pos = elf.split(",").map((c) => parseInt(c))
  let dir;

  for(let i = 0; i < 4; i++) {
    let index = (CUR_DIR + i) % 4;
    let found = true;
    for(let j = 0; j < 3; j++) {
      let mod = MOVES[index][j];
      let k = [pos[0]+mod[0],pos[1]+ mod[1]]
      if(input[k.toString()]) {
        found = false;
        break;
      }
    }
    if(found) {
      dir = index;
      break;
    }
  }
  return dir;
}
const drawBoard = (input) => {
  let minX = Number.MAX_SAFE_INTEGER
  let minY = Number.MAX_SAFE_INTEGER
  let maxX = Number.MIN_SAFE_INTEGER
  let maxY = Number.MIN_SAFE_INTEGER
  Object.keys(input).forEach((k) => {
    let [x,y] = k.split(",").map((c) => parseInt(c))
    if(x > maxX) {
      maxX = x
    } else if(x < minX) {
      minX = x
    }
    if(y > maxY) {
      maxY = y
    } else if(y < minY) {
      minY= y
    }
  })
  for(let i = minX; i <= maxX; i++) {
    let string =''
    for(let j = minY; j <= maxY; j++) {
      if(input[`${i},${j}`]) {
        string += '#'
        continue
      } 
      string += '.'
    }
    console.log(string)
  }
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
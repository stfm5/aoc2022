import readInput from "../input.helper";
const runSample = false; 
type Input = Command[];
type Command = [string, number]
type Coordinate = [number, number]

const parseData = (): Input => {
    console.time("parseData")
    const input = readInput(9,runSample).split("\n").map((l) => {
      let arr: any = l.split(" ");
      arr[1] = parseInt(arr[1])
      return arr;
    })
    console.timeEnd("parseData")
    return input;
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let h: Coordinate = [0,0];
  let t: Coordinate = [0,0];
  const positions = [t];
  input.forEach((cmd) => {
    for(let i = 0; i < cmd[1]; i++) {
      if(cmd[0] === 'L') {
        h[0]--;
      }
      if(cmd[0] === 'R') {
        h[0]++;
      }
      if(cmd[0] === 'U') {
        h[1]--;
      }
      if(cmd[0] === 'D')  {
        h[1]++;
      }
      let isN = areNeighbours(h, t);
      if(!isN) {
        t = moveTail(h, t);
        let hasVisited = positions.find((arr) => {
          if((arr[0] === t[0]) && (arr[1] === t[1])) {
            return true;
          }
        })
        if(!hasVisited) {
          positions.push(t)
        }
      }
    }
  })
	console.timeEnd("sol1")
	return positions.length
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let h = 0
  let t = 1
  let rope: Coordinate[] = []
  for(let i = 0;i<10; i++) {
    rope.push([0,0])
  }
  const positions = [[0,0]];
  input.forEach((cmd) => {
    let hasMoved = false;
    for(let i = 0; i < cmd[1]; i++) {
      h = 0;
      t = 1;
      if(cmd[0] === 'L') {
        rope[h][0]--;
      }
      if(cmd[0] === 'R') {
        rope[h][0]++;
      }
      if(cmd[0] === 'U') {
        rope[h][1]--;
      }
      if(cmd[0] === 'D')  {
        rope[h][1]++;
      }
      hasMoved = true;
      while(hasMoved && t < rope.length) {
        hasMoved = false
        let isN = areNeighbours(rope[h], rope[t]);
        if(!isN) {
          rope[t] = moveTail(rope[h], rope[t]);
          let hasVisited = positions.find((arr) => {
            if((arr[0] === rope[t][0]) && (arr[1] === rope[t][1])) {
              return true;
            }
          })
          if(!hasVisited && t === 9) {
            positions.push(rope[t])
          }

          h++;
          t++;
          hasMoved = true;
        }
      }
    }
  })
	console.timeEnd("sol2")
	return positions.length;
}

const areNeighbours = (pos1: Coordinate, pos2: Coordinate): boolean => {
  let x = [0,0, 0,1,1, 1,-1,-1,-1]
  let y = [0,1,-1,0,1,-1, 1,-1, 0]
  let isNeigh = false;
  for(let i = 0; i< x.length; i++) {
    let xP = x[i]
    let yP = y[i];
    if((pos1[0] + xP === pos2[0]) && (pos1[1] + yP === pos2[1])) {
      isNeigh = true;
      break;
    }
  }
  return isNeigh;
}

const moveTail = (h: Coordinate, t: Coordinate): Coordinate => {
  let newT: Coordinate = [...t]
  if(h[1] !== t[1])  {
    if(h[1] < t[1]) {
      newT[1]--;
    }
    else {
      newT[1]++;
    }
  } 
  if(h[0] !== t[0])  {
    if(h[0] < t[0]) {
      newT[0]--;
    }
    else {
      newT[0]++;
    }
  }
  return newT;
}

const input = parseData();
console.log(`Solution 1: ${sol1(input)}`);
console.log(`Solution 2: ${sol2(input)}`);
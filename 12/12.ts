import readInput from "../input.helper";
const runSample = false; 
type Input = any;
const parseData = (): Input => {
  console.time("parseData")
  const nodes = {}
  const input = readInput(12,runSample)
    .split("\n")
    .map((line, i ) => line.split("")
    .forEach((c, j) => {
      let index = `${i},${j}`;
      let distance = Number.MAX_SAFE_INTEGER;
      let charCodeVal = c.charCodeAt(0);
      if(c === 'S') {
        distance = 0
        charCodeVal = 'a'.charCodeAt(0);
      }
      if(c === "E") {
        charCodeVal = 'z'.charCodeAt(0);
      }
      nodes[index] = {
        distance,
        val: c,
        charCodeVal
      }
    }))
  console.timeEnd("parseData")
  return nodes
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let start;
  Object.keys(input).forEach((k) => {
    if(input[k].distance === 0)[
      start = k
    ]
  })
  let steps = aStar(input, start);
  
	console.timeEnd("sol1")
	return steps;
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let starts = []
  let steps = []
  Object.keys(input).forEach((k) => {
    if(input[k].val === 'a' || input[k].val === 'S') {
      input[k].distance = Number.MAX_SAFE_INTEGER;
      starts.push(k);
    }
  })
  starts.forEach((k) => {
    input[k].distance = 0
    steps.push(aStar(input, k))
    input[k].distance = Number.MAX_SAFE_INTEGER;
  })
  steps = steps.filter(v => v !== 0).sort((a,b) => a - b);
	console.timeEnd("sol2")
	return steps[0];
}

const aStar = (input: Input, start: string) => {
  const visited = {};
  const frontier = {};
  frontier[start] = {...input[start]}
  let steps = 0;
  const goal = "E"
  while(Object.keys(frontier).length > 0 ) {
    let found = false
    let sum = Number.MAX_SAFE_INTEGER;
    let nodeKey = '';

    for(const key in frontier) {
      let f = frontier[key].distance;
      if(f < sum) {
        nodeKey = key;
        sum = f;
      }
    }

    let node = {...frontier[nodeKey]}
    let [x,y] = nodeKey.split(",").map(e => parseInt(e));
    let nodeNeighbours = [`${x},${y+1}`,`${x},${y-1}`,`${x+1},${y}`,`${x-1},${y}`]
    delete frontier[nodeKey];
    for(const i in nodeNeighbours) {
      let nKey = nodeNeighbours[i]
      if(input[nKey]) {
        let nVal = input[nKey].charCodeVal;
        let cVal = node.charCodeVal;

        if(nVal === "E") {
          nVal = 'z'
        }
        if(cVal === "S") {
          cVal = 'a'
        }

        let w = nVal - cVal;
        if(input[nKey].val === goal && w <= 1) {
          found = true;
          steps = node.distance + 1;
          break
        }

        let successor = {
          distance: node.distance + 1,
          val: input[nKey].val,
          charCodeVal: input[nKey].charCodeVal
        }

        let succD = successor.distance;
        if(frontier[nKey] && frontier[nKey].distance < succD) {
          continue;
        }
        if(visited[nKey] && visited[nKey].distance < succD) {
          continue;
        }

        if(w <= 1) {
          frontier[nKey] = {...successor};
        }
      }
    }
    visited[nodeKey] = {...node}
    if(found) {
      break
    }
  }
  return steps
}
const draw = (visited) => {
  const input = readInput(12,runSample)
    .split("\n")
    .map((line, i ) => {
      let string = "";
      line.split("") 
      .forEach((c, j) => {
        let index = `${i},${j}`;
        if(visited[index]) {
          string += "x"
        } else {
          string += c
        }
      })
      console.log(string);
    })
}

const input = parseData();
console.log(`Solution 1: ${sol1(input)}`);
console.log(`Solution 2: ${sol2(input)}`);
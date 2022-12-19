import readInput from "../input.helper";
const runSample = false; 
type Robot = number[]

type Blueprint = {
  [key: string]: Robot
};

type Input = Blueprint[]
const parseData = (): Input => {
  console.time("parseData")
  let regexr = /\d+/g
  const input = []
  readInput(19,runSample).split("\n").forEach((line) => {
    const data = line.match(regexr).map((c) => parseInt(c));
    const blueprint = {
      "ore":      [data[1],0,0,0],
      "clay":     [data[2],0,0,0],
      "obsidian": [data[3],data[4],0,0],
      "geode":    [data[5],0,data[6],0]
    }
    input.push(blueprint)
  })
  console.timeEnd("parseData")
  return input
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let max = 0 
  input.forEach((blueprint: Blueprint, i) => {
    const maxRobots = [0,0,0,Number.MAX_SAFE_INTEGER]
    for(let i = 0;i<maxRobots.length;i++) {
      Object.values(blueprint).map((vals) => {
        if(vals[i] > maxRobots[i]) {
          maxRobots[i] = vals[i]
        }
      })
    }
    const numRobots = [1,0,0,0];
    const vals = [0,0,0,0];
    map = {}
    atMinute = getMinutes(24);
    let val = getBlueprintValue(numRobots, vals, 24, blueprint, maxRobots)
    max += val * (i+1)
  })
	console.timeEnd("sol1")
	return max
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let max = 1;
  for(let i = 0; i < 3;i++ ) {
    let blueprint = input[i];
    let bpVals = Object.values(blueprint)
    const maxRobots = [0,0,0,Number.MAX_SAFE_INTEGER]
    for(let j = 0; j < maxRobots.length;j++) {
      bpVals.forEach((bp) => {
        if(bp[j] > maxRobots[j]){
          maxRobots[j] = bp[j]
        }
      })
    }
    const numRobots = [1,0,0,0];
    const vals = [0,0,0,0];
    map = {} 
    atMinute = getMinutes(32);
    let val = getBlueprintValue(numRobots, vals, 32, blueprint, maxRobots)
    max = max * val;
  }
	console.timeEnd("sol2")
	return max;
}

const getMinutes = (minutes) => {
  const atMinute = {}
  for(let i = 1; i <= minutes;i++) {
    atMinute[i] = {}
  }
  return atMinute
}

let atMinute; 
let map = {}
const getBlueprintValue = (numRobots,vals,minutes,blueprint, maxRobots): number => {
  if(minutes === 0) {
    return vals[3]
  }

  const k = `${numRobots},${vals},${minutes}`;
  const mK =`${numRobots}`
  let atM = atMinute[minutes][mK];
  let foundBetter = false
  if(atM) {
    foundBetter = true 
    for(let j = 0;j < 4;j++) {
      if(atM[j] < vals[j])  {
        foundBetter = false
        break;
      }
    }
  }
  if(!foundBetter) {
    atMinute[minutes][mK] = vals
  } else {
    return vals[3];
  }
  if(map[k]) {
    return map[k];
  }
  const recepies: number[][] = Object.values(blueprint); 
  let nextRobots = [];
  let nextVals = [];
  let gR = false;
  for(let i = recepies.length - 1; i >= 0;i--) {
    const [ore,clay,obsidian,geode] = recepies[i];
    let newRobot = [...numRobots]
    let newVals  = [...vals]
    gR = (i === recepies.length-1)
    if(ore <= vals[0] && clay <= vals[1] && obsidian <= vals[2] && newRobot[i] < maxRobots[i]){
      newRobot[i]++;
      newVals[0] -= ore;
      newVals[1] -= clay;
      newVals[2] -= obsidian;

      nextRobots.push(newRobot);
      nextVals.push(newVals);

      if(gR) {
        break;
      }
    }
    gR = false;
  }


  if (nextRobots.length < 4 && !gR) {
    nextRobots.push([...numRobots])
    nextVals.push([...vals])
  }

  let max = 0; 
  for(let i = 0; i < nextRobots.length; i++) {
    for(let j = 0; j < 4;j++) {
      nextVals[i][j] += numRobots[j]
    }
    let ans = 0;
    ans = getBlueprintValue(nextRobots[i], nextVals[i], minutes-1,blueprint, maxRobots);
    if(ans > max) {
      max = ans
    }
  }
  map[k] = max;
  return max;
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
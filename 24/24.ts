import readInput from "../input.helper";
const runSample = false; 

const DIR_MAP = {
  '>': 'r',
  '<': 'l',
  '^': 'u',
  'v': 'd'
}

const MOD_MAP = {
  'r': [0,1],
  'l': [0,-1],
  'u': [-1,0],
  'd': [1,0]
}

type Input = any;
let W,H;
let start = `-1,0`;
let GOAL;

let LCM;

const WINDS_MAP = {}

const parseData = (): Input => {
  console.time("parseData")
  const winds = {}
  const lines = readInput(24,runSample).split("\n")
  H = lines.length - 2;
  W = lines[0].length -2;
  LCM = (W*H)/gcd(W,H);
  GOAL = `${H},${W-1}`
  lines.shift();
  lines.pop()
  lines.forEach((_, i) => {
    const line = _.split("");
    line.shift()
    line.pop()
    for(let j = 0; j < line.length; j++) {
      let pos = line[j]
      if(pos !== '.') {
        let k = `${i},${j},${DIR_MAP[pos]}`
        winds[k] = true
      }
    }
  })
  let newWinds = getPositions(JSON.parse(JSON.stringify(winds)))
  for(let i = 0; i < LCM; i++) {
    WINDS_MAP[i] = newWinds;
    newWinds = getPositions(formatWinds(newWinds));
  }
  console.timeEnd("parseData")
  return winds
}

const sol1 = (input: Input) => {
	console.time("sol1")
  const ans = findRoute(start, GOAL, 0,false);
	console.timeEnd("sol1")
	return ans
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let ans = 0;
  posMap = {}
  globMax = Number.MAX_SAFE_INTEGER
  ans = findRoute(start,GOAL,0,false);
  posMap = {}
  globMax = Number.MAX_SAFE_INTEGER
  ans = findRoute(GOAL,start,ans, true);
  posMap = {}
  globMax = Number.MAX_SAFE_INTEGER
  ans = findRoute(start,GOAL,ans,false);
	console.timeEnd("sol2")
	return ans;
}

let globMax = Number.MAX_SAFE_INTEGER;
let timesCalled = 0;
let posMap = {}
const findRoute = (cur: string, goal: string, min: any, reverse: boolean) => {
  timesCalled++
  let mom = `${cur},${min}`
  if(cur === goal) {
    if(min < globMax) {
      globMax = min
    }
    return min
  }

  if(min > globMax) {
    return Number.MAX_SAFE_INTEGER;
  }

  if(posMap[mom]) {
    return posMap[mom]; 
  }

  let pos = cur.split(",").map((c) => parseInt(c));
  let xMods = [1,0,-1,0];
  let yMods = [0,1,0,-1];
  let nextPos = []
  let found = false
  for(let i = 0;i<xMods.length;i++) {
    let mod = [xMods[i],yMods[i]];
    let [x,y] = [pos[0] + mod[0], pos[1] + mod[1]];
    let k = `${x},${y}`;

    if(k === goal) {
      cur = goal
      nextPos = [k]
      found = true
      break;
    }

    if((x >= 0 && y>=0) && (x < H && y < W) && !WINDS_MAP[min % LCM][k]) {
      if(reverse) {
        nextPos.unshift(k);
      } else {
        nextPos.push(k)
      }
    }
  }

  if(!WINDS_MAP[min % LCM][cur] && !found) {
    nextPos.push(cur);
  }

  let max = Number.MAX_SAFE_INTEGER;
  for(let i = 0; i < nextPos.length; i++) {
    let newCur = nextPos[i];
    let ans = findRoute(newCur,goal,min+1,reverse)
    if(ans < max) { 
      max = ans
    }
  }

  posMap[mom] = max;
  return max;
}


const getPositions = (_) => {
  let winds = Object.keys(_);
  let newWinds = {}
  winds.forEach((k) => {
    let [pos,dir] = calcPosition(k);
    if(!newWinds[pos]) {
      newWinds[pos] = []
    }
    newWinds[pos].push(dir)
  })
  return newWinds;
}

const calcPosition = (wind: string): [string,string] => {
  let [x,y,dir] = wind.split(",").map((_) => {
    return isFinite(parseInt(_)) ? parseInt(_) : _
  });
  let [xMod, yMod] = MOD_MAP[dir]
  let newX = negModulo((x + xMod), H)
  let newY = negModulo((y + yMod), W)
  return [`${newX},${newY}`,dir as string]
}

const negModulo = (p,mod) => {
  return ((p % mod) + mod) % mod;
}

const formatWinds = (winds) => {
  let newWinds = {}
  Object.keys(winds).forEach((k) => {
    winds[k].forEach((d) => {
      newWinds[`${k},${d}`] = true
    })
  })
  return newWinds;
}

const gcd = (x,y) => {
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
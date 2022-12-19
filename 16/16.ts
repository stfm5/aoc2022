import readInput from "../input.helper";
const runSample = true; 
type SMap<T=string> = {
  [key: string]: T
}

type Cave = {
  flowRate: number,
  neighs: string[],
  open: boolean
}
const caves: SMap<Cave> = {};

const parseData = (): void => {
  console.time("parseData")
  const flowRegex = new RegExp(/Valve ([A-Z]+) has flow rate=(\d+)/);
  const nRegex = new RegExp(/tunnels? leads? to valves? /)
  readInput(16,runSample).split("\n").map((line) => {
    let [curr, tun] = line.split("; ");
    let c = curr.match(flowRegex)
    const neighs = tun.split(nRegex)[1].split(", ");
    const cave = {
      flowRate: parseInt(c[2]),
      open: false,
      neighs,
    }
    caves[c[1]] = cave;
  })
  console.timeEnd("parseData")
}

let secondStartsAt;
const sol1 = () => {
	console.time("sol1")
  let start = 'AA';
  const minutes = 30;
  secondStartsAt = 30;
  let cave = {}
  Object.keys(caves).forEach((k) => {
    cave[k] = caves[k].flowRate
  })
  let max = minmax(cave, minutes, start, false);
	console.timeEnd("sol1")
	return max
}

const sol2 = () => {
	console.time("sol2")
  map = {}
  let start = "AA"
  const minutes = 26;
  secondStartsAt = 26;
  let cave = {}
  Object.keys(caves).forEach((k) => {
    cave[k] = caves[k].flowRate
  })
  let max = minmax(cave, minutes, start, true);
  console.timeEnd("sol2")
	return max;
}

let map: SMap<number>= {}
const minmax = (input: SMap<number>, minutes: number, currPipe: string, myTurn: boolean) => {
  const cave: SMap<number> = {...input};
  if(minutes === 0) {
    return myTurn ? minmax(cave, secondStartsAt, "AA", false) : 0;
  }
  let hash = `${currPipe},${Object.values(input)},${minutes},${myTurn}`
  if(map[hash] >= 0) {
    return map[hash];
  }

  let pos = cave[currPipe];
  let max = 0;
  if(pos > 0) {
    cave[currPipe] = -1;
    const res = ((minutes-1) * pos) + minmax(cave, minutes-1, currPipe, myTurn);
    if(res > max) {
      max = res;
    }
  }

  for(let neigh of caves[currPipe].neighs)  {
    const res = minmax(cave, minutes-1, neigh, myTurn);
    if(res > max) {
      max = res;
    }
  }
  map[hash] = max;
  return max;
}

parseData();
console.log(`Solution 1: ${sol1()}`);
console.log(`Solution 2: ${sol2()}`);
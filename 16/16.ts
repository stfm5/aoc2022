import readInput from "../input.helper";
const runSample = true; 
type SMap<T=string> = {
  [key: string]: T
}

type Cave = {
  flowRate: number,
  total: number,
  prev?: string,
  neighs: string[],
  open: boolean
}
type Input = SMap<Cave>


const DISTANCES: SMap<SMap<number>> = {}
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
      total: c[1] === 'AA' ? 0 : Number.MIN_SAFE_INTEGER,
      open: false,
      neighs,
    }
    caves[c[1]] = cave;
  })

  Object.keys(caves).forEach((k) => {
    DISTANCES[k] = dijkstra(caves, k)
    if(k === 'WW') {
      console.log(DISTANCES[k])
    }
    delete DISTANCES[k][k];
  })
  console.timeEnd("parseData")
}

const sol1 = () => {
	console.time("sol1")
  let start = 'AA';
  const minutes = 30;
  const total = 0;
  const flowRate = 0;
  const open = Object.keys(caves).filter((c) => {
    return (c !== start && caves[c].flowRate !== 0);
  });
  let max = minmax(open, minutes, start, total, flowRate);
	console.timeEnd("sol1")
	return max
}

const sol2 = () => {
	console.time("sol2")
  map = {}
  let start = "AA"
  const minutes = 26;
  const total = 0;
  const flowRate = 0;
  const open = Object.keys(caves).filter((c) => {
    return (c !== start && caves[c].flowRate !== 0);
  });
  let max = minmax2(open, minutes, [start,start], total, flowRate);
  console.timeEnd("sol2")
	return max;
}

let map: SMap<number>= {}
const minmax = (open: string[], minutes: number, curPipe: string, total: number, flowRate: number) => {
  let hash = `${curPipe} ${open} ${minutes} ${total} ${flowRate}`
  if(map[hash]) {
    return map[hash];
  }

  let max = total;
  if(open.length > 0) {
    open.forEach((k) => {
      let distance = DISTANCES[curPipe][k]
      let nextMinutes = minutes - (distance + 1) 
      if(nextMinutes > 0){
        let nextTotal = total + (flowRate * (distance + 1));
        let nextFlowRate = flowRate + caves[k].flowRate;
        let nextOpen = open.filter((c) => c !== k);

        const res = minmax(nextOpen, nextMinutes, k,  nextTotal, nextFlowRate);
        if(res > max) {
          max = res;
        }
      } else {
        const res = total + (flowRate * minutes)
        if(res > max) { 
          max = res;
        }
      }
    })
  } else {
    max += flowRate * minutes;
  }
  map[hash] = max;
  return max;
}

const minmax2 = (open: string[], minutes: number, curPipe: [string, string], total: number, flowRate: number) => {
  let hash = `${curPipe} ${open} ${minutes} ${total} ${flowRate}`
  if(map[hash]) {
    return map[hash];
  }

  let man = curPipe[0]
  let el = curPipe[1]
  let max = total;
  if(open.length > 0) {
    for(let i = 0; i < open.length; i++) {
      let p1 = open[i];
      let d1 = DISTANCES[man][p1]
      let m1 = minutes - (d1 + 1);
      let t1 = total;
      let fr1 = flowRate;
      let o1 = open;
      if(m1 > 0) {
        t1 = total + (flowRate * (d1 + 1));
        fr1 = flowRate + caves[p1].flowRate;
        o1 = open.filter((c) => c !== p1);
        man = p1
        const res = minmax2(o1, m1, [p1, el], t1, fr1);
        if(res > max) {
          max = res;
        }
      } else {
        const res = total + (flowRate * minutes);
        if(res > max) {
          max = res;
        }
      }
      for(let j = 0; j < o1.length;j++) {
        let p2 = open[j];
        let d2 = DISTANCES[el][p2]
        let m2 = minutes - (d2 + 1);
        if(m2 > 0) {
          let t2 = t1 + (fr1 * (d2 + 1));
          let fr2 = fr1 + caves[p2].flowRate;
          let o2 = o1.filter((c) => c !== p2);
          const res = minmax2(o2, m2, [p1, p2], t2, fr2);
          if(res > max) {
            max = res;
          }
        } else {
          const res = total + (flowRate * minutes);
          if(res > max) {
            max = res;
          }
        }
      }
    }
  } else {
    max += flowRate * minutes;
  }
  map[hash] = max;
  return max;
}

const dijkstra = (input: Input, start = "AA") => {
  const map: Input = JSON.parse(JSON.stringify(input));
  const dist = {}
  Object.keys(input).forEach((k) => {
    let val = k === start ? 0 : Number.MAX_SAFE_INTEGER;
    dist[k] = val
  })
  const prev = {}

  while(Object.keys(map).length > 0) {
    let l = Number.MAX_SAFE_INTEGER;
    let c;

    Object.keys(map).forEach((k) => {
      if(dist[k] < l) {
        l = dist[k];
        c = k;
      }
    })

    let curr = {...map[c]};
    delete map[c];
    for(let neigh of curr.neighs) {
      let newTotal = dist[c] + 1;
      if(newTotal < dist[neigh]){
        dist[neigh] = newTotal;
        prev[neigh] = c;
      }
    }
  } 
  return dist;
}

const input = parseData();
console.log(`Solution 1: ${sol1()}`);
console.log(`Solution 2: ${sol2()}`);
import readInput from "../input.helper";
const runSample = false; 
type Input = {
  signals: Signal[]
  maxX: number,
  maxY: number,
  minX: number,
  minY: number,
};
type Signal = {
  sX: number
  sY: number,
  bX: number,
  bY: number,
  mDistance: number
}

const parseData = (): Input => {
  console.time("parseData")
  const lineRegex = new RegExp(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/);
  let maxX = Number.MIN_SAFE_INTEGER;
  let minX = Number.MAX_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;

  const signals = readInput(15,runSample).split("\n").map((line) => {
    let [_,sY, sX, bY, bX] = line.match(lineRegex);
    const signal: Signal = {
      sX: parseInt(sX),
      sY: parseInt(sY),
      bX: parseInt(bX),
      bY: parseInt(bY),
      mDistance: 0
    }
    if(signal.sX > maxX || signal.bX > maxX) {
      maxX = signal.sX >= signal.bX ? signal.sX : signal.bX
    }
    if(signal.sX < minX || signal.bX < minX) {
      minX = signal.sX <= signal.bX ? signal.sX : signal.bX
    }

    if(signal.sY > maxY || signal.bY > maxY) {
      maxY = signal.sY >= signal.bY ? signal.sY : signal.bY
    }
    if(signal.sY < minY || signal.bY < minY) {
      minY = signal.sY <= signal.bY ? signal.sY : signal.bY
    }

    signal.mDistance = getDistance(sX, sY, bX, bY);

    return signal
  })
  const input = {
    signals,
    maxX,
    minX,
    maxY,
    minY
  }
  console.timeEnd("parseData")
  return input;
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let goal = 4000000; 
  let positions = {}
  let val;
  let found;
  for(let i = 0; i <= goal; i++) {
    for(let j = 0; j <= goal; j++) {
      let found = true;
      for(let c = 0; c < input.signals.length;c++) {
        let signal = input.signals[c]
        let nDistance = getDistance(signal.sX,signal.sY,j,i);
        if(nDistance <= signal.mDistance) {
          found = false
          j += signal.mDistance - nDistance
          break;
        }
      }
      if(found) {
        val = i * 4000000 + j;
        break;
      }
    }
    if(found) {
      break;
    }
  }
	console.timeEnd("sol2")
  return val
}

const sol1 = (input: Input) => {
  console.time("sol1")
  let goal = 20
  let positions = getPositions(input, goal);
  positions = positions.filter((p) => {
    return !input.signals.find((signal) => {
      return (p === signal.sY && goal === signal.sX) || (p === signal.bY && goal === signal.bX)
    })
  })
  console.timeEnd("sol2")
  return positions.length
}
const getPositions =( input: Input, goal: number): number[] => {
  let positions = [];
  input.signals.forEach((signal) => {
    let maxSize = (signal.mDistance * 2) + 1;
    let dist = Math.abs(signal.sX - goal)
    let takenInRow = maxSize + (dist * -2);

    if(takenInRow > 0) {
      let r = (takenInRow - 1) / 2
      for(let i = signal.sY - r; i <= signal.sY + r; i++) {
        positions.push(i);
      }
    }
  })
  positions = [...new Set(positions)];
  return positions

}
const getDistance = (sX, sY, bX, bY): number => {
  return (Math.abs(sX - bX) + Math.abs(sY - bY));
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
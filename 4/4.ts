import readInput from "../input.helper";
const runSample = false; 

type Range = {
  lw: number,
  up: number
}

type Pair = [Range, Range]

type Input = Pair[]

const parseData = (): Input => {
  console.time("parseData")
  const input: Input = readInput(4,runSample).split("\n").map((pair: string) => {
    return pair.split(",").map((range: string) => {
      let pRange = range.split("-").map((point: string) => parseInt(point))
      return {
        lw: pRange[0],
        up: pRange[1]
      } as Range
    }) as Pair;
  })
  console.timeEnd("parseData")

  return input
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let numOverlaps = 0;
  input.forEach((pair: Pair) => {
    if(isOverlaped(pair)) {
      numOverlaps++;
    }
  })
	console.timeEnd("sol1")
	return numOverlaps;
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let numUniques = 0;
  input.forEach((pair: Pair) => {
    if(!isUnique(pair)) {
      numUniques++;
    }
  })
	console.timeEnd("sol2")
	return numUniques;
}

const isOverlaped = (pair: Pair): boolean => {
  let [ p1, p2 ] = [...pair].sort((p1, p2) => (p1.up - p1.lw) - (p2.up - p2.lw))
  if(p1.lw === p2.lw && p1.up === p2.up) {
    return true;
  } else if (p1.lw === p2.lw && (p2.lw <= p1.up && p1.up <= p2.up)) {
    return true;
  } else if(p1.up === p2.up && (p2.lw <= p1.lw && p1.lw <= p2.up)) {
    return true;
  } else if((p2.lw <= p1.up && p1.up <= p2.up) && (p2.lw <= p1.lw && p1.lw <= p2.up)) {
    return true;
  }

  return false
}

const isUnique = (pair: Pair): boolean => {
  let [ p1, p2 ] = [...pair].sort((p1, p2) => (p1.up - p1.lw) - (p2.up - p2.lw))
  if((p1.lw < p2.lw && p1.up < p2.lw) || (p1.lw > p2.up && p1.up > p2.up)) {
    return true;
  }
  return false;
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)) as Input)}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)) as Input)}`);
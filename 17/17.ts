import readInput from "../input.helper";
const runSample = false; 
type SMap<T=string> = {
  [key: string]: T
}

const WIDTH = {
  0: 5,
  1: 4,
  2: 4,
  3: 2,
  4: 3
}

type Input = {
  line: number[],
  room: SMap<boolean>
};

const parseData = (): Input => {
  console.time("parseData")
  const room = {}
  const line = readInput(17,runSample).split("").map((c) => c === '>' ? 1 : -1);
  console.timeEnd("parseData")

  for(let i =0; i < 7; i++) {
    room[`${-1},${i}`] = true;
  }
  return {line, room}
}

const sol1 = (input: Input) => {
	console.time("sol1")
  const {line, room} = input
  const goal = 1000000000000;
           //  1000000000000
  const highest = play(line,room,goal)
	console.timeEnd("sol1")
	return highest
}

const sol2 = (input: Input) => {
	console.time("sol2")
	console.timeEnd("sol2")
	return 2;
}

const play = (line, room, goal) => {
  let numRocks = 0;
  let highest = -1;
  let moveNum = 0;
  let map = {}
  let cycle = {};

  let i = 0
  let start;
  let startH;

  while(true) {
    let rock = getRock(numRocks, highest);
    let k =`${numRocks%5},${moveNum%line.length}`
    if(!map[k]) {
      i = 0;
      cycle = {};
      map[k] = highest;
    } else {
      if(i === 0) {
        start = k
        startH = highest
      } else if(k === start) {
        console.log("break")
        break;
      }
      cycle[i] = {k,highest: highest - startH};
      i++
    }
    while(true) {
      let move = line[moveNum % line.length];
      moveNum++;
      let s = rock[0][1] + move;
      let l = rock[rock.length-1][1] + move;

      let m = (s >= 0) && (l <= 6);
      let res = rock; 
      if(m) {
        const newRock = moveR(rock,move,room)
        if(newRock.length === rock.length) {
          res = newRock
        }
      }
      let newRes = fall(res, room);

      if(newRes.length === rock.length) {
        rock = newRes;
        continue;
      }
      
      res.forEach((pos) => {
        let [x,y] = pos
        let k = `${x},${y}`
        room[k] = true;
      }) 

      let max = res[1][0];
      if(max > highest) {
        highest = max;
      }
      break;
    }
    numRocks++;
  }
  const reps  = Math.floor((goal-i)/i)
  const extra = (goal - numRocks) % i
  let total = startH + (highest - startH) * reps
  if(extra > 0) {
    total += cycle[extra].highest
  }

  return total + 1
}

const moveR = (rock, move, room) => {
  let newRock = []
  if(move === -1) {
    for(let i = 0; i < rock.length; i++) {
      let [x,y] = rock[i]
      let k = `${x},${y+move}`
      if(room[k]) {
        break;
      }
      newRock.push([x,y+move])
    }
  } else {
    for(let i = rock.length -1; i>=0;i--) {
      let [x,y] = rock[i]
      let k = `${x},${y+move}`
      if(room[k]) {
        break;
      }
      newRock.unshift([x,y+move])
    }
  }
  return newRock
}

const fall = (rock, room) => {
  const newRock = [];
  for(let i = 0; i < rock.length;i++) {
    let [x,y] = rock[i];
    let k = `${x-1},${y}`;
    if(room[k]) {
      break;
    }

    newRock.push([x-1,y])
  }
  return newRock
}

const getRock = (numRocks, highest) => {
  let type = numRocks % 5;
  let x = highest + 4;
  let s = 2

  switch(type) {
    case 0:
      return [[x,s],[x,s+1],[x,s+2],[x,s+3]];
    case 1:
      return [[x+1,s],[x+2, s+1], [x,s+1], [x+1,s+2]];
    case 2:
      return [[x,s],[x+2,s+2],[x,s+1],[x,s+2],[x+1,s+2]];
    case 3:
      return [[x,s],[x+3,s],[x+1,s],[x+2,s]];
    case 4:
      return [[x,s],[x+1,s],[x,s+1],[x+1,s+1]];
  }
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
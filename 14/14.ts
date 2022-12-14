import readInput from "../input.helper";
const runSample = false; 
type Input = {
  [key: string]: boolean
};

const parseData = (): [Input,number]=> {
    console.time("parseData")
    const input = {};
    const data = readInput(14,runSample).split("\n").map((line) => {
      return line.split(" -> ");
    })
    let lowestPoint = Number.MIN_SAFE_INTEGER;
    data.forEach((rock) => {
      for(let i = 0; i < rock.length - 1; i++) {
        let s = rock[i].match(/(\d+),(\d+)/);
        let f = rock[i+1].match(/(\d+),(\d+)/);

        let start = [parseInt(s[1]), parseInt(s[2])];
        let finish = [parseInt(f[1]), parseInt(f[2])];
        if(start[1] > lowestPoint || finish[1] > lowestPoint) {
          lowestPoint = start[1] > finish[1] ? start[1] : finish[1];
        }

        let dir = start[0] === finish[0] ? 1 : 0 
        let range = [start[dir], finish[dir]].sort((a,b) => a-b);
        let taken = []
        let j = 0

        while(range[0] + j <= range[range.length-1]) {
          let k;
          if(dir === 0) {
            k = `${range[0]+j},${start[1]}`
          } else {
            k = `${start[0]},${range[0]+j}`
          }
          if(!input[k]) {
            input[k] = true;
          }
          taken.push(range[0] + j);
          j++;
        }
      }
    })
    console.timeEnd("parseData")
    return [input, lowestPoint]
}

const sol1 = (input: [Input,number]) => {
	console.time("sol1")
  const [cave, lowest] = input;
  let i = 0;
  while(true) {
    let sandPos = [500,0];
    let canMove = true
    let reachedAbyss = false;
    while(canMove) {
      canMove = false;
      let d = [sandPos[0]  ,sandPos[1] + 1]
      let l = [sandPos[0]-1,sandPos[1] + 1]
      let r = [sandPos[0]+1,sandPos[1] + 1]
      if(d[1] > lowest) {
        reachedAbyss = true;
        break;
      }

      if(!cave[d.toString()]) {
        sandPos = [...d]
        canMove = true
        continue;
      }
      if(!cave[l.toString()]) {
        sandPos = [...l]
        canMove = true
        continue;
      }
      if(!cave[r.toString()]) {
        sandPos = [...r]
        canMove = true
        continue;
      }
      cave[sandPos.toString()] = true;
      i++;
    }
    if(reachedAbyss) { 
      break;
    }
  }
	console.timeEnd("sol1")
	return i+1
}

const sol2 = (input: [Input, number]) => {
	console.time("sol2")
  const [cave, lowest] = input;
  let i = 0;
  while(true) {
    let sandPos = [500,0];
    let canMove = true
    while(canMove) {
      canMove = false;
      let d = [sandPos[0]  ,sandPos[1] + 1]
      let l = [sandPos[0]-1,sandPos[1] + 1]
      let r = [sandPos[0]+1,sandPos[1] + 1]

      if(d[1] !== (lowest + 2)) {
        if(!cave[d.toString()]) { 
          sandPos = [...d]
          canMove = true
          continue;
        }
        if(!cave[l.toString()]) {
          sandPos = [...l]
          canMove = true
          continue;
        }
        if(!cave[r.toString()]) {
          sandPos = [...r]
          canMove = true
          continue;
        }
      }
      
      cave[sandPos.toString()] = true;
      i++;
    }

    if(sandPos.toString() === "500,0") { 
      break;
    }
  }
	console.timeEnd("sol2")
	return i
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
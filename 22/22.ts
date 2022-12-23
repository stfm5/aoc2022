import readInput from "../input.helper";
const runSample = false; 

type Board = {
  [key: string]: boolean
}
type Instruction = [string,number]
type Instructions = Instruction[]

const DIRS = {
  "R": [0,1],
  "L": [0,-1],
  "U": [-1,0],
  "D": [1,0]
}

const ANGLES = {
  0  : "U",
  90 : "R",
  180: "D",
  270: "L"
}

const NUM = {
  0  : 3,
  90 : 0,
  180: 1,
  270: 2,
}

type Input = any;
const parseData = (): Input => {
  console.time("parseData")
  const board: Board = {}
  let startMoves: number;
  let pos = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]; 
  const instructions: Instructions = [] 
  // Granicite na sekoj red/kolona
  const boundsX = {}
  const boundsY = {}

  readInput(22,runSample).split("\n").forEach((line,i) => {
    if(!line.match(/\d+/)) {
      line.split("").forEach((p,j) => {
        if(p !== ' ') {
          if(!boundsX[i]) {
            boundsX[i] = [j,j];
          } else if(boundsX[i][1] < j) {
            boundsX[i][1] = j
          }

          if(!boundsY[j]) {
            boundsY[j] = [i,i]
          } else if(boundsY[j][1] < i) {
            boundsY[j][1] = i
          }
          board[`${i},${j}`] = p === '.' ? true : false;
          if(p === '.' && i <= pos[0] && j <= pos[1]) {
            pos = [i,j]
          }
        }
      })
    } else {
      line.split(/([LR]\d+)/).forEach((inst, j) => {
        if(j === 0) {
          startMoves = parseInt(inst);
        } else if(inst !== ''){
          let dir = inst[0]
          let num = parseInt(inst.match(/\d+/)[0]);
          instructions.push([dir,num])
        }
      })
    }
  })

  console.timeEnd("parseData")
  return {startMoves, pos, board, instructions, boundsX, boundsY}
}

const sol1 = (input: Input) => {
  let {startMoves,pos, board, instructions, boundsX, boundsY} = input
	console.time("sol1")
  let facing = 90;
  let i = 0
  while(i < startMoves) {
    let newPos = [...pos];
    let dir = ANGLES[facing];
    newPos[0] += DIRS[dir][0];
    newPos[1] += DIRS[dir][1];
    let k = newPos.toString();
    if(typeof board[k] === 'undefined') {
      newPos[1] = boundsX[0]
    }     
    k = newPos.toString()
    if(!board[k]) {
      break;
    }

    pos = newPos
    i++;
  }
  for(let i = 0; i < instructions.length; i++) {
    const inst = instructions[i];
    const rotate = inst[0];
    facing = getDirection(facing, rotate)
    let dir = ANGLES[facing]


    for(let j = 0; j < inst[1]; j++) {
      // console.log(pos)
      let newPos = [...pos]

      newPos[0] += DIRS[dir][0]
      newPos[1] += DIRS[dir][1]
      let k = newPos.toString();
      if(typeof board[k] === 'undefined') {
        switch(dir) {
          case "L":
            newPos[1] = boundsX[newPos[0]][1];
            break;
          case "R":
            newPos[1] = boundsX[newPos[0]][0];
            break;
          case "U":
            newPos[0] = boundsY[newPos[1]][1];
            break;
          case "D":
            newPos[0] = boundsY[newPos[1]][0];
            break;
        }
      }
      k = newPos.toString();
      if(!board[k]) {
        break;
      }
      pos = newPos;
    }
  }
  let res = (1000 * (pos[0] + 1)) + (4 * (pos[1] + 1) + NUM[facing])
	console.timeEnd("sol1")
	return res
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let {startMoves,pos, board, instructions, boundsX, boundsY} = input
  let facing = 90;
  let i = 0
  while(i < startMoves) {
    let newPos = [...pos];
    let dir = ANGLES[facing];
    newPos[0] += DIRS[dir][0];
    newPos[1] += DIRS[dir][1];
    let k = newPos.toString();
    if(typeof board[k] === 'undefined') {
      newPos[1] = boundsX[0]
    }     
    k = newPos.toString()
    if(!board[k]) {
      break;
    }

    pos = newPos
    i++;
  }
  for(let i = 0; i < instructions.length; i++) {
    const inst = instructions[i];
    const rotate = inst[0];
    facing = getDirection(facing, rotate)
    let dir = ANGLES[facing]

    for(let j = 0; j < inst[1]; j++) {
      let newPos = [...pos]
      dir = ANGLES[facing]

      newPos[0] += DIRS[dir][0]
      newPos[1] += DIRS[dir][1]
      let k = newPos.toString();
      let oldFacing = facing;
      if(typeof board[k] === 'undefined') {
        let res = getCubePos(dir, pos)
        newPos = res.newPos;
        facing = res.facing
      }
      k = newPos.toString();
      if(!board[k]) {
        facing = oldFacing;
        break;
      }
      pos = [...newPos];

    }
  }
  let res = (1000 * (pos[0] + 1)) + (4 * (pos[1] + 1) + NUM[facing])

	console.timeEnd("sol2")
	return res;
}

const getDirection = (facing, rotate) => {
  let newDir = facing
  newDir += rotate === 'L' ? -90 : 90
  return ((newDir % 360) + 360) % 360;
}

const getCubePos = (dir, newPos) => {
  let [x,y] = newPos
  if(dir === 'L' || dir === 'R') {
    if(dir === 'R') {
      if(x >= 0 && x < 50) {
        let newX = 149 - x;     
        let newY = 99;
        let newFacing = 270;
        return {newPos: [newX, newY], facing: newFacing}
      } 
      if(x >= 50 && x < 100) {
        let newX = 49;
        let newY = x + 50;
        let newFacing = 0;
        return {newPos: [newX, newY], facing: newFacing}
      } 
      if(x >= 100 && x < 150) {
        let newX = 149 - x;
        let newY = 149;
        let newFacing = 270;
        
        return {newPos: [newX, newY], facing: newFacing}
      }
      let newX = 149
      let newY = x - 100;
      let newFacing = 0;
      return {newPos: [newX, newY], facing: newFacing}
    }
    if(x >= 0 && x < 50) {
      let newX = 149 - x;     
      let newY = 0;
      let newFacing = 90;
      return {newPos: [newX, newY], facing: newFacing}

    } 
    if(x >= 50 && x < 100) {
      let newX = 100;
      let newY = x - 50;
      let newFacing = 180
      return {newPos: [newX, newY], facing: newFacing}
    } 
    if(x >= 100 && x < 150) {
      let newX = 149 - x;
      let newY = 50;
      let newFacing = 90;
      
      return {newPos: [newX, newY], facing: newFacing}
    }
    let newX = 0;
    let newY = x - 100;
    let newFacing = 180;

    return {newPos: [newX, newY], facing: newFacing}
  } else if (dir === 'U' || dir === 'D'){ 
    if(dir === 'U') {
      if(y >= 0 && y < 50) {
        let newX = y + 50;
        let newY = 50;
        let newFacing = 90
        return {newPos: [newX, newY], facing: newFacing}
      } 
      if(y >= 50 && y < 100) {
        let newX = y + 100
        let newY = 0;
        let newFacing = 90;

        return {newPos: [newX, newY], facing: newFacing}
      } 
      let newX = 199;
      let newY = y - 100;
      let newFacing = 0;
      return {newPos: [newX, newY], facing: newFacing}
    }
    if(dir === 'D')  {
      if(y >= 0 && y < 50) {
        let newX = 0;
        let newY = y + 100;
        let newFacing = 180;
        return {newPos: [newX, newY], facing: newFacing}
      } 
      if(y >= 50 && y < 100) {
        let newX = y + 100
        let newY = x - 100;
        let newFacing = 270;
        return {newPos: [newX, newY], facing: newFacing}
      } 

      let newX = y - 50;
      let newY = x + 50;
      let newFacing = 270;
      return {newPos: [newX, newY], facing: newFacing}
    }
  }
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
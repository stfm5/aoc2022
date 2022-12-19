import readInput from "../input.helper";
const runSample = false; 

type Map = {
  [key: string]: number
}

type Pos = number[] 

type Input = Pos[];
const map: Map = {}
let min = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
let max = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]

const parseData = (): Input => {
  console.time("parseData")
  const input: Input = readInput(18,runSample).split("\n").map((cube) => {
    map[cube] = 1
    let parsed = cube.split(",").map((c) => parseInt(c))
    parsed.forEach((v,i) => {
      if(v-1 < min[i]) {
        min[i] = v - 1
      } else if (v+1 > max[i]){
        max[i] = v + 1
      }
    })
    return parsed
  })
  console.timeEnd("parseData")
  return input
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let surface = 0 
  for(let i = 0; i < input.length; i++) {
    let sides = 6
    getNeigh(input[i]).forEach((neigh) => {
      let k = neigh.toString()
      sides += map[k] ? -1 : 0
    })
    surface += sides
  }
	console.timeEnd("sol1")
	return surface
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let surface = 0 
  let checked = {}
  let start = [min]
  while(start.length > 0) {
    const pos = start.shift()
    const posK = pos.toString()
    if(checked[posK]) {
      continue;
    }
    checked[posK] = true;
    const neigh = getNeigh(pos);
    neigh.forEach((n) => {
      let nK = n.toString();
      if(!checked[nK] && !map[nK]) {
        let inRange = true
        for(let i = 0; i < 3; i++) {
          if((min[i] > n[i]) || (n[i] > max[i])) {
            inRange = false
            break;
          }
        }
        if(inRange) {
          start.push(n);
        }
      }
    })
  }
  console.log(Object.keys(checked).length);
  input.forEach((pos) => {
    let sides = 0
    getNeigh(pos).forEach((n) => {
      if(checked[n]) {
        sides++ 
      }
    })
    surface += sides
  })

	console.timeEnd("sol2")
	return surface;
}

const getNeigh = (pos) => {
  const neigh = []
  const [ x,y,z ] = pos;
  let u = [-1,1,0,0,0,0]
  let l = [0,0,-1,1,0,0] 
  let o = [0,0,0,0,-1,1]
  for(let j = 0; j < 6; j++) {
    let xM = x + u[j]
    let yM = y + l[j]
    let zM = z + o[j]
    neigh.push([xM,yM,zM])
  }
  return neigh
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
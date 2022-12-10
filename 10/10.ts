import readInput from "../input.helper";
const runSample = false; 
type Input = Instruction[];

type Instruction = {
  cmd: string,
  value: number
}

const parseData = (): Input => {
  console.time("parseData")
  const regex = new RegExp(/([a-z]*) ?(-?\d+)?/)
  const input = readInput(10,runSample).split("\n").map((line) => {
    let match = line.match(regex)
    let ins: Instruction = {
      cmd: match[1],
      value: match[2] ? parseInt(match[2]) : 0
    };
    return ins
  })
  console.timeEnd("parseData")
  return input
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let v = 1;
  let cycle = 0;
  let signal = 0;
  while(input.length > 0) {
    cycle++;
    let ins = input[0]
    signal += getSignal(v, cycle);
    if(ins.cmd === 'noop') {
      v += ins.value;
      input.shift();
    } else {
      input[0].cmd = 'noop';
    }
  }
  console.log(v,cycle);
	console.timeEnd("sol1")
	return signal
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let v = 1;
  let cycle = 0;
  let signal = 0;
  let drawing = ""
  while(input.length > 0) {
    cycle++;
    let ins = input[0]
    drawing += drawPixel(v, cycle);
    if(ins.cmd === 'noop') {
      v += ins.value;
      input.shift();
    } else {
      input[0].cmd = 'noop';
    }
  }
  console.log(drawing)
	console.timeEnd("sol2")
	return 2;
}

const drawPixel = (v: number, cycle: number): string => {
  let drawing = ''
  let sprite = [v,v+1,v+2]
  let pos = cycle % 40 === 0 ? 40 : cycle % 40;
  if(sprite.includes(pos)) {
    drawing = "#"
  } else {
    drawing = ' '
  }
  if(cycle % 40 === 0){
    drawing += "\n"
  }

  return drawing
}

const getSignal = (v: number, cycle: number): number => {
  let val = 0
  if((cycle === 20) || ((cycle - 20) % 40 === 0)) {
    val = cycle * v;
  }
  return val 
}
const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
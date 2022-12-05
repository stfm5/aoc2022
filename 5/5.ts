import readInput from "../input.helper";
const runSample = false; 

type Move = {
  from: number,
  to: number,
  amount: number,
}

type Instructions = Move[]

type Stacks = {
  [key: number]: string[]
}

type Input = {
  stack: Stacks,
  ins: Instructions
};

const parseData = (): any => {
  console.time("parseData")
  const stacks: Stacks = {}
  const ins: Instructions = []
  const crateRegex = new RegExp(/\[\w+\]/);
  const insRegex = new RegExp(/move (\d+) from (\d+) to (\d+)/);
  const data = readInput(5, runSample).split("\n")
  data.forEach((line: string) => {
    if(crateRegex.test(line)) {
      let start = 1;
      let index = 1;
      while(index < line.length) {
        const crate = line[index]
        if(new RegExp(/[A-Z]/).test(crate)) {
          if(!stacks[start]) {
            stacks[start] = []
          }
          stacks[start].unshift(crate);
        }
        index = 1 + (start * 4);
        start++;
      }
    } else if(insRegex.test(line)) {
      const match = line.match(insRegex)
      ins.push({
        from: parseInt(match[2]),
        to: parseInt(match[3]),
        amount: parseInt(match[1])
      })
    }
  })
  console.timeEnd("parseData")
  const input: Input= {
    stack: stacks,
    ins
  }
  return input 
}

const sol1 = (input: Input) => {
	console.time("sol1")
  input.ins.forEach((move: Move) => {
    const {from, to, amount} = move
    for(let i = 0; i < amount; i++) {
      input.stack[to].push(input.stack[from].pop());
    }
  })
  let answer = ''
  Object.keys(input.stack).forEach((k) => {
    answer += input.stack[k].pop();
  })
	console.timeEnd("sol1")
	return answer;
}

const sol2 = (input: Input) => {
	console.time("sol2")
  input.ins.forEach((move: Move) => {
    const {from, to, amount} = move
    const removed = input.stack[from].splice(input.stack[from].length-amount);
    input.stack[to].push(...removed);
  })
  let answer = ''
  Object.keys(input.stack).forEach((k) => {
    answer += input.stack[k].pop();
  })
	console.timeEnd("sol2")
	return answer;
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
import readInput from "../input.helper";

const runSample = false; 
type Monkey = {
  num?: number,
  m1?: string,
  op?: string,
  m2?: string,
  val?: number
}
type Input = {
  [key: string]: Monkey
};
const input = {}
const parseData = (): Input => {
    console.time("parseData")
    const lineRegex = new RegExp(/(?:([a-z]{4}): (\d+)?(?:([a-z]{4}) ([+\-*/]) ([a-z]{4}))?)/);
    readInput(21,runSample).split("\n").forEach((line) => {
      const [_,key,num,m1,op,m2 ] = line.match(lineRegex);
      input[key] = {}
      if(num) {
        input[key].num = parseInt(num);
      } else {
        input[key].m1 = m1
        input[key].op = op
        input[key].m2 = m2
      }
    })
    console.timeEnd("parseData")
    return {}
}

const sol1 = () => {
	console.time("sol1")
  const ans = getAns("root");
	console.timeEnd("sol1")
	return ans
}

const sol2 = () => {
	console.time("sol2")
  input["root"].op = "-"
  input["humn"].num = 1
  let x = getAns("root");
  let y;
  let i,j;
  while(true) {
    input["humn"].num *= 2
    y = getAns("root");
    if((y < 0 && x > 0) || (x < 0 && y > 0)) {
      i = input["humn"].num /2
      j = input["humn"].num;
      break;
    } else {
      x = y;
    }
  }
  
  while(true) {
    input["humn"].num = (i+j)/2;

    let n = getAns("root")
    if(n === 0) break;
    if((n < 0 && x > 0) || (x < 0 && n > 0)) {
      y = n;
      j = (i+j)/2
    }
    if((y < 0 && n > 0) || (n < 0 && y > 0)) {
      i = (i+j)/2
      x = n;
    }
  }
	console.timeEnd("sol2")
  return input["humn"].num
}
const getAns = (key: string): number => {
  const monkey = input[key]
  if(typeof monkey.num === "number")  {
    return monkey.num
  } else {
    let m1 = getAns(monkey.m1)
    let m2 = getAns(monkey.m2)
    input[monkey.m1].val = m1
    input[monkey.m2].val = m2
    let val;
    switch(monkey.op) {
      case "+":
        val = m1 + m2
        input[key].val = val
        return val;
      case "-":
        val = m1 - m2
        input[key].val = val
        return val;
      case "/":
        val = m1 / m2
        input[key].val = val
        return val;
      case "*":
        val = m1 * m2
        input[key].val = val
        return val;
    }
  }
}

parseData()
console.log(`Solution 1: ${sol1()}`);
console.log(`Solution 2: ${sol2()}`);
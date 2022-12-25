import readInput from "../input.helper";
const runSample = false; 
type Input = any;

const SNAFU_MAP = {
  "=": -2,
  "-": -1
}

const B5_TO_SNAFU = {
  '3': '=',
  '4': '-',
  '5': '0' 
}

const parseData = (): Input => {
  console.time("parseData")
  const fuels = readInput(25,runSample).split("\n").map((fuel) => fuel.split(""))
  console.timeEnd("parseData")
  return fuels
}

const sol1 = (input: Input) => {
	console.time("sol1")
  const sum = input.reduce((prev,cur)=> {
    return prev + decode(cur);
  },0)
  const code = encode(sum);
	console.timeEnd("sol1")
	return code
}

const sol2 = (input: Input) => {
	console.time("sol2")
	console.timeEnd("sol2")
	return 2;
}

const decode = (fuel: string[]) => {
  let sum = 0;
  const size = fuel.length - 1;
  for(let i = 0; i < fuel.length;i++) {
    let num = parseInt(fuel[i]);
    const pos = Math.pow(5, size-i);

    if(!isFinite(num)) { 
      num = SNAFU_MAP[fuel[i]];
    }
    sum += pos* num
  }

  return sum
}

const encode = (fuel: number): string => {
  let base5 = fuel.toString(5).split("");
  let code = ''

  for(let i = base5.length - 1; i >= 0;i--) {
    let val = base5[i];
    let neigh = base5[i-1]

    if(parseInt(val) < 3) {
      code = val + code;
      continue;
    }

    val = B5_TO_SNAFU[val] 
    code = val + code;
    if(i === 0) {
      code = '1' + code;
      break;
    }

    base5[i-1] = `${parseInt(neigh) + 1}`
  }
  return code
}

const test = () => {
  let vals = [
    1747,906,198,
    11,201,31,1257,
    32,353,107,7,3,37
  ]
  console.log(`SNFU\tDECIMAL`)
  for(let i = 0; i < vals.length;i++) {
    let code = encode(vals[i])
    console.log(`${code}\t${vals[i]}`)
  }
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
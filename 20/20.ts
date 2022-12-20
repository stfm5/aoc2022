import readInput from "../input.helper";
const runSample = true; 
type Num = {
  val: number,
  ogI: number,
}

type Input = any;

const parseData = (): Input => {
  console.time("parseData")
  const input = readInput(20,runSample).split("\n").map((c, i) => {
    return {
      val: parseInt(c), 
      ogI: i
    }
  })
  console.timeEnd("parseData")
  return input
}

const sol1 = (input: Num[]) => {
	console.time("sol1")
  const copy = [...input]

  console.log(copy.length)
  console.log([...new Set([...copy])].length)
  input = mix(input);
  const sum = getSum(input)

	console.timeEnd("sol1")
	return sum
}

const sol2 = (input: Input) => {
	console.time("sol2")
  input = input.map((v) => {
    return {
      val: v.val  * 811589153,
      ogI: v.ogI
    }
  })
  for(let time = 0;time < 10;time++) {
    input = mix(input)
  }
  const sum = getSum(input)
	console.timeEnd("sol2")
	return sum
}

const mix = (nums: Num[]): Num[] => {
  const copy = [...nums];
  for(let i = 0; i < nums.length; i++) {
    let newIndex = nums.findIndex((c) => c.ogI === i)
    let num = nums.splice(newIndex,1)[0];
    newIndex = (newIndex+num.val) === 0 ? copy.length -1 : (newIndex + num.val) % (copy.length - 1)
    nums.splice(newIndex, 0, num);
  }
  return nums
}

const getSum = (input: Num[]):number => {
  let zIndex = input.findIndex((c) => c.val === 0);
  let x = ((zIndex + 1000) % input.length)
  let y = ((zIndex + 2000) % input.length)
  let z = ((zIndex + 3000) % input.length)

	return input[x].val + input[y].val + input[z].val
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
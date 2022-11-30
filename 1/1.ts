import readInput from "../input.helper";
const runSample = false; 
type Input = any;

const parseData = (): Input => {
    console.time("parseData")
    console.timeEnd("parseData")
}

const sol1 = (input: Input) => {
	console.time("sol1")
	console.timeEnd("sol1")
	return 1
}

const sol2 = (input: Input) => {
	console.time("sol2")
	console.timeEnd("sol2")
	return 2;
}

const input = parseData();
console.log(`Solution 1: ${sol1(input)}`);
console.log(`Solution 2: ${sol2(input)}`);
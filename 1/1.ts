import readInput from "../input.helper";
const runSample = false; 
type Input = any;

const parseData = (): Input => {
    console.time("parseData")
		const elves: number[]= []
		const input = readInput(1, runSample).split("\n");
		let calories = 0;
		input.forEach((line) => {
			if(line.length === 0) {
				elves.push(calories)
				calories = 0;
			} else {
				calories += parseInt(line);
			}
		})	
		
    console.timeEnd("parseData")
		console.log(elves)
		return elves
}

const sol1 = (input: Input) => {
	console.time("sol1")
	console.timeEnd("sol1")
	return input.sort((a,b) => b-a)[0];
}

const sol2 = (input: Input) => {
	console.time("sol2")
	const calories = input.sort((a,b) => b-a);
	console.timeEnd("sol2")
	return calories[0] + calories[1] + calories[2];
}

const input = parseData();
console.log(`Solution 1: ${sol1(input)}`);
console.log(`Solution 2: ${sol2(input)}`);
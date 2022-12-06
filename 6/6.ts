import { start } from "repl";
import readInput from "../input.helper";
const runSample = false; 
type Input = string;

const parseData = (): Input => {
  console.time("parseData")
  const input = readInput(6,runSample)
  console.timeEnd("parseData")
  return input 
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let string = ""
  let numDigits;
  const splitInput = input.split("");
  for(let i = 0; i< splitInput.length;i++) {
    let char = splitInput[i];
    if(!string.includes(char)) {
      string += char;
    } else {
      string = char;
    }

    if(string.length === 4){
      numDigits = i + 1;
      break;
    }
  }
	console.timeEnd("sol1")
	return numDigits
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let string = "";
  let numDigits;
  let startMarker;
  const splitInput = input.split("");
  for(let i = 0; i< splitInput.length;i++) {
    let char = splitInput[i];
    if(!string.includes(char)) {
      if(string.length === 0) {
        startMarker = i; 
      }
      string += char;
    } else {
      i = startMarker;
      string = "";
      continue;
    }

    if(string.length === 14){
      numDigits = i + 1;
      break;
    }
  }
	console.timeEnd("sol2")
	return numDigits;
}

const input = parseData();
console.log(`Solution 1: ${sol1(input)}`);
console.log(`Solution 2: ${sol2(input)}`);
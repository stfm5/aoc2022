import readInput from "../input.helper";
import { isUpperCase } from "./3.helper";
const runSample = false; 

type Rucksack = {
  "full": string[]
  "first": string,
  "second": string
}
type Input = Rucksack[];

const parseData = (): Input => {
    console.time("parseData")
    const input = readInput(3, runSample).split("\n").map((sack) => {
      return {
        full: [...new Set(sack.split(""))],
        first: sack.slice(0,sack.length/2),
        second: sack.slice(sack.length/2),
      }
    });
    console.timeEnd("parseData")
    return input;
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let duplicates = []
  input.forEach((sack: Rucksack) => {
    let common = [];
    let first = sack.first.split("");
    let second = sack.second.split("");

    first.forEach((item: string) => {
      if(second.includes(item)) {
        common.push(item)
      }
    })

    duplicates.push(...[...new Set(common)])
  })

  duplicates = convertToAscii(duplicates);
  let sum = duplicates.reduce((prev, cur) => prev + cur, 0)
	console.timeEnd("sol1")
	return sum
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let keys: any[] = []
  for(let i = 0; i < input.length - 1; i+=3) {
    let occurences = {}
    let key; 
    let group =  [...input[i].full, ...input[i+1].full, ...input[i+2].full]

    group.forEach((item: string) => {
      if(!occurences[item]) {
        occurences[item] = 0;
      }
      occurences[item] += 1;
      if(occurences[item] === 3) {
        key = item;
      }
    }) 
    keys.push(key);
  }

  keys = convertToAscii(keys);
  let sum = keys.reduce((prev,cur) => prev + cur, 0)
	console.timeEnd("sol2")
	return sum;
}

const convertToAscii = (chars: string[]): number[] => {
  return chars.map((char) => {
    let offset = isUpperCase(char) ? 38 : 96;
    return char.charCodeAt(0) - offset;
  })
}


const input = parseData();
console.log(`Solution 1: ${sol1(input)}`);
console.log(`Solution 2: ${sol2(input)}`);
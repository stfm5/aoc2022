import path = require("path");
import readInput from "../input.helper";
const runSample = false; 

type Directory = {
  parent: string,
  fileSize: number
}

type FileSystem = {
  [key:string]: Directory
}

type Input = FileSystem;

const parseData = (): Input => {
  console.time("parseData")
  const fileR = new RegExp(/^\d+/);
  const dirR = new RegExp(/^dir/);
  const lsR = new RegExp(/\$ ls/);
  const cdR = new RegExp(/\$ cd (([a-z])|(\.\.)|(\/))/);
  const data = readInput(7, runSample).split("\n");
  let currDirrPath = "/"
  let fSystem: FileSystem = {}
  for(let i = 0; i < data.length;i++) {
    let line = data[i]
    if(line.match(lsR)) {
      continue;
    }
    if(cdR.test(line)) {
      let nextDir = line.match(cdR)[1];
      if(nextDir === '..') {
        let parent = fSystem[currDirrPath].parent
        fSystem[parent].fileSize += fSystem[currDirrPath].fileSize
        currDirrPath = joiner(currDirrPath, nextDir);
        continue;
      }
      let parent = currDirrPath;
      currDirrPath = joiner(currDirrPath, nextDir)
      fSystem[currDirrPath] = {
        parent: parent,
        fileSize: 0
      }
    } 
    if(line.match(fileR)) {
      fSystem[currDirrPath].fileSize += parseInt((line.match(fileR)[0]));
    }
  }
  // Add the last file
  while(currDirrPath !== "/") {
    let parent = fSystem[currDirrPath].parent
    fSystem[parent].fileSize += fSystem[currDirrPath].fileSize
    currDirrPath = joiner(currDirrPath, '..');
  }

  console.timeEnd("parseData")
  return fSystem
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let sum = 0
  Object.keys(input).forEach((k) => {
    if(input[k].fileSize <= 100000) {
      sum += input[k].fileSize;
    }
  })
	console.timeEnd("sol1")
	return sum
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let unused = 70000000 - input["/"].fileSize
  let target = 30000000 - unused;
  let smallest = 0;
  let sizes = Object.keys(input).map((k) => {
    return input[k].fileSize
  }).sort(( a,b ) => a-b);

  for(let i = 0; i< sizes.length;i++) {
    if(sizes[i] < target) {
      continue
    }
    smallest = sizes[i];
    break;
  }
	console.timeEnd("sol2")
	return smallest;
}

const joiner = (path1: string, path2: string): string => {
  return path.join(path1, path2).replaceAll("\\", "/");
}

const input = parseData();
console.log(`Solution 1: ${sol1(input)}`);
console.log(`Solution 2: ${sol2(input)}`);
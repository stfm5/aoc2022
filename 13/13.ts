import readInput from "../input.helper";
const runSample = false; 
type Pair = {
  first: any[],
  second: any[]
}
type Input = Pair[];

const parseData = (): Input => {
    console.time("parseData")
    let input: Pair[] = []
    let data = readInput(13,runSample).split("\n")

    for(let i = 0; i < data.length-1;i += 3) {
      let pair: Pair = {
        first: JSON.parse(data[i]),
        second: JSON.parse(data[i+1])
      }

      input.push(pair)
    }
    console.timeEnd("parseData")
    return input
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let isSame = 0;
  input.forEach((pair: Pair, index) => {
    let answer = checkArray(pair.first, pair.second)
    if(answer !== 'f') {
      isSame += (index + 1);
    }
  })
	console.timeEnd("sol1")
	return isSame;
}

const checkArray = (one: any[], two: any[], log=false) => {
  if(log) {
    console.log(JSON.stringify(one), JSON.stringify(two));
  }

  for(let i = 0; i < one.length; i++) {
    let f = one[i]
    let l = two[i]
    if(log) {
      console.log(`Checking ${JSON.stringify(one[i])} and ${JSON.stringify(two[i])}`)
    }
    if(two[i] === undefined) {
      return 'f'
    }

    const t1 = typeof f;
    const t2 = typeof l;
    if(t1 !== t2) {
      if(t1 === 'number') {
        one[i] = [f]
      } else {
        two[i] = [l]
      }

      i--;
      continue;
    }

    if(t1 === 'number') {
      if(f < l) {
        return 't';
      } else if(f > l) {
        return 'f'
      }
      continue;
    }

    if(t1 === 'object') {
      let answer = checkArray(f, l,log);
      if(answer !== 'c') {
        return answer;
      }
      continue
    }
  }
  if(log) {
    console.log('ran out');
  }
  if(one.length === two.length) {
    return 'c'
  } else {
    return 't'
  }
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let packets = [[[2]],[[6]]] 
  input.forEach((pair) => {
    packets.push(...[pair.first,pair.second])
  })
  let sorted = sort(packets)
  let multi = 1
  sorted.forEach((m, i) => {
    let k = Object.keys( m )[0]
    if(k === '[[2]]' || k === '[[6]]') {
      multi = multi * (i+1)
    }
  })
	console.timeEnd("sol2")
	return multi;
}

const sort = (arr: any[]) => {
  let mapArr:{[key: string]: number}[]= [] 
  for(let i = 0; i < arr.length; i++) {
    let map = {}
    let k = JSON.stringify(arr[i])
    map[k] = 0
    for(let j = 0; j< arr.length;j++) {
      if(i !== j ) {
        let copy = JSON.parse(JSON.stringify(arr))
        if(checkArray(copy[i], copy[j]) === 't') {
          map[k]++;
        }
      }
    }
    mapArr.push(map)
  }
  
  mapArr = mapArr.sort((a,b) => {
    return (Object.values(b)[0] - Object.values(a)[0])
  })
  return mapArr;
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
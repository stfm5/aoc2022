import readInput from "../input.helper";
const runSample = false; 

type Monkey = {
  id: number,
  items: number[]
  op: {
    type: string,
    val: number | string
  },
  test: {
    num: number,
    true: number,
    false: number
  }
  numTimes: number
}

type Input = {
  [key: number]: Monkey
} 

const parseData = (): Input => {
    console.time("parseData")
    let monkeys: Input = {}
    let monkeyArr = []
    let temp = []
    readInput(11,runSample).split("\n").forEach((line) => {
      if(line.length !== 0 ) {
        temp.push(line)
      } else {
        monkeyArr.push([...temp]);
        temp = []
      }
    });

    monkeyArr.push([...temp]);

    monkeyArr.forEach((mnk: string[]) => {
      let id= parseInt(mnk[0].match(/Monkey (\d+)/)[1])
      let items = mnk[1].match(/(\d+)/g).map((i) => parseInt(i));
      let opM = mnk[2].match(/new = old ([+*]) (old|\d+)/)
      let op = {
        type: opM[1],
        val: parseInt(opM[2]) ? parseInt(opM[2]) : opM[2]
      }
      let div = parseInt(mnk[3].match(/(\d+)/)[0]);
      let tString = parseInt(mnk[4].match(/(\d+)/)[0])
      let fString = parseInt(mnk[5].match(/(\d+)/)[0])
      let test = {
        num: div,
        true: tString,
        false: fString
      }
      monkeys[id] = {
        id,
        items,
        op,
        test,
        numTimes: 0
      }
    })
    console.timeEnd("parseData")
    return monkeys
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let round = 0; 
  while(round < 20) {
    Object.keys(input).forEach((k) => {
      const monkey: Monkey = input[k];
      monkey.items.forEach((item, index) => {
        let num = typeof(monkey.op.val) === 'string' ? item : monkey.op.val;
        let worryLevel = monkey.op.type === "*" ? item * num : item + num
        worryLevel = Math.floor(worryLevel/3);
        input[k].numTimes++;
        if((worryLevel % monkey.test.num) === 0) {
          (input[monkey.test.true].items as number[]).push(worryLevel);
        } else {
          (input[monkey.test.false].items as number[]).push(worryLevel)
        }
      })
      input[k].items = []
    }) 
    round++;
  }
  let mul = Object.keys(input).map((k) => {
    return input[k].numTimes
  }).sort((a,b) => b-a)
	console.timeEnd("sol1")
	return mul[0] * mul[1]
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let round = 0; 
  //kje se ubijam
  let maxNumber = Object.keys(input).map((k) => input[k].test.num).reduce(( p,c ) => p*c,1)

  while(round < 10000) {
    Object.keys(input).forEach((k) => {
      const monkey: Monkey = input[k];
      monkey.items.forEach((item) => {
        let num = typeof(monkey.op.val) === 'string' ? item : monkey.op.val;
        let worryLevel = monkey.op.type === "*" ? item * num : item + num
        worryLevel = worryLevel % maxNumber;
        input[k].numTimes++;
        if((worryLevel % monkey.test.num) === 0) {
          input[monkey.test.true].items.push(worryLevel);
        } else {
          input[monkey.test.false].items.push(worryLevel)
        }
      })

      input[k].items = []
    }) 
    round++;
  }
  let mul = Object.keys(input).map((k) => {
    return input[k].numTimes
  }).sort(( a,b ) => b-a) 
	console.timeEnd("sol2")
	return mul[0] * mul[1]
}

const input = parseData();
console.log(`Solution 1: ${sol1(JSON.parse(JSON.stringify(input)))}`);
console.log(`Solution 2: ${sol2(JSON.parse(JSON.stringify(input)))}`);
import readInput from "../input.helper";
const runSample = false; 
type Input = Game[];

const Moves = {
  "rock": 1,
  "paper": 2,
  "scissors": 3
}

const Outcomes = {
   "rock" : {
    "scissors": "w",
    "paper": "l"
  },
  "paper": {
    "rock": "w",
    "scissors": "l",
  },
  "scissors": {
    "paper": "w",
    "rock": "l"
  }
}

const Strategy = {
  "X": "l",
  "Y": "d",
  "Z": "w"
}

const Points = {
  "w": 6,
  "d": 3,
  "l": 0,
}

const Codes = {
  "A": "rock",
  "X": "rock",
  "B": "paper",
  "Y": "paper",
  "C": "scissors",
  "Z": "scissors"
}

type Game = string[]
const parseData = (): Input => {
    console.time("parseData")
    const input = readInput(2, runSample).split("\n").map((line) => line.split(" "));
    console.timeEnd("parseData")
    return input;
}

const sol1 = (input: Input) => {
	console.time("sol1")
  let points = 0
  input.forEach((game: Game) => {
    points += getWinner(game);
  })
	console.timeEnd("sol1")
	return points;
}

const sol2 = (input: Input) => {
	console.time("sol2")
  let points = 0
  input.forEach((game: Game) => {
    points += getWinner2(game);
  })
	console.timeEnd("sol2")
	return points;
}

const getWinner = (game: Game) => {
  const [p1, p2] = [Codes[game[0]], Codes[game[1]]];
  let points = Moves[p2];
  if(p1 === p2) {
    return points + 3;
  }

  return points + Points[Outcomes[p2][p1]];
}

const getWinner2 = (game: Game) => {
  let [p1, outcome] = [Codes[game[0]], game[1]];
  let points = Points[Strategy[outcome]];
  if(outcome === "Y") {
    return points + Moves[p1];
  }

  Object.keys(Outcomes[p1]).forEach(( key ) => {
    if(Outcomes[p1][key] !== Strategy[outcome]) {
      points += Moves[key]
    }
  })
  return points;
}

const input = parseData();
console.log(`Solution 1: ${sol1(input)}`);
console.log(`Solution 2: ${sol2(input)}`);
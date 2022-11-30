import { readFileSync } from 'fs';
const readInput = (day: number, runSample: boolean) => {
	return readFileSync(`${day}/${day}${runSample ? '_sample' : ''}.txt`).toString();
}

export default readInput;
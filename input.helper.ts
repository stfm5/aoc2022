import { readFileSync } from 'fs';
import path = require('path');
const readInput = (day: number, runSample: boolean) => {
  const file = path.normalize(`${day}/${day}${runSample ? '_sample' : ''}.txt`)
	return readFileSync(path.resolve(file)).toString();
}

export default readInput;
import {Position} from './position';

interface Move {
	from: Position;
	to: Position;
}

const createMove = (from: Position, to: Position) => ({from, to});

export {Move, createMove};

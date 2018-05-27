import {Board, createBoard} from './board';

interface Game {
	board: Board;
	undo: Board[];
	redo: Board[];
}

const createGame = (): Game => ({
	board: createBoard(),
	undo: [],
	redo: [],
});

export {createGame, Game};

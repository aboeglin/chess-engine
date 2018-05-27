import {Board, createBoard} from './board';
import {Player, makePlayer} from './player';

interface Game {
	board: Board;
	undo: Board[];
	redo: Board[];
	player1: Player;
	player2: Player;
}

const createGame = (player1: Player, player2: Player): Game => ({
	player1,
	player2,
	board: createBoard(),
	undo: [],
	redo: [],
});

export {createGame, Game};

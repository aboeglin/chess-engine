import {Board, createBoard, findPiece, removePieceAt} from './board';
import {Player} from './player';
import {Piece} from './pieces';
import {Move} from './move';
import {Position} from './position';
import {compose, concat} from './utils';

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

const move = (m: Move, game: Game): Game => {
	const pieceAtDestination = findPiece(m.to.x, m.to.y, game.board);
	const pieceToMove = findPiece(m.from.x, m.from.y, game.board);

	return {
		board: {
			pieces: compose(cConcat({...pieceToMove, x: m.to.x, y: m.to.y}), cRemovePieceAt(m.from), cRemovePieceAt(m.to))(game.board.pieces),
		},
		undo: concat(game.board, game.undo),
		redo: game.redo,
		player1: game.player1,
		player2: game.player2,
	};
};

const cRemovePieceAt =  (position: Position) => (pieces: Piece[]) => removePieceAt(position, pieces);
const cConcat = (value: any) => (arr: any[]) => concat(value, arr);

export {createGame, Game, move};

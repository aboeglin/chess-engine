import {numberToLetter} from './utils';

interface Square {
	x: string,
	y: string,
}

interface Board {
	squares: Square[],
};

const createBoard = () : Board => {
	return {
		squares: Array(64).fill('').map((_, index) => ({
			x: `${numberToLetter(Math.floor(index / 8))}`,
			y: `${index % 8 + 1}`,
		})),
	};
};

const getSquare = (x: string, y: string, board: Board) : Square =>
	board.squares.find((square: Square) => square.x === x && square.y === y);

export {createBoard, getSquare, Board, Square};

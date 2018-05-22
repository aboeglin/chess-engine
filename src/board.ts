import {Piece, PieceType, Color} from './pieces';
import {numberToLetter} from './utils';

interface Square {
	x: string,
	y: string,
}

interface Board {
	squares: Square[],
	pieces: Piece[],
};

const createBoard = () : Board => {
	return {
		squares: Array(64).fill('').map((_, index) => ({
			x: `${numberToLetter(Math.floor(index / 8))}`,
			y: `${index % 8 + 1}`,
		})),
		pieces: [
			...Array(8).fill({type: PieceType.PAWN, color: Color.WHITE}),
			...Array(2).fill({type: PieceType.KNIGHT, color: Color.WHITE}),
			...Array(6).fill({type: PieceType.BISHOP, color: Color.WHITE}),
			...Array(8).fill({type: PieceType.PAWN, color: Color.BLACK}),
			...Array(2).fill({type: PieceType.KNIGHT, color: Color.BLACK}),
			...Array(6).fill({type: PieceType.BISHOP, color: Color.BLACK}),
		],
	};
};

const getSquare = (x: string, y: string, board: Board) : Square =>
	board.squares.find((square: Square) => square.x === x && square.y === y);

export {createBoard, getSquare, Board, Square};

import {Piece, PieceType, Color} from './pieces';
import {numberToLetter} from './utils';


interface Board {
	pieces: Piece[],
};

const createBoard = () : Board => {
	return {
		pieces: [
			...Array(8).fill({type: PieceType.PAWN, color: Color.WHITE}).map(appendInitialPosition),
			...Array(2).fill({type: PieceType.KNIGHT, color: Color.WHITE}),
			...Array(2).fill({type: PieceType.BISHOP, color: Color.WHITE}),
			...Array(2).fill({type: PieceType.ROOK, color: Color.WHITE}),
			...Array(1).fill({type: PieceType.QUEEN, color: Color.WHITE}),
			...Array(1).fill({type: PieceType.KING, color: Color.WHITE}),
			...Array(8).fill({type: PieceType.PAWN, color: Color.BLACK}).map(appendInitialPosition),
			...Array(2).fill({type: PieceType.KNIGHT, color: Color.BLACK}),
			...Array(2).fill({type: PieceType.BISHOP, color: Color.BLACK}),
			...Array(2).fill({type: PieceType.ROOK, color: Color.BLACK}),
			...Array(1).fill({type: PieceType.QUEEN, color: Color.BLACK}),
			...Array(1).fill({type: PieceType.KING, color: Color.BLACK}),
		],
	};
};

const appendInitialPosition = (piece: Piece, index: number) => {
	switch(piece.type) {
		case PieceType.PAWN:
			return {
				...piece,
				x: numberToLetter(index),
				y: piece.color === Color.WHITE ? '2' : '7',
			}
		default:
			return {
				...piece,
				x: 'a',
				y: '1',
			};
	}
};

const findPiece = (x: string, y: string, board: Board) : Piece =>
	board.pieces.find((piece: Piece) => piece.x === x && piece.y === y);

export {createBoard, findPiece, Board};

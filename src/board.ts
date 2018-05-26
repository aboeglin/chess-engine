import {Piece, PieceType, Color} from './pieces';
import {numberToLetter} from './utils';


interface Board {
	pieces: Piece[];
}

/**
 * Creates an initial board
 *
 * @return a board with pieces at their initial positions.
 */
const createBoard = () : Board => {
	return {
		pieces: [
			...Array(8).fill({type: PieceType.PAWN, color: Color.WHITE}).map(appendInitialPosition),
			...Array(2).fill({type: PieceType.KNIGHT, color: Color.WHITE}).map(appendInitialPosition),
			...Array(2).fill({type: PieceType.BISHOP, color: Color.WHITE}).map(appendInitialPosition),
			...Array(2).fill({type: PieceType.ROOK, color: Color.WHITE}).map(appendInitialPosition),
			...Array(1).fill({type: PieceType.QUEEN, color: Color.WHITE}).map(appendInitialPosition),
			...Array(1).fill({type: PieceType.KING, color: Color.WHITE}).map(appendInitialPosition),
			...Array(8).fill({type: PieceType.PAWN, color: Color.BLACK}).map(appendInitialPosition),
			...Array(2).fill({type: PieceType.KNIGHT, color: Color.BLACK}).map(appendInitialPosition),
			...Array(2).fill({type: PieceType.BISHOP, color: Color.BLACK}).map(appendInitialPosition),
			...Array(2).fill({type: PieceType.ROOK, color: Color.BLACK}).map(appendInitialPosition),
			...Array(1).fill({type: PieceType.QUEEN, color: Color.BLACK}).map(appendInitialPosition),
			...Array(1).fill({type: PieceType.KING, color: Color.BLACK}).map(appendInitialPosition),
		],
	};
};

const appendInitialPosition = (piece: Piece, index: number) => {
	switch (piece.type) {
		case PieceType.PAWN:
			return {
				...piece,
				x: numberToLetter(index + 1),
				y: piece.color === Color.WHITE ? '2' : '7',
			};
		case PieceType.KNIGHT:
			return {
				...piece,
				x: numberToLetter(2 + index * 5),
				y: piece.color === Color.WHITE ? '1' : '8',
			};
		case PieceType.BISHOP:
			return {
				...piece,
				x: numberToLetter(3 + index * 3),
				y: piece.color === Color.WHITE ? '1' : '8',
			};
		case PieceType.ROOK:
			return {
				...piece,
				x: numberToLetter(1 + index * 7),
				y: piece.color === Color.WHITE ? '1' : '8',
			};
		case PieceType.QUEEN:
			return {
				...piece,
				x: 'd',
				y: piece.color === Color.WHITE ? '1' : '8',
			};
		case PieceType.KING:
			return {
				...piece,
				x: 'e',
				y: piece.color === Color.WHITE ? '1' : '8',
			};
		default:
			return {
				...piece,
				x: 'a',
				y: '1',
			};
	}
};

/**
 * Retrieves a piece at the given coordinate in the given board.
 *
 * @return the piece found in the given board at the given x and y coordinates. It returns undefined if no piece is at that coordinate.
 */
const findPiece = (x: string, y: string, board: Board) : Piece =>
	board.pieces.find((piece: Piece) => piece.x === x && piece.y === y);

export {createBoard, findPiece, Board};

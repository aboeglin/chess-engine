import {Board, findPiece} from './board';
import {Piece, PieceType} from './pieces';
import {getDeltaX, getDeltaY, letterToNumber, numberToLetter} from './utils';
import {Position} from './position';
import {Color} from './color';

/**
 * A utility function that returns true if a piece can move to a certain place,
 * or false otherwise. This function implements the movement rules for the game.
 *
 * @return true if the given piece from the given board can move to the x and y coordinates
 */
const canMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	if (piece.type === PieceType.PAWN) return canPawnMoveTo(x, y, piece, board);
	if (piece.type === PieceType.BISHOP) return canBishopMoveTo(x, y, piece, board);
	if (piece.type === PieceType.KNIGHT) return canKnightMoveTo(x, y, piece, board);
	if (piece.type === PieceType.ROOK) return canRookMoveTo(x, y, piece, board);
	if (piece.type === PieceType.QUEEN) return canQueenMoveTo(x, y, piece, board);
	if (piece.type === PieceType.KING) return canKingMoveTo(x, y, piece, board);
};

const canPawnMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	const pieceAtDestination: Piece = findPiece(x, y, board);
	return (
		// white pawn moves one step
		parseInt(y) - parseInt(piece.y) === 1 && x === piece.x && piece.color === Color.WHITE && !pieceAtDestination ||
		// black pawn moves one step
		parseInt(y) - parseInt(piece.y) === -1 && x === piece.x && piece.color === Color.BLACK && !pieceAtDestination ||
		// white pawn moves two steps
		parseInt(y) - parseInt(piece.y) === 2 && x === piece.x && piece.color === Color.WHITE && (piece.y === '2' || piece.y === '7')
		&& !findPiece(x, `${parseInt(y) - 1}`, board) && !pieceAtDestination ||
		// black pawn moves two steps
		parseInt(y) - parseInt(piece.y) === -2 && x === piece.x && piece.color === Color.BLACK && (piece.y === '2' || piece.y === '7')
		&& !findPiece(x, `${parseInt(y) + 1}`, board) && !pieceAtDestination ||
		// white pawn attacks in diagonal
		parseInt(y) - parseInt(piece.y) === 1 && Math.abs(x.charCodeAt(0) - piece.x.charCodeAt(0)) === 1
		&& pieceAtDestination !== undefined && pieceAtDestination.color === Color.BLACK ||
		// black pawn attacks in diagonal
		parseInt(y) - parseInt(piece.y) === -1 && Math.abs(x.charCodeAt(0) - piece.x.charCodeAt(0)) === 1
		&& pieceAtDestination !== undefined && pieceAtDestination.color === Color.WHITE
	);
};

const canBishopMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	const pieceAtDestination: Piece = findPiece(x, y, board);
	const dx: number = getDeltaX(x, piece.x);
	const dy: number = getDeltaX(y, piece.y);

	const positionsOnTrajectory = getBishopTrajectory(x, y, piece.x, piece.y);

	return (
		// bishop goes in diagonal
		dx === dy
		// bishop cannot go beyond another piece
		&& !positionsOnTrajectory.find((position: Position) => findPiece(position.x, position.y, board) !== undefined)
		// bishop cannot attack a piece of the same color
		&& (!pieceAtDestination || pieceAtDestination && pieceAtDestination.color !== piece.color)
	);
};

const getBishopTrajectory = (x1: string, y1: string, x2: string, y2: string) : {x: string, y: string}[] => {
	const xDirection: number = letterToNumber(x1) - letterToNumber(x2) > 0 ? 1 : -1;
	const yDirection: number = parseInt(y1) - parseInt(y2) > 0 ? 1 : -1;
	const dy = getDeltaY(y1, y2);

	return Array(Math.max(dy - 1, 0)).fill({}).map((_, index) => ({
		x: numberToLetter((index + 1) * xDirection + letterToNumber(x2)),
		y: `${(index + 1) * yDirection + parseInt(y2)}`,
	}));
};

const canKnightMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	const pieceAtDestination: Piece = findPiece(x, y, board);

	return ((
		getDeltaX(x, piece.x) === 2 && getDeltaY(y, piece.y) === 1 ||
		getDeltaX(x, piece.x) === 1 && getDeltaY(y, piece.y) === 2
	) && (!pieceAtDestination || pieceAtDestination && pieceAtDestination.color !== piece.color));
};

const canRookMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	const pieceAtDestination: Piece = findPiece(x, y, board);
	const dx: number = getDeltaX(x, piece.x);
	const dy: number = getDeltaX(y, piece.y);

	const positionsOnTrajectory = getRookTrajectory(x, y, piece.x, piece.y);

	return (
		// rook is going straight
		(dx === 0 && dy > 0 || dx > 0 && dy === 0)
		// rook cannot go beyond another piece
		&& !positionsOnTrajectory.find((position: Position) => findPiece(position.x, position.y, board) !== undefined)
		// rook cannot attack a piece of the same color
		&& (!pieceAtDestination || pieceAtDestination && pieceAtDestination.color !== piece.color)
	);
};

const getRookTrajectory = (x1: string, y1: string, x2: string, y2: string) : {x: string, y: string}[] => {
	const dx = getDeltaX(x1, x2);
	const dy = getDeltaY(y1, y2);
	const xDirection: number = letterToNumber(x1) - letterToNumber(x2) > 0 ? 1 : -1;
	const yDirection: number = parseInt(y1) - parseInt(y2) > 0 ? 1 : -1;

	return dx > 0
		? Array(Math.max(dx - 1, 0)).fill({}).map((_, index) => ({x: numberToLetter((index + 1) * xDirection + letterToNumber(x2)), y: y1}))
		: Array(Math.max(dy - 1, 0)).fill({}).map((_, index) => ({x: x1, y: `${(index + 1) * yDirection + parseInt(y2)}`}));
};

const canQueenMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean =>
	canRookMoveTo(x, y, piece, board) || canBishopMoveTo(x, y, piece, board);

const canKingMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	const pieceAtDestination: Piece = findPiece(x, y, board);

	return (
		// king moves to a neighbour square
		(getDeltaX(x, piece.x) === 1 || getDeltaY(y, piece.y) === 1)
		// king cannot attack a piece of the same color
		&& (!pieceAtDestination || pieceAtDestination && pieceAtDestination.color !== piece.color)
	);
};

export {canMoveTo};

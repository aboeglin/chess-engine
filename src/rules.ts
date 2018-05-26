import {Board, findPiece} from './board';
import {Piece, PieceType, Color} from './pieces';
import {getDeltaX, getDeltaY, letterToNumber, numberToLetter} from './utils';

/**
 * A utility function that returns true if a piece can move to a certain place,
 * or false otherwise. This function implements the movement rules for the game.
 *
 * @return true if the given piece from the given board can move to the x and y coordinates
 */
const canMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	if (piece.type === PieceType.PAWN) return canPawnMoveTo(x, y, piece, board);
	if (piece.type === PieceType.BISHOP) return canBishopMoveTo(x, y, piece, board);
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

	const positionsOnTrajectory = Array(dx - 1).fill({}).map((_, index) => {
		const xDirection: number = letterToNumber(x) - letterToNumber(piece.x);
		const yDirection: number = parseInt(y) - parseInt(piece.y);

		return {
			x: xDirection > 0 ? numberToLetter(index + 1 + letterToNumber(piece.x)) : numberToLetter(-index - 1 + letterToNumber(piece.x)),
			y: yDirection > 0 ? `${index + 1 + parseInt(piece.y)}` : `${-index - 1 + parseInt(piece.y)}`,
		};
	});

	return (
		// bishop goes in diagonal
		dx === dy
		// bishop cannot go beyond another piece
		&& !positionsOnTrajectory.find((position: {x: string, y: string}) => findPiece(position.x, position.y, board) !== undefined)
		// bishop cannot attack a piece of the same color
		&& (!pieceAtDestination || pieceAtDestination && pieceAtDestination.color !== piece.color)
	);
};

export {canMoveTo};

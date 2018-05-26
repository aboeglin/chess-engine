import {Board, findPiece} from './board';
import {Piece, PieceType, Color} from './pieces';
import {getDeltaX, getDeltaY} from './utils';

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
	const pieceInDestination = findPiece(x, y, board);
	return (
		// white pawn moves one step
		parseInt(y) - parseInt(piece.y) === 1 && x === piece.x && piece.color === Color.WHITE && !pieceInDestination ||
		// black pawn moves one step
		parseInt(y) - parseInt(piece.y) === -1 && x === piece.x && piece.color === Color.BLACK && !pieceInDestination ||
		// white pawn moves two steps
		parseInt(y) - parseInt(piece.y) === 2 && x === piece.x && piece.color === Color.WHITE && (piece.y === '2' || piece.y === '7')
		&& !findPiece(x, `${parseInt(y) - 1}`, board) && !pieceInDestination ||
		// black pawn moves two steps
		parseInt(y) - parseInt(piece.y) === -2 && x === piece.x && piece.color === Color.BLACK && (piece.y === '2' || piece.y === '7')
		&& !findPiece(x, `${parseInt(y) + 1}`, board) && !pieceInDestination ||
		// white pawn attacks in diagonal
		parseInt(y) - parseInt(piece.y) === 1 && Math.abs(x.charCodeAt(0) - piece.x.charCodeAt(0)) === 1
		&& pieceInDestination !== undefined && pieceInDestination.color === Color.BLACK ||
		// black pawn attacks in diagonal
		parseInt(y) - parseInt(piece.y) === -1 && Math.abs(x.charCodeAt(0) - piece.x.charCodeAt(0)) === 1
		&& pieceInDestination !== undefined && pieceInDestination.color === Color.WHITE
	);
};

const canBishopMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	const dx = getDeltaX(x, piece.x);
	const dy = getDeltaX(y, piece.y);

	return dx === dy;
};

export {canMoveTo};

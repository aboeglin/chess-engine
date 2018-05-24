import {Board, findPiece} from './board';
import {Piece, PieceType, Color} from './pieces';

/**
 * A utility function that returns true if a piece can move to a certain place,
 * or false otherwise. This function implements the movement rules for the game.
 *
 * @return true if the given piece from the given board can move to the x and y coordinates
 */
const canMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	if (piece.type === PieceType.PAWN) {
		return canPawnMoveTo(x, y, piece, board);
	}
};

const canPawnMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean =>
	// white pawn moves one step
	parseInt(y) - parseInt(piece.y) === 1 && piece.color === Color.WHITE && !findPiece(x, y, board) ||
	// black pawn moves one step
	parseInt(y) - parseInt(piece.y) === -1 && piece.color === Color.BLACK && !findPiece(x, y, board) ||
	// white pawn moves two steps
	parseInt(y) - parseInt(piece.y) === 2 && piece.color === Color.WHITE && (piece.y === '2' || piece.y === '7')
	&& !findPiece(x, `${parseInt(y) - 1}`, board) && !findPiece(x, y, board) ||
	// black pawn moves two steps
	parseInt(y) - parseInt(piece.y) === -2 && piece.color === Color.BLACK && (piece.y === '2' || piece.y === '7')
	&& !findPiece(x, `${parseInt(y) + 1}`, board) && !findPiece(x, y, board);

export {canMoveTo};

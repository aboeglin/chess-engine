import {Board, findPiece} from './board';
import {Piece, PieceType, Color} from './pieces';

const canMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	if (piece.type === PieceType.PAWN) {
		return canPawnMoveTo(x, y, piece, board);
	}
};

const canPawnMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean =>
	(
		parseInt(y) - parseInt(piece.y) === 1 && piece.color === Color.WHITE ||
		parseInt(y) - parseInt(piece.y) === -1 && piece.color === Color.BLACK
	) && !findPiece(x, y, board)
	|| (piece.y === '2' || piece.y === '7') && parseInt(y) - parseInt(piece.y) === 2 && piece.color === Color.WHITE
	|| (piece.y === '2' || piece.y === '7') && parseInt(y) - parseInt(piece.y) === -2 && piece.color === Color.BLACK;

export {canMoveTo};

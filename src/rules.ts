import {Board, findPiece} from './board';
import {Piece, PieceType, Color} from './pieces';

const canMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean => {
	if (piece.type === PieceType.PAWN) {
		return canPawnMoveTo(x, y, piece, board);
	}
};

const canPawnMoveTo = (x: string, y: string, piece: Piece, board: Board): boolean =>
	parseInt(y) - parseInt(piece.y) === 1 && piece.color === Color.WHITE && !findPiece(x, y, board)
	|| parseInt(y) - parseInt(piece.y) === -1 && piece.color === Color.BLACK && !findPiece(x, y, board)
	|| (piece.y === '2' || piece.y === '7') && parseInt(y) - parseInt(piece.y) === 2 && piece.color === Color.WHITE
		&& !findPiece(x, `${parseInt(y) - 1}`, board) && !findPiece(x, y, board)
	|| (piece.y === '2' || piece.y === '7') && parseInt(y) - parseInt(piece.y) === -2 && piece.color === Color.BLACK
		&& !findPiece(x, `${parseInt(y) + 1}`, board) && !findPiece(x, y, board);

export {canMoveTo};

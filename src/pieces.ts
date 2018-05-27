import {Color} from './color';

enum PieceType {
	PAWN = 'PAWN',
	KNIGHT = 'KNIGHT',
	BISHOP = 'BISHOP',
	ROOK = 'ROOK',
	QUEEN = 'QUEEN',
	KING = 'KING',
}

interface Piece {
	type: PieceType;
	color: Color;
	x: string;
	y: string;
}

export {Piece, PieceType};

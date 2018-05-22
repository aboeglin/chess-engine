enum PieceType {
	PAWN = 'PAWN',
	KNIGHT = 'KNIGHT',
	BISHOP = 'BISHOP',
	ROOK = 'ROOK',
	QUEEN = 'QUEEN',
	KING = 'KING',
};

enum Color {
	BLACK = 'BLACK',
	WHITE = 'WHITE',
};

interface Piece {
	type: PieceType,
	color: Color,
};

export {Piece, PieceType, Color};

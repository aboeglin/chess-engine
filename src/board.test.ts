import {createBoard, findPiece, Board} from './board';
import {Piece, Color, PieceType} from './pieces';

describe('board', () => {

	describe('createBoard', () => {
		it('should export a createBoard function', () => {
			expect(typeof createBoard).toBe('function');
		});

		it('should return a Board object', () => {
			const board: Board = createBoard();

			expect(board.pieces.length).toBe(32);
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.WHITE).length).toBe(16);

			// We should have 8 white pawns
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.WHITE && piece.type === PieceType.PAWN).length).toBe(8);
			// We should have 8 black pawns
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.BLACK && piece.type === PieceType.PAWN).length).toBe(8);

			// We should have 2 white knights
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.WHITE && piece.type === PieceType.KNIGHT).length).toBe(2);
			// We should have 2 black knights
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.BLACK && piece.type === PieceType.KNIGHT).length).toBe(2);

			// We should have 2 white bishops
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.WHITE && piece.type === PieceType.BISHOP).length).toBe(2);
			// We should have 2 black bishops
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.BLACK && piece.type === PieceType.BISHOP).length).toBe(2);

			// We should have 2 white rooks
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.WHITE && piece.type === PieceType.ROOK).length).toBe(2);
			// We should have 2 black rooks
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.BLACK && piece.type === PieceType.ROOK).length).toBe(2);

			// We should have 1 white queen
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.WHITE && piece.type === PieceType.QUEEN).length).toBe(1);
			// We should have 1 black queen
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.BLACK && piece.type === PieceType.QUEEN).length).toBe(1);

			// We should have 1 white king
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.WHITE && piece.type === PieceType.KING).length).toBe(1);
			// We should have 1 black king
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.BLACK && piece.type === PieceType.KING).length).toBe(1);
		});

		it('should return a board with pieces at the initial position', () => {
			const board: Board = createBoard();

			board.pieces.filter(piece => piece.type === PieceType.PAWN && piece.color === Color.WHITE).forEach((piece) => {
				const whitePawnXPositions: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

				expect(whitePawnXPositions.findIndex((x: string) => x === piece.x && piece.y === '2')).not.toEqual(-1);
			});
		});
	})

	describe('findPiece', () => {
		it('should export a findPiece function', () => {
			expect(typeof findPiece).toBe('function');
		});

		it('should return the corresponding piece in a7', () => {
			const board: Board = createBoard();
			const piece: Piece = findPiece('a', '7', board);

			expect(piece.x).toBe('a');
			expect(piece.y).toBe('7');
		});

		it('should return the corresponding piece in f2', () => {
			const board: Board = createBoard();
			const piece: Piece = findPiece('f', '2', board);

			expect(piece.x).toBe('f');
			expect(piece.y).toBe('2');
		});
	});

});

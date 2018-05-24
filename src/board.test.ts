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

		it('should return a board with pawns at the initial position', () => {
			const board: Board = createBoard();

			board.pieces.filter((piece: Piece) => piece.type === PieceType.PAWN).forEach((piece) => {
				const pawnXPositions: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

				expect(pawnXPositions.findIndex((x: string) =>
					x === piece.x && piece.y === '2' && piece.color === Color.WHITE ||
					x === piece.x && piece.y === '7' && piece.color === Color.BLACK
				)).not.toEqual(-1);
			});
		});

		it('should return a board with knights at the initial position', () => {
			const board: Board = createBoard();

			board.pieces.filter((piece: Piece) => piece.type === PieceType.KNIGHT).forEach((piece) => {
				const knightXPositions: string[] = ['b', 'g'];

				expect(knightXPositions.findIndex((x: string) =>
					x === piece.x && piece.y === '1' && piece.color === Color.WHITE ||
					x === piece.x && piece.y === '8' && piece.color === Color.BLACK
				)).not.toEqual(-1);
			});
		});

		it('should return a board with bishops at the initial position', () => {
			const board: Board = createBoard();

			board.pieces.filter((piece: Piece) => piece.type === PieceType.BISHOP).forEach((piece) => {
				const bishopXPositions: string[] = ['c', 'f'];

				expect(bishopXPositions.findIndex((x: string) =>
					x === piece.x && piece.y === '1' && piece.color === Color.WHITE ||
					x === piece.x && piece.y === '8' && piece.color === Color.BLACK
				)).not.toEqual(-1);
			});
		});

		it('should return a board with rooks at the initial position', () => {
			const board: Board = createBoard();

			board.pieces.filter((piece: Piece) => piece.type === PieceType.ROOK).forEach((piece) => {
				const rookXPositions: string[] = ['a', 'h'];

				expect(rookXPositions.findIndex((x: string) =>
					x === piece.x && piece.y === '1' && piece.color === Color.WHITE ||
					x === piece.x && piece.y === '8' && piece.color === Color.BLACK
				)).not.toEqual(-1);
			});
		});

		it('should return a board with queens at the initial position', () => {
			const board: Board = createBoard();

			board.pieces.filter((piece: Piece) => piece.type === PieceType.QUEEN).forEach((piece) => {
				expect(
					piece.color === Color.WHITE && piece.x === 'd' && piece.y === '1' ||
					piece.color === Color.BLACK && piece.x === 'd' && piece.y === '8'
				).toBe(true);
			});
		});

		it('should return a board with kings at the initial position', () => {
			const board: Board = createBoard();

			board.pieces.filter((piece: Piece) => piece.type === PieceType.KING).forEach((piece) => {
				expect(
					piece.color === Color.WHITE && piece.x === 'e' && piece.y === '1' ||
					piece.color === Color.BLACK && piece.x === 'e' && piece.y === '8'
				).toBe(true);
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

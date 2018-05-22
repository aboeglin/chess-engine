import {createBoard, getSquare, Board, Square} from './board';
import {Piece, Color, PieceType} from './pieces';

describe('board', () => {

	describe('createBoard', () => {
		it('should export a createBoard function', () => {
			expect(typeof createBoard).toBe('function');
		});

		it('should return a Board object', () => {
			const board: Board = createBoard();

			expect(board.squares.find((s: Square) => s.x === 'a' && s.y === '1')).not.toBe(undefined);
			expect(board.squares.find((s: Square) => s.x === 'h' && s.y === '8')).not.toBe(undefined);
			expect(board.squares.find((s: Square) => s.x === 'a' && s.y === '0')).toBe(undefined);
			expect(board.squares.find((s: Square) => s.x === 'i' && s.y === '1')).toBe(undefined);
		});

		it('should return a Board object containing 32 pieces', () => {
			const board: Board = createBoard();
			expect(board.pieces.length).toBe(32);
		});

		it('should return a Board object containing 16 white pieces', () => {
			const board: Board = createBoard();
			expect(board.pieces.filter((piece: Piece) => piece.color === Color.WHITE).length).toBe(16);
		});
	})

	describe('getSquare', () => {
		it('should export a getSquare function', () => {
			expect(typeof getSquare).toBe('function');
		});

		it('should return the corresponding square in a7', () => {
			const board: Board = createBoard();
			const piece: Square = getSquare('a', '7', board);

			expect(piece.x).toBe('a');
			expect(piece.y).toBe('7');
		});

		it('should return the corresponding square in f2', () => {
			const board: Board = createBoard();
			const piece: Square = getSquare('f', '2', board);

			expect(piece.x).toBe('f');
			expect(piece.y).toBe('2');
		});
	});

});

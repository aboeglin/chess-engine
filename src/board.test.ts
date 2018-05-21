import {createBoard, Board, Square} from './board';

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
	})


});

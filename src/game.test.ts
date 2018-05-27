import {Game, createGame} from './game';

describe('game', () => {
	describe('createGame', () => {
		it('should export a createGame function', () => {
			expect(typeof createGame).toBe('function');
		});

		it('should return a fresh Game object', () => {
			const game: Game = createGame();

			expect(game.board.pieces.length).toBe(32);
			expect(game.undo).toEqual([]);
			expect(game.redo).toEqual([]);
		});
	});
});

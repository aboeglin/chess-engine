import {Game, createGame, move} from './game';
import {Player, createPlayer} from './player';
import {findPiece} from './board';
import {PieceType} from './pieces';
import {Move, createMove} from './move';
import {createPosition} from './position';
import {Color} from './color';

describe('game', () => {
	describe('createGame', () => {
		it('should export a createGame function', () => {
			expect(typeof createGame).toBe('function');
		});

		it('should return a fresh Game object', () => {
			const p1: Player = createPlayer('id-1', Color.WHITE);
			const p2: Player = createPlayer('id-2', Color.BLACK);

			const game: Game = createGame(p1, p2);

			expect(game.board.pieces.length).toBe(32);
			expect(game.undo).toEqual([]);
			expect(game.redo).toEqual([]);
			expect(game.player1).toBe(p1);
			expect(game.player2).toBe(p2);
		});
	});
});

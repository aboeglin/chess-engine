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

	describe('move', () => {
		it('should export a function move', () => {
			expect(typeof move).toBe('function');
		});

		it('should return a game object', () => {
			const p1: Player = createPlayer('id-1', Color.WHITE);
			const p2: Player = createPlayer('id-2', Color.BLACK);

			const game: Game = createGame(p1, p2);
			const afterMove: Game = move(createMove({x: 'd', y: '2'}, {x: 'd', y: '4'}), game);

			expect(findPiece('d', '4', afterMove.board)).toEqual({type: PieceType.PAWN, color: Color.WHITE, x: 'd', y:'4'});
		});

		it('should remove a piece that has been killed', () => {
			const p1: Player = createPlayer('id-1', Color.WHITE);
			const p2: Player = createPlayer('id-2', Color.BLACK);

			const game: Game = createGame(p1, p2);
			const afterFirstMove: Game = move(createMove({x: 'd', y: '2'}, {x: 'd', y: '4'}), game);
			const afterSecondMove: Game = move(createMove({x: 'e', y: '7'}, {x: 'e', y: '5'}), afterFirstMove);
			const afterThirdMove: Game = move(createMove({x: 'd', y: '4'}, {x: 'e', y: '5'}), afterSecondMove);

			expect(findPiece('e', '5', afterThirdMove.board)).toEqual({type: PieceType.PAWN, color: Color.WHITE, x: 'e', y:'5'});
		});
	});
});

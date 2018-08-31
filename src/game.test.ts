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
		const p1: Player = createPlayer('id-1', Color.WHITE);
		const p2: Player = createPlayer('id-2', Color.BLACK);
		const game: Game = createGame(p1, p2);

		it('should export a function move', () => {
			expect(typeof move).toBe('function');
		});

		it('should return a game object', (done) => {
			move(createMove({x: 'd', y: '2'}, {x: 'd', y: '4'}), game).then((g: Game) => {
				expect(findPiece('d', '4', g.board)).toEqual({type: PieceType.PAWN, color: Color.WHITE, x: 'd', y:'4'});
				done();
			});
		});

		it('should remove a piece that has been killed', () => {
			move(createMove({x: 'd', y: '2'}, {x: 'd', y: '4'}), game).then((g: Game) => {
				move(createMove({x: 'e', y: '7'}, {x: 'e', y: '5'}), g).then((g: Game) => {
					move(createMove({x: 'd', y: '4'}, {x: 'e', y: '5'}), g).then((g: Game) => {
						expect(findPiece('e', '5', g.board)).toEqual({type: PieceType.PAWN, color: Color.WHITE, x: 'e', y:'5'});
					});
				});
			});
		});

		it('should should store the previous board in the undo array', () => {
			move(createMove({x: 'd', y: '2'}, {x: 'd', y: '4'}), game).then((g: Game) => {
				expect(g.undo[0]).toBe(game.board);
			});
		});

		it('should return stuff (to define) when the first piece to move is black', () => {

		});
	});
});

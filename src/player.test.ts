import {createPlayer, Player} from './player';
import {Color} from './color';

describe('player', () => {
	describe('createPlayer', () => {
		it('should export a function createPlayer', () => {
			expect(typeof createPlayer).toBe('function');
		});

		it('should make a player object from the given parameters', () => {
			const player: Player = createPlayer('id-1', Color.BLACK);

			expect(player.id).toBe('id-1');
			expect(player.color).toBe(Color.BLACK);
		});
	});
});

import {makePlayer, Player} from './player';
import {Color} from './color';

describe('player', () => {
	describe('makePlayer', () => {
		it('should export a function makePlayer', () => {
			expect(typeof makePlayer).toBe('function');
		});

		it('should make a player object from the given parameters', () => {
			const player: Player = makePlayer('id-1', Color.BLACK);

			expect(player.id).toBe('id-1');
			expect(player.color).toBe(Color.BLACK);
		});
	});
});

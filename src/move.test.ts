import {Move, createMove} from './move';
import {createPosition} from './position';

describe('move', () => {
	describe('createMove', () => {
		it('should export a function createMove', () => {
			expect(typeof createMove).toBe('function');
		});

		it('should return a corresponding Move object', () => {
			const move: Move = createMove({x:'d', y: '2'}, {x: 'd', y: '4'});

			expect(move.from.x).toBe('d');
			expect(move.from.y).toBe('2');
			expect(move.to.x).toBe('d');
			expect(move.to.y).toBe('4');
		});
	});
});

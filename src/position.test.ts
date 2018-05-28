import {Position, createPosition} from './position';

describe('position', () => {
	describe('createPosition - a factory for positions', () => {
		it('should export a function createPosition', () => {
			expect(typeof createPosition).toBe('function');
		});

		it('should return a position object from the given parameters', () => {
			const position: Position = createPosition('d', '3');
			expect(position).toEqual({x: 'd', y: '3'});
		});
	});
});

import {makePosition, Position} from './position';

describe('position', () => {
	describe('makePosition - a factory for positions', () => {
		it('should export a function makePosition', () => {
			expect(typeof makePosition).toBe('function');
		});

		it('should return a position object from the given parameters', () => {
			const position: Position = makePosition('d', '3');
			expect(position).toEqual({x: 'd', y: '3'});
		});
	});
});

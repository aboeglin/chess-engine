import {numberToLetter} from './utils';

describe('utils', () => {
	describe('numberToLetter', () => {
		it('should export a numberToLetter function', () => {
			expect(typeof numberToLetter).toBe('function');
		});

		it(`should return a letter for a given number with the following shape:
				0 -> a
				1 -> b
				4 -> e
				...`, () => {
			expect(numberToLetter(0)).toBe('a');
			expect(numberToLetter(1)).toBe('b');
			expect(numberToLetter(4)).toBe('e');
		});
	});
});

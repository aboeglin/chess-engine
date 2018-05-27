import {numberToLetter, letterToNumber, positionToVector, getDelta, getDeltaX, getDeltaY} from './utils';
import {makePosition} from './position';

describe('utils', () => {
	describe('numberToLetter', () => {
		it('should export a numberToLetter function', () => {
			expect(typeof numberToLetter).toBe('function');
		});

		it(`should return a letter for a given number with the following shape: 1 -> a, 2 -> b, 5 -> e, ...`, () => {
			expect(numberToLetter(1)).toBe('a');
			expect(numberToLetter(2)).toBe('b');
			expect(numberToLetter(5)).toBe('e');
		});
	});

	describe('letterToNumber', () => {
		it('should export a letterToNumber function', () => {
			expect(typeof letterToNumber).toBe('function');
		});

		it(`should return a number for a given letter with the following shape: a -> 1, b -> 2, e -> 5, ...`, () => {
			expect(letterToNumber('a')).toBe(1);
			expect(letterToNumber('b')).toBe(2);
			expect(letterToNumber('e')).toBe(5);
		});
	});

	describe('coordinateToNumbers', () => {
		it('should export a coordinateToNumbers function', () => {
			expect(typeof positionToVector).toBe('function');
		});

		it('should return {x:1, y:3} for parameters a, 3', () => {
			expect(positionToVector(makePosition('a', '3'))).toEqual({x:1, y:3});
		});
	});

	describe('getDeltaX', () => {
		it('should export a getDeltaX function', () => {
			expect(typeof getDeltaX).toBe('function');
		});

		it('should return 3 for parameters a, d', () => {
			expect(getDeltaX('a', 'd')).toBe(3);
		});

		it('should return 6 for parameters b, h', () => {
			expect(getDeltaX('b', 'h')).toBe(6);
		});
	});

	describe('getDeltaY', () => {
		it('should export a getDeltaY function', () => {
			expect(typeof getDeltaY).toBe('function');
		});

		it('should return 3 for parameters 1, 4', () => {
			expect(getDeltaY('1', '4')).toBe(3);
		});
	});
});

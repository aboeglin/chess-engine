import {Color, getRandomColor} from './color';

describe('color', () => {
	describe('getRandomColor', () => {
		it('should export a function getRandomColor', () => {
			expect(typeof getRandomColor).toBe('function');
		});

		it('should return WHITE when it generates a random number above 0.5', () => {
			const originalRandom = Math.random;

			Math.random = () => 0.7;
			expect(getRandomColor()).toBe(Color.WHITE);

			Math.random = originalRandom;
		});

		it('should return BLACK when it generates a random number below 0.5', () => {
			const originalRandom = Math.random;

			Math.random = () => 0.3;
			expect(getRandomColor()).toBe(Color.BLACK);

			Math.random = originalRandom;
		});
	});
});

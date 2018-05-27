const numberToLetter = (number: number): string => String.fromCharCode(96 + number);

const letterToNumber = (x:string): number => x.charCodeAt(0) - 96;

const coordinateToNumbers = (x: string, y: string): {x: number, y: number} => ({
	x: letterToNumber(x),
	y: parseInt(y),
});

const getDelta = (x1: number, x2: number): number => Math.abs(x1 - x2);

const getDeltaX = (x1: string, x2: string): number => getDelta(letterToNumber(x1), letterToNumber(x2));

const getDeltaY = (x1: string, x2: string): number => getDelta(parseInt(x1), parseInt(x2));

export {numberToLetter, letterToNumber, coordinateToNumbers, getDelta, getDeltaX, getDeltaY};

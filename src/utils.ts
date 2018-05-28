import {Position} from './position';

const numberToLetter = (number: number): string => String.fromCharCode(96 + number);

const letterToNumber = (x:string): number => x.charCodeAt(0) - 96;

const positionToVector = (position: Position): {x: number, y: number} => ({
	x: letterToNumber(position.x),
	y: parseInt(position.y),
});

const getDelta = (x1: number, x2: number): number => Math.abs(x1 - x2);

const getDeltaX = (x1: string, x2: string): number => getDelta(letterToNumber(x1), letterToNumber(x2));

const getDeltaY = (x1: string, x2: string): number => getDelta(parseInt(x1), parseInt(x2));

const compose = (...fns: Function[]) => fns.reduce((f, g) => (...args: any[]) => f(g(...args)));

const concat = (value: any, arr: any[]) => arr.concat(value);

export {numberToLetter, letterToNumber, positionToVector, getDelta, getDeltaX, getDeltaY, compose, concat};

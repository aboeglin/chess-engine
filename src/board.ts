import {numberToLetter} from './utils';

interface Square {
	x: string,
	y: string,
}

interface Board {
	squares: Square[],
};

const createBoard = () : Board => {
	return {
		squares: Array(64).fill('').map((_, index) => ({
			x: `${numberToLetter(Math.floor(index / 8))}`,
			y: `${index % 8 + 1}`,
		})),
	};
};



export {createBoard, Board, Square};

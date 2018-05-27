import {Color, getRandomColor} from './color';

interface Player {
	id: string;
	color: Color;
}

const makePlayer = (id: string, color: Color): Player => ({
	id,
	color,
});

export {makePlayer, Player};

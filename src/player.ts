import {Color, getRandomColor} from './color';

interface Player {
	id: string;
	color: Color;
}

const createPlayer = (id: string, color: Color): Player => ({
	id,
	color,
});

export {createPlayer, Player};

import {Color} from './color';

interface Player {
	id: string;
	color: Color;
}

const makePlayer = (id: string, color?: Color): Player => ({
	id,
	color: color ? color : getRandomColor(),
});

const getRandomColor = (): Color => Math.random() > 0.5 ? Color.WHITE : Color.BLACK;

export {makePlayer, Player};

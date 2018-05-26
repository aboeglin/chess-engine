interface Position {
	x: string;
	y: string;
}

const makePosition = (x: string, y:string): Position => ({x, y});

export {makePosition, Position};

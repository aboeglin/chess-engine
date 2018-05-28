interface Position {
	x: string;
	y: string;
}

const createPosition = (x: string, y:string): Position => ({x, y});

export {createPosition, Position};

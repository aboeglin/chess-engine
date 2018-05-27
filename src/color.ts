enum Color {
	BLACK = 'BLACK',
	WHITE = 'WHITE',
}

const getRandomColor = (): Color => Math.random() > 0.5 ? Color.WHITE : Color.BLACK;

export {Color, getRandomColor};

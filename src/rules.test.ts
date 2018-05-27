import {canMoveTo} from './rules';
import {createBoard, findPiece, Board} from './board';
import {Color, PieceType, Piece} from './pieces';

describe('rules', () => {
	describe('canMoveTo', () => {
		it('should export a canMoveTo function', () => {
			expect(typeof canMoveTo).toBe('function');
		});

		it('should return false if there is no movement', () => {
			const board: Board = {pieces: [
				{x: 'f', y: '1', type: PieceType.PAWN, color: Color.WHITE},
				{x: 'f', y: '2', type: PieceType.BISHOP, color: Color.WHITE},
				{x: 'f', y: '3', type: PieceType.KNIGHT, color: Color.WHITE},
				{x: 'f', y: '4', type: PieceType.ROOK, color: Color.WHITE},
				{x: 'f', y: '5', type: PieceType.QUEEN, color: Color.WHITE},
				{x: 'f', y: '6', type: PieceType.KING, color: Color.WHITE},
			]};

			const pawn = findPiece('f', '1', board);
			const bishop = findPiece('f', '2', board);
			const knight = findPiece('f', '3', board);
			const rook = findPiece('f', '4', board);
			const queen = findPiece('f', '5', board);
			const king = findPiece('f', '6', board);

			expect(canMoveTo('f', '1', pawn, board)).toBe(false);
			expect(canMoveTo('f', '2', bishop, board)).toBe(false);
			expect(canMoveTo('f', '3', knight, board)).toBe(false);
			expect(canMoveTo('f', '4', rook, board)).toBe(false);
			expect(canMoveTo('f', '5', queen, board)).toBe(false);
			expect(canMoveTo('f', '6', king, board)).toBe(false);
		});

		describe('pawn canMoveTo', () => {
			it('should return false for a pawn that goes back', () => {
				const board: Board = createBoard();

				const whitePawn = findPiece('a', '2', board);
				const blackPawn = findPiece('a', '7', board);

				const whitePawnIndex = board.pieces.findIndex(piece => piece === whitePawn);
				const blackPawnIndex = board.pieces.findIndex(piece => piece === blackPawn);

				const boardWithPawnsAhead = {
					pieces: Object.assign([], board.pieces, {
						[whitePawnIndex]: {...whitePawn, x: 'a', y: '4'},
						[blackPawnIndex]: {...blackPawn, x: 'a', y: '5'},
					}),
				};
				const whitePawnMoved = findPiece('a', '4', boardWithPawnsAhead);
				const blackPawnMoved = findPiece('a', '5', boardWithPawnsAhead);

				expect(canMoveTo('a', '3', whitePawnMoved, boardWithPawnsAhead)).toBe(false);
				expect(canMoveTo('a', '6', blackPawnMoved, boardWithPawnsAhead)).toBe(false);
			});

			it('should return true for a pawn that goes one step forward', () => {
				const board: Board = createBoard();

				const whitePawn = findPiece('a', '2', board);
				const blackPawn = findPiece('a', '7', board);

				expect(canMoveTo('a', '3', whitePawn, board)).toBe(true);
				expect(canMoveTo('a', '6', blackPawn, board)).toBe(true);
			});

			it('should return false when there is a piece in front of the pawn', () => {
				const board: Board = createBoard();

				const whitePawn = findPiece('a', '2', board);
				const blackPawn = findPiece('a', '7', board);

				const blackPawnIndex = board.pieces.findIndex(piece => piece === blackPawn);

				const boardWithPawnsAhead = {
					pieces: Object.assign([], board.pieces, {
						[blackPawnIndex]: {...blackPawn, x: 'a', y: '3'},
					}),
				};
				const blackPawnMoved = findPiece('a', '5', boardWithPawnsAhead);

				expect(canMoveTo('a', '3', whitePawn, boardWithPawnsAhead)).toBe(false);
			});

			it('should return true when a pawn moves two squares ahead from its initial position', () => {
				const board: Board = createBoard();

				const whitePawn = findPiece('a', '2', board);
				const blackPawn = findPiece('a', '7', board);

				expect(canMoveTo('a', '4', whitePawn, board)).toBe(true);
				expect(canMoveTo('a', '5', blackPawn, board)).toBe(true);
			});

			it('should return false when a white pawn moves two squares ahead from its initial position, but there is a piece in between', () => {
				const board: Board = createBoard();

				const whitePawn = findPiece('a', '2', board);
				const blackPawn = findPiece('a', '7', board);

				const blackPawnIndex = board.pieces.findIndex(piece => piece === blackPawn);

				const boardWithPawnsAhead = {
					pieces: Object.assign([], board.pieces, {
						[blackPawnIndex]: {...blackPawn, x: 'a', y: '3'},
					}),
				};

				expect(canMoveTo('a', '4', whitePawn, boardWithPawnsAhead)).toBe(false);
			});

			it('should return false when a black pawn moves two squares ahead from its initial position, but there is a piece in between', () => {
				const board: Board = createBoard();

				const whitePawn = findPiece('a', '2', board);
				const blackPawn = findPiece('a', '7', board);

				const whitePawnIndex = board.pieces.findIndex(piece => piece === whitePawn);

				const boardWithPawnsAhead = {
					pieces: Object.assign([], board.pieces, {
						[whitePawnIndex]: {...whitePawn, x: 'a', y: '6'},
					}),
				};

				expect(canMoveTo('a', '5', blackPawn, boardWithPawnsAhead)).toBe(false);
			});

			it('should return true when a white pawn moves from a2 to b3, if there is a black piece in b3', () => {
				const board: Board = createBoard();

				const whitePawn = findPiece('a', '2', board);
				const blackPawn = findPiece('b', '7', board);

				const blackPawnIndex = board.pieces.findIndex(piece => piece === blackPawn);

				const boardWithPawnsAhead = {
					pieces: Object.assign([], board.pieces, {
						[blackPawnIndex]: {...blackPawn, x: 'b', y: '3'},
					}),
				};

				expect(canMoveTo('b', '3', whitePawn, boardWithPawnsAhead)).toBe(true);
			});

			it('should return false when a white pawn moves from a2 to b3, if there is no black piece in b3', () => {
				const board: Board = createBoard();

				const whitePawn = findPiece('a', '2', board);

				expect(canMoveTo('b', '3', whitePawn, board)).toBe(false);
			});

			it('should return true when a black pawn moves from a7 to b6, if there is a white piece in b6', () => {
				const board: Board = createBoard();

				const whitePawn = findPiece('b', '2', board);
				const blackPawn = findPiece('a', '7', board);

				const whitePawnIndex = board.pieces.findIndex(piece => piece === whitePawn);

				const boardWithPawnsAhead = {
					pieces: Object.assign([], board.pieces, {
						[whitePawnIndex]: {...whitePawn, x: 'b', y: '6'},
					}),
				};

				expect(canMoveTo('b', '6', blackPawn, boardWithPawnsAhead)).toBe(true);
			});

			it('should return false when a black pawn moves from a7 to b6, if there is no white piece in b6', () => {
				const board: Board = createBoard();

				const whitePawn = findPiece('a', '7', board);

				expect(canMoveTo('b', '6', whitePawn, board)).toBe(false);
			});
		});

		describe('bishop canMoveTo', () => {
			it('should return true when the bishop moves diagonally', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '1', type: PieceType.BISHOP, color: Color.WHITE},
				]};

				const bishop = findPiece('f', '1', board);

				expect(canMoveTo('h', '3', bishop, board)).toBe(true);
			});

			it('should return false when going further than the first piece on the trajectory', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '1', type: PieceType.BISHOP, color: Color.WHITE},
					{x: 'g', y: '2', type: PieceType.BISHOP, color: Color.WHITE},
				]};

				const bishop = findPiece('f', '1', board);

				expect(canMoveTo('h', '3', bishop, board)).toBe(false);
			});

			it('should return false when the piece at the destination is the same color as the bishop moving', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '1', type: PieceType.BISHOP, color: Color.WHITE},
					{x: 'h', y: '3', type: PieceType.BISHOP, color: Color.WHITE},
				]};

				const bishop = findPiece('f', '1', board);

				expect(canMoveTo('h', '3', bishop, board)).toBe(false);
			});

			it('should return true when the piece at the destination is not the same color as the bishop moving', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '1', type: PieceType.BISHOP, color: Color.WHITE},
					{x: 'h', y: '3', type: PieceType.BISHOP, color: Color.BLACK},
				]};

				const bishop: Piece = findPiece('f', '1', board);

				expect(canMoveTo('h', '3', bishop, board)).toBe(true);
			});
		});

		describe('knight canMoveTo', () => {
			it('should return true if it moves by 2 on one axis and 1 on the other axis', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '4', type: PieceType.KNIGHT, color: Color.WHITE},
				]};

				const knight: Piece = findPiece('f', '4', board);

				expect(canMoveTo('d', '3', knight, board)).toBe(true);
				expect(canMoveTo('d', '5', knight, board)).toBe(true);
				expect(canMoveTo('h', '3', knight, board)).toBe(true);
				expect(canMoveTo('h', '5', knight, board)).toBe(true);
				expect(canMoveTo('e', '6', knight, board)).toBe(true);
				expect(canMoveTo('e', '2', knight, board)).toBe(true);
				expect(canMoveTo('g', '6', knight, board)).toBe(true);
				expect(canMoveTo('g', '2', knight, board)).toBe(true);
			});

			it('should return false if there is a piece of the same color at the destination', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '4', type: PieceType.KNIGHT, color: Color.WHITE},
					{x: 'h', y: '3', type: PieceType.KNIGHT, color: Color.WHITE},
				]};

				const knight: Piece = findPiece('f', '4', board);

				expect(canMoveTo('h', '3', knight, board)).toBe(false);
			});

			it('should return true if there is a piece of the opposite color at the destination', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '4', type: PieceType.KNIGHT, color: Color.WHITE},
					{x: 'h', y: '3', type: PieceType.KNIGHT, color: Color.BLACK},
				]};

				const knight: Piece = findPiece('f', '4', board);

				expect(canMoveTo('h', '3', knight, board)).toBe(true);
			});
		});

		describe('rook canMoveTo', () => {
			it('should return true when moving in a straight line', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '1', type: PieceType.ROOK, color: Color.WHITE},
				]};

				const rook: Piece = findPiece('f', '1', board);

				expect(canMoveTo('f', '7', rook, board)).toBe(true);
				expect(canMoveTo('b', '1', rook, board)).toBe(true);
			});

			it('should return false if there is a piece in the trajectory', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '3', type: PieceType.ROOK, color: Color.WHITE},
					{x: 'f', y: '2', type: PieceType.PAWN, color: Color.WHITE},
					{x: 'f', y: '4', type: PieceType.PAWN, color: Color.WHITE},
					{x: 'b', y: '3', type: PieceType.PAWN, color: Color.WHITE},
				]};

				const rook: Piece = findPiece('f', '3', board);

				expect(canMoveTo('f', '7', rook, board)).toBe(false);
				expect(canMoveTo('f', '1', rook, board)).toBe(false);
				expect(canMoveTo('a', '3', rook, board)).toBe(false);
			});

			it('should return false if the piece at the destination is of the same color', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '1', type: PieceType.ROOK, color: Color.WHITE},
					{x: 'f', y: '7', type: PieceType.ROOK, color: Color.WHITE},
				]};

				const rook: Piece = findPiece('f', '1', board);

				expect(canMoveTo('f', '7', rook, board)).toBe(false);
			});
		});

		describe('queen canMoveTo', () => {
			it('should return true if the queen moves straight', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '3', type: PieceType.QUEEN, color: Color.WHITE},
				]};

				const queen: Piece = findPiece('f', '3', board);

				expect(canMoveTo('f', '7', queen, board)).toBe(true);
				expect(canMoveTo('f', '1', queen, board)).toBe(true);
				expect(canMoveTo('f', '2', queen, board)).toBe(true);
				expect(canMoveTo('g', '3', queen, board)).toBe(true);
				expect(canMoveTo('h', '3', queen, board)).toBe(true);
				expect(canMoveTo('b', '3', queen, board)).toBe(true);
			});

			it('should return false if the queen moves straight and there is a piece in the trajectory', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '3', type: PieceType.QUEEN, color: Color.WHITE},
					{x: 'd', y: '3', type: PieceType.QUEEN, color: Color.BLACK},
				]};

				const queen: Piece = findPiece('f', '3', board);

				expect(canMoveTo('b', '3', queen, board)).toBe(false);
			});

			it('should return true if the queen moves in diagonal', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '3', type: PieceType.QUEEN, color: Color.WHITE},
				]};

				const queen: Piece = findPiece('f', '3', board);

				expect(canMoveTo('g', '4', queen, board)).toBe(true);
				expect(canMoveTo('h', '5', queen, board)).toBe(true);
				expect(canMoveTo('h', '1', queen, board)).toBe(true);
				expect(canMoveTo('d', '1', queen, board)).toBe(true);
			});
		});

		describe('king canMoveTo', () => {
			it('should return true if the king moves to a neighbour square', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '3', type: PieceType.KING, color: Color.WHITE},
				]};

				const king: Piece = findPiece('f', '3', board);

				expect(canMoveTo('f', '4', king, board)).toBe(true);
				expect(canMoveTo('f', '2', king, board)).toBe(true);
				expect(canMoveTo('g', '4', king, board)).toBe(true);
				expect(canMoveTo('g', '2', king, board)).toBe(true);
				expect(canMoveTo('e', '4', king, board)).toBe(true);
				expect(canMoveTo('e', '2', king, board)).toBe(true);
			});

			it('should return false if the destination piece is the same color as the one of the king', () => {
				const board: Board = {pieces: [
					{x: 'f', y: '3', type: PieceType.KING, color: Color.WHITE},
					{x: 'f', y: '4', type: PieceType.QUEEN, color: Color.WHITE},
				]};

				const king: Piece = findPiece('f', '3', board);

				expect(canMoveTo('f', '4', king, board)).toBe(false);
			});
		});
	});
});

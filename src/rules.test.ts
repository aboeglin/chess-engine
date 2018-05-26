import {canMoveTo} from './rules';
import {createBoard, findPiece, Board} from './board';
import {Color, PieceType} from './pieces';

describe('rules', () => {
	describe('canMoveTo', () => {
		it('should export a canMoveTo function', () => {
			expect(typeof canMoveTo).toBe('function');
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
	});
});

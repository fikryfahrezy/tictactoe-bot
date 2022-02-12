/**
 * Minimax Algorithm in Game Theory | Set 3 (Tic-Tac-Toe AI – Finding optimal move)
 * https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/?ref=leftbar-rightbar
 */

type Move = {
	row: number;
	col: number;
};
type BoardRow = [string, string, string];
type BoardRowInt = [number, number, number];
export type Board = [BoardRow, BoardRow, BoardRow];

const x = 'x';
const o = 'o';
const defScore = 1;

// Javascript program to find the
// next optimal move for a player

// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
const isMovesLeft = function (board: Board) {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === '') {
				return true;
			}
		}
	}

	return false;
};

// This is the evaluation function if the player is X as discussed
// in the previous article ( http://goo.gl/sJgv68 )
const evaluateX = function (b: Board) {
	// Checking for Rows for X or O victory.
	for (let row = 0; row < 3; row++) {
		if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
			if (b[row][0] === x.toLowerCase()) {
				return defScore;
			}

			if (b[row][0] === o.toLowerCase()) {
				return defScore * -1;
			}
		}
	}

	// Checking for Columns for X or O victory.
	for (let col = 0; col < 3; col++) {
		if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
			if (b[0][col] === x.toLowerCase()) {
				return defScore;
			}

			if (b[0][col] === o.toLowerCase()) {
				return defScore * -1;
			}
		}
	}

	// Checking for Diagonals for X or O victory.
	if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
		if (b[0][0] === x.toLowerCase()) {
			return defScore;
		}

		if (b[0][0] === o.toLowerCase()) {
			return defScore * -1;
		}
	}

	if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
		if (b[0][2] === x.toLowerCase()) {
			return defScore;
		}

		if (b[0][2] === o.toLowerCase()) {
			return defScore * -1;
		}
	}

	// Else if none of them have
	// won then return 0
	return 0;
};

// This is the evaluation function if the player is O as discussed
// in the previous article ( http://goo.gl/sJgv68 )
const evaluateO = function (b: Board) {
	// Checking for Rows for X or O victory.
	for (let row = 0; row < 3; row++) {
		if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
			if (b[row][0] === x.toLowerCase()) {
				return defScore * -1;
			}

			if (b[row][0] === o.toLowerCase()) {
				return defScore;
			}
		}
	}

	// Checking for Columns for X or O victory.
	for (let col = 0; col < 3; col++) {
		if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
			if (b[0][col] === x.toLowerCase()) {
				return defScore * -1;
			}

			if (b[0][col] === o.toLowerCase()) {
				return defScore;
			}
		}
	}

	// Checking for Diagonals for X or O victory.
	if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
		if (b[0][0] === x.toLowerCase()) {
			return defScore * -1;
		}

		if (b[0][0] === o.toLowerCase()) {
			return defScore;
		}
	}

	if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
		if (b[0][2] === x.toLowerCase()) {
			return defScore * -1;
		}

		if (b[0][2] === o.toLowerCase()) {
			return defScore;
		}
	}

	// Else if none of them have
	// won then return 0
	return 0;
};

// This is the minimax function. It
// considers all the possible ways
// the game can go and returns the
// value of the board
const minimax = function (
	board: Board,
	depth: number,
	isMax: boolean,
	isX: boolean,
) {
	const score = isX ? evaluateX(board) : evaluateO(board);

	// If Maximizer has won the game
	// return his/her evaluated score
	if (score === defScore) {
		return score;
	}

	// If Minimizer has won the game
	// return his/her evaluated score
	if (score === defScore * -1) {
		return score;
	}

	// If there are no more moves and
	// no winner then it is a tie
	if (isMovesLeft(board) === false) {
		return 0;
	}

	// If this maximizer's move
	if (isMax) {
		let best = -1000;

		// Traverse all cells
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				// Check if cell is empty
				if (board[i][j] === '') {
					// Make the move
					// board[i][j] = x.toLowerCase();
					// board[i][j] = o.toLowerCase();
					board[i][j] = isX ? x.toLowerCase() : o.toLowerCase();

					// Call minimax recursively
					// and choose the maximum value
					best = Math.max(best, minimax(board, depth + 1, !isMax, isX));

					// Undo the move
					board[i][j] = '';
				}
			}
		}

		return best;
	}

	// If this minimizer's move

	let best = 1000;

	// Traverse all cells
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			// Check if cell is empty
			if (board[i][j] === '') {
				// Make the move
				// board[i][j] = o.toLowerCase();
				// board[i][j] = x.toLowerCase();
				board[i][j] = isX ? o.toLowerCase() : x.toLowerCase();

				// Call minimax recursively and
				// choose the minimum value
				best = Math.min(best, minimax(board, depth + 1, !isMax, isX));

				// Undo the move
				board[i][j] = '';
			}
		}
	}

	return best;
};

// This will return the best possible
// move for the player
export const findBestMove = function (board: Board, isX: boolean) {
	let bestVal = -1000;
	const bestMove: Move = {
		col: -1,
		row: -1,
	};

	// Traverse all cells, evaluate
	// minimax function for all empty
	// cells. And return the cell
	// with optimal value.
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			// Check if cell is empty
			if (board[i][j] === '') {
				// Make the move
				// board[i][j] = x.toLowerCase();
				// board[i][j] = o.toLowerCase();
				board[i][j] = isX ? x.toLowerCase() : o.toLowerCase();

				// Compute evaluation function
				// for this move.
				const moveVal = minimax(board, 0, false, isX);

				// Undo the move
				board[i][j] = '';

				// If the value of the current move
				// is more than the best value, then
				// update best
				if (moveVal > bestVal) {
					bestMove.row = i;
					bestMove.col = j;
					bestVal = moveVal;
				}
			}
		}
	}

	return bestMove;
};

export const resultBuilder = function (a: number): Move {
	if (a < 3) {
		return {row: 0, col: a};
	}

	if (a >= 3 && a < 6) {
		return {row: 1, col: a % 3};
	}

	if (a >= 6 && a < 9) {
		return {row: 2, col: a % 3};
	}

	return {row: 0, col: 0};
};

export const calculateWinner = function (
	nestedSquares: Board,
): BoardRowInt | null {
	const lines: BoardRowInt[] = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const squares = nestedSquares.flat();

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			const line = lines[i];
			return line;
		}
	}

	return null;
};

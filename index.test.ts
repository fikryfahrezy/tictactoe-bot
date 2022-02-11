import type {Board} from './index';
import {test} from 'uvu';
import * as assert from 'uvu/assert';
import {findBestMove, calculateWinner, resultBuilder} from './index';

test('Move X to Row 2 Col 2', () => {
	const board: Board = [
		['x', 'o', 'x'],
		['o', 'o', 'x'],
		['_', '_', '_'],
	];

	const bestMove = findBestMove(board, true);

	assert.is(bestMove.row, 2);
	assert.is(bestMove.col, 2);
});

test('Move O to Row 2 Col 1', () => {
	const board: Board = [
		['x', 'o', 'x'],
		['o', 'o', 'x'],
		['_', '_', '_'],
	];

	const bestMove = findBestMove(board, false);

	assert.is(bestMove.row, 2);
	assert.is(bestMove.col, 1);
});

test('Calculate X winner', () => {
	const board: Board = [
		['x', 'o', 'x'],
		['o', 'o', 'x'],
		['_', '_', 'x'],
	];

	const winnerCoord = calculateWinner(board);

	assert.equal(winnerCoord, [2, 5, 8]);
});

test('Calculate O winner', () => {
	const board: Board = [
		['x', 'o', 'x'],
		['o', 'o', 'x'],
		['_', 'o', '_'],
	];

	const winnerCoord = calculateWinner(board);

	assert.equal(winnerCoord, [1, 4, 7]);
});

test('Result X winner coord', () => {
	const board: Board = [
		['x', 'o', 'x'],
		['o', 'o', 'x'],
		['_', '_', 'x'],
	];

	const winner = calculateWinner(board);
	const winnerCoord = winner?.map(v => resultBuilder(v));

	assert.equal(winnerCoord, [
		{row: 0, col: 2},
		{row: 1, col: 2},
		{row: 2, col: 2},
	]);
});

test('Calculate O winner', () => {
	const board: Board = [
		['x', 'o', 'x'],
		['o', 'o', 'x'],
		['_', 'o', '_'],
	];

	const winner = calculateWinner(board);
	const winnerCoord = winner?.map(v => resultBuilder(v));

	assert.equal(winnerCoord, [
		{row: 0, col: 1},
		{row: 1, col: 1},
		{row: 2, col: 1},
	]);
});

test.run();

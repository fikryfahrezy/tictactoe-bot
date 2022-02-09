import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { findBestMove } from "./index.js"

test('sum', () => {
    let board = [['x', 'o', 'x'],
    ['o', 'o', 'x'],
    ['_', '_', '_']];

    let bestMove = findBestMove(board);

    assert.is(bestMove.row, 2);
    assert.is(bestMove.col, 2);
});

test.run();
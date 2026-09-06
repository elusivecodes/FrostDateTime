import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime #humanDiff Significant Values', function() {
    it.each([
        ['uses relative years when there is actual year difference', [2018, 1], [2016, 2], 'in 2 years'],
        ['uses relative months when there is relative year difference', [2018, 1], [2017, 2], 'in 11 months'],
        ['uses relative months when there is actual month difference', [2018, 3, 1], [2018, 1, 2], 'in 2 months'],
        ['uses relative weeks when there is relative month difference', [2018, 2, 1], [2018, 1, 5], 'in 4 weeks'],
        ['uses relative days when there is relative week difference', [2018, 2, 1], [2018, 1, 27], 'in 5 days'],
        ['uses relative days when there is actual day difference', [2018, 1, 3, 0], [2018, 1, 1, 1], 'in 2 days'],
        ['uses relative hours when there is relative day difference', [2018, 1, 2, 0], [2018, 1, 1, 1], 'in 23 hours'],
        ['uses relative hours when there is actual hour difference', [2018, 1, 1, 2, 0], [2018, 1, 1, 0, 1], 'in 2 hours'],
        ['uses relative minutes when there is relative hour difference', [2018, 1, 1, 1, 0], [2018, 1, 1, 0, 1], 'in 59 minutes'],
        ['uses relative minutes when there is actual minute difference', [2018, 1, 1, 0, 2, 0], [2018, 1, 1, 0, 0, 1], 'in 2 minutes'],
        ['uses relative seconds when there is relative minute difference', [2018, 1, 1, 0, 1, 0], [2018, 1, 1, 0, 0, 1], 'in 59 seconds'],
        ['uses relative seconds when there is actual seconds difference', [2018, 1, 1, 0, 0, 2, 0], [2018, 1, 1, 0, 0, 0, 1], 'in 2 seconds'],
        ['uses relative days when there is relative year difference', [2019, 1, 1], [2018, 12, 31], 'tomorrow'],
        ['uses relative years when relative month difference is equal to months in year', [2019, 1, 1], [2018, 1, 31], 'next year'],
    ])('%s', function(_, input, otherInput, expected) {
        const date = DateTime.fromArray(input);
        const other = DateTime.fromArray(otherInput);

        assert.strictEqual(date.humanDiff(other), expected);
    });
});

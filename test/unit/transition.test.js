import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime DST Transitions', function() {
    describe.each([
        ['Non-DST Offset (Post-Transition)', '07/04/2019 03:01:00 +10:00', [2019, 4, 7, 3, 1, 0, 0], '+10:00', 'Sun Apr 07 2019 03:01:00 +1000 (Australia/Sydney)'],
        ['Non-DST Offset (Pre-Transition)', '07/04/2019 02:01:00 +10:00', [2019, 4, 7, 2, 1, 0, 0], '+10:00', 'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)'],
        ['DST Offset (Pre-Transition)', '07/04/2019 02:01:00 +11:00', [2019, 4, 7, 2, 1, 0, 0], '+11:00', 'Sun Apr 07 2019 02:01:00 +1100 (Australia/Sydney)'],
        ['DST Offset (Post-Transition)', '07/04/2019 03:01:00 +11:00', [2019, 4, 7, 3, 1, 0, 0], '+11:00', 'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)'],
    ])('%s', function(_, input, fields, timeZone, expected) {
        it('creates the correct date from format', function() {
            const date = DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', input)
                .withTimeZone('Australia/Sydney');

            assert.strictEqual(date.toString(), expected);
        });

        it('creates the correct date from array', function() {
            const date = DateTime.fromArray(fields, { timeZone })
                .withTimeZone('Australia/Sydney');

            assert.strictEqual(date.toString(), expected);
        });
    });

    describe('DST Transition', function() {
        it.each([
            ['creates correct date (forward)', [2023, 10, 1, 2, 0, 0, 0], 'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)'],
            ['creates correct date (backward)', [2023, 4, 2, 2, 0, 0, 0], 'Sun Apr 02 2023 02:00:00 +1000 (Australia/Sydney)'],
        ])('%s', function(_, input, expected) {
            const date = DateTime.fromArray(input, { timeZone: 'Australia/Sydney' });

            assert.strictEqual(date.toString(), expected);
        });
    });

    describe('Wall Time Resolution', function() {
        it.each([
            ['moves forward through a skipped hour', [2024, 3, 10, 2, 30], 'Sun Mar 10 2024 03:30:00 -0400 (America/New_York)', { timeZone: 'America/New_York' }],
            ['moves construction forward through a deleted day', [2011, 12, 30, 12], 'Sat Dec 31 2011 12:00:00 +1400 (Pacific/Apia)', { timeZone: 'Pacific/Apia' }],
            ['preserves a non-transition wall time', [2024, 2, 15, 12, 30], 'Thu Feb 15 2024 12:30:00 -0500 (America/New_York)', { timeZone: 'America/New_York' }],
        ])('%s', function(_, input, expected, options = {}) {
            const date = DateTime.fromArray(input, options);

            assert.strictEqual(date.toString(), expected);
        });

        describe.each([
            ['America/New_York', [2024, 11, 3, 1, 30, 12, 345], '2024-11-03T01:30:12.345', '-04:00', '-05:00'],
            ['Australia/Lord_Howe', [2024, 4, 7, 1, 45, 12, 345], '2024-04-07T01:45:12.345', '+11:00', '+10:30'],
            ['Atlantic/Azores', [2024, 10, 27, 0, 30, 12, 345], '2024-10-27T00:30:12.345', '+00:00', '-01:00'],
        ])('repeated wall times in %s', function(timeZone, fields, input, earlierOffset, laterOffset) {
            const options = { timeZone };
            const expected = Date.parse(`${input}${laterOffset}`);

            it.each(['T', ' '])('uses the later occurrence in the constructor with separator "%s"', function(separator) {
                const date = new DateTime(input.replace('T', separator), options);

                assert.strictEqual(date.getTime(), expected);
            });

            it('uses the later occurrence in fromArray', function() {
                const date = DateTime.fromArray(fields, options);

                assert.strictEqual(date.getTime(), expected);
            });

            it('uses the later occurrence in fromFormat', function() {
                const date = DateTime.fromFormat('yyyy-MM-dd\'T\'HH:mm:ss.SSS', input, options);

                assert.strictEqual(date.getTime(), expected);
                assert.strictEqual(date.isValid, true);
            });

            it.each([earlierOffset, laterOffset])('uses the later occurrence when setting minutes from offset %s', function(offset) {
                const date = new DateTime(`${input}${offset}`, options).withMinutes(fields[4]);

                assert.strictEqual(date.getTime(), expected);
            });

            it.each([earlierOffset, laterOffset])('preserves an explicit offset of %s', function(offset) {
                const zonedInput = `${input}${offset}`;
                const timestamp = Date.parse(zonedInput);

                assert.strictEqual(new DateTime(zonedInput, options).getTime(), timestamp);
                assert.strictEqual(
                    DateTime.fromFormat('yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx', zonedInput, options).getTime(),
                    timestamp,
                );
            });
        });

        it('preserves a non-repeated time before a rollback', function() {
            const date = new DateTime('2024-11-03T00:30:00', {
                timeZone: 'America/New_York',
            });

            assert.strictEqual(date.getTime(), Date.parse('2024-11-03T04:30:00Z'));
        });

        it('preserves a wall time at the maximum supported timestamp', function() {
            const date = new DateTime(8.64e15, { timeZone: 'America/New_York' });

            assert.strictEqual(date.withMinutes(date.getMinutes()).getTime(), date.getTime());
        });

        it('moves addition forward through a deleted day', function() {
            const date = DateTime.fromArray([2011, 12, 29, 12], {
                timeZone: 'Pacific/Apia',
            }).addDay();

            assert.strictEqual(
                date.toString(),
                'Sat Dec 31 2011 12:00:00 +1400 (Pacific/Apia)',
            );
        });

        it('moves subtraction backward through a deleted day', function() {
            const date = DateTime.fromArray([2011, 12, 31, 12], {
                timeZone: 'Pacific/Apia',
            }).subDay();

            assert.strictEqual(
                date.toString(),
                'Thu Dec 29 2011 12:00:00 -1000 (Pacific/Apia)',
            );
        });

        it.each([
            ['subWeek', undefined],
            ['subWeeks', 1],
            ['addWeeks', -1],
        ])('moves week subtraction backward through a deleted day using %s', function(method, amount) {
            const date = DateTime.fromArray([2012, 1, 6, 12, 34, 56, 789], {
                timeZone: 'Pacific/Apia',
            });
            const result = date[method](amount);

            assert.strictEqual(result.format('yyyy-MM-dd HH:mm:ss.SSS xxx'), '2011-12-29 12:34:56.789 -10:00');
        });

        it.each([
            ['addWeek', undefined],
            ['addWeeks', 1],
            ['subWeeks', -1],
        ])('moves week addition forward through a deleted day using %s', function(method, amount) {
            const date = DateTime.fromArray([2011, 12, 23, 12, 34, 56, 789], {
                timeZone: 'Pacific/Apia',
            });
            const result = date[method](amount);

            assert.strictEqual(result.format('yyyy-MM-dd HH:mm:ss.SSS xxx'), '2011-12-31 12:34:56.789 +14:00');
        });
    });

    describe('DST Transition To', function() {
        it.each([
            ['creates correct date (set year)', {
                input: [2023, 10, 1, 3, 0, 0, 0],
                method: 'withYear',
                args: [2024],
                expected: 'Tue Oct 01 2024 03:00:00 +1000 (Australia/Sydney)',
                original: 'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            }],
            ['creates correct date (set month)', {
                input: [2023, 9, 30, 23, 0, 0, 0],
                method: 'withMonth',
                args: [10],
                expected: 'Mon Oct 30 2023 23:00:00 +1100 (Australia/Sydney)',
                original: 'Sat Sep 30 2023 23:00:00 +1000 (Australia/Sydney)',
            }],
            ['creates correct date (set month and date)', {
                input: [2023, 9, 30, 23, 0, 0, 0],
                method: 'withMonth',
                args: [10, 1],
                expected: 'Sun Oct 01 2023 23:00:00 +1100 (Australia/Sydney)',
                original: 'Sat Sep 30 2023 23:00:00 +1000 (Australia/Sydney)',
            }],
            ['creates correct date (set hour)', {
                input: [2023, 10, 1, 1, 0, 0, 0],
                method: 'withHours',
                args: [3],
                expected: 'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
                original: 'Sun Oct 01 2023 01:00:00 +1000 (Australia/Sydney)',
            }],
            ['creates correct date (add year)', {
                input: [2023, 10, 1, 3, 0, 0, 0],
                method: 'addYear',
                args: [],
                expected: 'Tue Oct 01 2024 03:00:00 +1000 (Australia/Sydney)',
                original: 'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            }],
            ['creates correct date (add month)', {
                input: [2023, 9, 30, 23, 0, 0, 0],
                method: 'addMonth',
                args: [],
                expected: 'Mon Oct 30 2023 23:00:00 +1100 (Australia/Sydney)',
                original: 'Sat Sep 30 2023 23:00:00 +1000 (Australia/Sydney)',
            }],
            ['creates correct date (add day)', {
                input: [2023, 9, 30, 23, 0, 0, 0],
                method: 'addDay',
                args: [],
                expected: 'Sun Oct 01 2023 23:00:00 +1100 (Australia/Sydney)',
                original: 'Sat Sep 30 2023 23:00:00 +1000 (Australia/Sydney)',
            }],
            ['creates correct date (add hour)', {
                input: [2023, 10, 1, 1, 0, 0, 0],
                method: 'addHour',
                args: [],
                expected: 'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
                original: 'Sun Oct 01 2023 01:00:00 +1000 (Australia/Sydney)',
            }],
        ])('%s', function(_, { input, method, args, expected, original }) {
            const date = DateTime.fromArray(input, { timeZone: 'Australia/Sydney' });
            const copy = date[method](...args);

            assert.strictEqual(date.toString(), original);
            assert.strictEqual(copy.toString(), expected);
        });

        it('creates correct date (add hour backward)', function() {
            const date1 = DateTime.fromArray([2023, 4, 2, 1, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.addHour();
            const date3 = date2.addHour();

            assert.strictEqual(
                date1.toString(),
                'Sun Apr 02 2023 01:00:00 +1100 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 02 2023 02:00:00 +1100 (Australia/Sydney)',
            );
            assert.strictEqual(
                date3.toString(),
                'Sun Apr 02 2023 02:00:00 +1000 (Australia/Sydney)',
            );
        });
    });

    describe('DST Transition From', function() {
        it.each([
            ['creates correct date (set year)', {
                input: [2024, 10, 1, 3, 0, 0, 0],
                method: 'withYear',
                args: [2023],
                expected: 'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
                original: 'Tue Oct 01 2024 03:00:00 +1000 (Australia/Sydney)',
            }],
            ['creates correct date (set month)', {
                input: [2023, 10, 2, 0, 0, 0, 0],
                method: 'withMonth',
                args: [9],
                expected: 'Sat Sep 02 2023 00:00:00 +1000 (Australia/Sydney)',
                original: 'Mon Oct 02 2023 00:00:00 +1100 (Australia/Sydney)',
            }],
            ['creates correct date (set month and date)', {
                input: [2023, 10, 2, 0, 0, 0, 0],
                method: 'withMonth',
                args: [9, 30],
                expected: 'Sat Sep 30 2023 00:00:00 +1000 (Australia/Sydney)',
                original: 'Mon Oct 02 2023 00:00:00 +1100 (Australia/Sydney)',
            }],
            ['creates correct date (set hour)', {
                input: [2023, 10, 1, 3, 0, 0, 0],
                method: 'withHours',
                args: [1],
                expected: 'Sun Oct 01 2023 01:00:00 +1000 (Australia/Sydney)',
                original: 'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            }],
            ['creates correct date (subtract year)', {
                input: [2024, 10, 1, 3, 0, 0, 0],
                method: 'subYear',
                args: [],
                expected: 'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
                original: 'Tue Oct 01 2024 03:00:00 +1000 (Australia/Sydney)',
            }],
            ['creates correct date (subtract month)', {
                input: [2023, 10, 2, 0, 0, 0, 0],
                method: 'subMonth',
                args: [],
                expected: 'Sat Sep 02 2023 00:00:00 +1000 (Australia/Sydney)',
                original: 'Mon Oct 02 2023 00:00:00 +1100 (Australia/Sydney)',
            }],
            ['creates correct date (subtract day)', {
                input: [2023, 10, 2, 0, 0, 0, 0],
                method: 'subDay',
                args: [],
                expected: 'Sun Oct 01 2023 00:00:00 +1000 (Australia/Sydney)',
                original: 'Mon Oct 02 2023 00:00:00 +1100 (Australia/Sydney)',
            }],
            ['creates correct date (subtract hour)', {
                input: [2023, 10, 1, 3, 0, 0, 0],
                method: 'subHour',
                args: [],
                expected: 'Sun Oct 01 2023 01:00:00 +1000 (Australia/Sydney)',
                original: 'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            }],
        ])('%s', function(_, { input, method, args, expected, original }) {
            const date = DateTime.fromArray(input, { timeZone: 'Australia/Sydney' });
            const copy = date[method](...args);

            assert.strictEqual(date.toString(), original);
            assert.strictEqual(copy.toString(), expected);
        });

        it('creates correct date (subtract hour backward)', function() {
            const date1 = DateTime.fromArray([2023, 4, 2, 3, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.subHour();
            const date3 = date2.subHour();

            assert.strictEqual(
                date1.toString(),
                'Sun Apr 02 2023 03:00:00 +1000 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 02 2023 02:00:00 +1000 (Australia/Sydney)',
            );
            assert.strictEqual(
                date3.toString(),
                'Sun Apr 02 2023 02:00:00 +1100 (Australia/Sydney)',
            );
        });
    });
});

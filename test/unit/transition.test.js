import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import DateTime from '../../src/index.js';

describe('DateTime DST Transitions', function() {
    describe('Non-DST Offset (Post-Transition)', function() {
        it('creates correct date from format', function() {
            const date1 = DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '07/04/2019 03:01:00 +10:00');
            const date2 = date1.withTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 03:01:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date from array', function() {
            const date1 = DateTime.fromArray([2019, 4, 7, 3, 1, 0, 0], {
                timeZone: '+10:00',
            });
            const date2 = date1.withTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 03:01:00 +1000 (Australia/Sydney)',
            );
        });
    });

    describe('Non-DST Offset (Pre-Transition)', function() {
        it('creates correct date from format', function() {
            const date1 = DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '07/04/2019 02:01:00 +10:00');
            const date2 = date1.withTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date from array', function() {
            const date1 = DateTime.fromArray([2019, 4, 7, 2, 1, 0, 0], {
                timeZone: '+10:00',
            });
            const date2 = date1.withTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)',
            );
        });
    });

    describe('DST Offset (Pre-Transition)', function() {
        it('creates correct date from format', function() {
            const date1 = DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '07/04/2019 02:01:00 +11:00');
            const date2 = date1.withTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1100 (Australia/Sydney)',
            );
        });

        it('creates correct date from array', function() {
            const date1 = DateTime.fromArray([2019, 4, 7, 2, 1, 0, 0], {
                timeZone: '+11:00',
            });
            const date2 = date1.withTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1100 (Australia/Sydney)',
            );
        });
    });

    describe('DST Offset (Post-Transition)', function() {
        it('creates correct date if offset is not correct', function() {
            const date1 = DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '07/04/2019 03:01:00 +11:00');
            const date2 = date1.withTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date from array', function() {
            const date1 = DateTime.fromArray([2019, 4, 7, 3, 1, 0, 0], {
                timeZone: '+11:00',
            });
            const date2 = date1.withTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)',
            );
        });
    });

    describe('DST Transition', function() {
        it('creates correct date (forward)', function() {
            const date = DateTime.fromArray([2023, 10, 1, 2, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });

            assert.strictEqual(
                date.toString(),
                'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            );
        });

        it('creates correct date (backward)', function() {
            const date = DateTime.fromArray([2023, 4, 2, 2, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });

            assert.strictEqual(
                date.toString(),
                'Sun Apr 02 2023 02:00:00 +1000 (Australia/Sydney)',
            );
        });
    });

    describe('Wall Time Resolution', function() {
        it('moves forward through a skipped hour', function() {
            const date = DateTime.fromArray([2024, 3, 10, 2, 30], {
                timeZone: 'America/New_York',
            });

            assert.strictEqual(
                date.toString(),
                'Sun Mar 10 2024 03:30:00 -0400 (America/New_York)',
            );
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

        it('moves construction forward through a deleted day', function() {
            const date = DateTime.fromArray([2011, 12, 30, 12], {
                timeZone: 'Pacific/Apia',
            });

            assert.strictEqual(
                date.toString(),
                'Sat Dec 31 2011 12:00:00 +1400 (Pacific/Apia)',
            );
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

        it('preserves a non-transition wall time', function() {
            const date = DateTime.fromArray([2024, 2, 15, 12, 30], {
                timeZone: 'America/New_York',
            });

            assert.strictEqual(
                date.toString(),
                'Thu Feb 15 2024 12:30:00 -0500 (America/New_York)',
            );
        });
    });

    describe('DST Transition To', function() {
        it('creates correct date (set year)', function() {
            const date1 = DateTime.fromArray([2023, 10, 1, 3, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.withYear(2024);

            assert.strictEqual(
                date1.toString(),
                'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Tue Oct 01 2024 03:00:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date (set month)', function() {
            const date1 = DateTime.fromArray([2023, 9, 30, 23, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.withMonth(10);

            assert.strictEqual(
                date1.toString(),
                'Sat Sep 30 2023 23:00:00 +1000 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Mon Oct 30 2023 23:00:00 +1100 (Australia/Sydney)',
            );
        });

        it('creates correct date (set month and date)', function() {
            const date1 = DateTime.fromArray([2023, 9, 30, 23, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.withMonth(10, 1);

            assert.strictEqual(
                date1.toString(),
                'Sat Sep 30 2023 23:00:00 +1000 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Oct 01 2023 23:00:00 +1100 (Australia/Sydney)',
            );
        });

        it('creates correct date (set hour)', function() {
            const date1 = DateTime.fromArray([2023, 10, 1, 1, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.withHours(3);

            assert.strictEqual(
                date1.toString(),
                'Sun Oct 01 2023 01:00:00 +1000 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            );
        });

        it('creates correct date (add year)', function() {
            const date1 = DateTime.fromArray([2023, 10, 1, 3, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.addYear();

            assert.strictEqual(
                date1.toString(),
                'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Tue Oct 01 2024 03:00:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date (add month)', function() {
            const date1 = DateTime.fromArray([2023, 9, 30, 23, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.addMonth();

            assert.strictEqual(
                date1.toString(),
                'Sat Sep 30 2023 23:00:00 +1000 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Mon Oct 30 2023 23:00:00 +1100 (Australia/Sydney)',
            );
        });

        it('creates correct date (add day)', function() {
            const date1 = DateTime.fromArray([2023, 9, 30, 23, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.addDay();

            assert.strictEqual(
                date1.toString(),
                'Sat Sep 30 2023 23:00:00 +1000 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Oct 01 2023 23:00:00 +1100 (Australia/Sydney)',
            );
        });

        it('creates correct date (add hour)', function() {
            const date1 = DateTime.fromArray([2023, 10, 1, 1, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.addHour();

            assert.strictEqual(
                date1.toString(),
                'Sun Oct 01 2023 01:00:00 +1000 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            );
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
        it('creates correct date (set year)', function() {
            const date1 = DateTime.fromArray([2024, 10, 1, 3, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.withYear(2023);

            assert.strictEqual(
                date1.toString(),
                'Tue Oct 01 2024 03:00:00 +1000 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            );
        });

        it('creates correct date (set month)', function() {
            const date1 = DateTime.fromArray([2023, 10, 2, 0, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.withMonth(9);

            assert.strictEqual(
                date1.toString(),
                'Mon Oct 02 2023 00:00:00 +1100 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sat Sep 02 2023 00:00:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date (set month and date)', function() {
            const date1 = DateTime.fromArray([2023, 10, 2, 0, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.withMonth(9, 30);

            assert.strictEqual(
                date1.toString(),
                'Mon Oct 02 2023 00:00:00 +1100 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sat Sep 30 2023 00:00:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date (set hour)', function() {
            const date1 = DateTime.fromArray([2023, 10, 1, 3, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.withHours(1);

            assert.strictEqual(
                date1.toString(),
                'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Oct 01 2023 01:00:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date (subtract year)', function() {
            const date1 = DateTime.fromArray([2024, 10, 1, 3, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.subYear();

            assert.strictEqual(
                date1.toString(),
                'Tue Oct 01 2024 03:00:00 +1000 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            );
        });

        it('creates correct date (subtract month)', function() {
            const date1 = DateTime.fromArray([2023, 10, 2, 0, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.subMonth();

            assert.strictEqual(
                date1.toString(),
                'Mon Oct 02 2023 00:00:00 +1100 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sat Sep 02 2023 00:00:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date (subtract day)', function() {
            const date1 = DateTime.fromArray([2023, 10, 2, 0, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.subDay();

            assert.strictEqual(
                date1.toString(),
                'Mon Oct 02 2023 00:00:00 +1100 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Oct 01 2023 00:00:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date (subtract hour)', function() {
            const date1 = DateTime.fromArray([2023, 10, 1, 3, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.subHour();

            assert.strictEqual(
                date1.toString(),
                'Sun Oct 01 2023 03:00:00 +1100 (Australia/Sydney)',
            );
            assert.strictEqual(
                date2.toString(),
                'Sun Oct 01 2023 01:00:00 +1000 (Australia/Sydney)',
            );
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

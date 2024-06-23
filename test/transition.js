import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime DST Transitions', function() {
    describe('Non-DST Offset (Post-Transition)', function() {
        it('creates correct date from format', function() {
            const date1 = DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '07/04/2019 03:01:00 +10:00');
            const date2 = date1.setTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 03:01:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date from array', function() {
            const date1 = DateTime.fromArray([2019, 4, 7, 3, 1, 0, 0], {
                timeZone: '+10:00',
            });
            const date2 = date1.setTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 03:01:00 +1000 (Australia/Sydney)',
            );
        });
    });

    describe('Non-DST Offset (Pre-Transition)', function() {
        it('creates correct date from format', function() {
            const date1 = DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '07/04/2019 02:01:00 +10:00');
            const date2 = date1.setTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date from array', function() {
            const date1 = DateTime.fromArray([2019, 4, 7, 2, 1, 0, 0], {
                timeZone: '+10:00',
            });
            const date2 = date1.setTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)',
            );
        });
    });

    describe('DST Offset (Pre-Transition)', function() {
        it('creates correct date from format', function() {
            const date1 = DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '07/04/2019 02:01:00 +11:00');
            const date2 = date1.setTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1100 (Australia/Sydney)',
            );
        });

        it('creates correct date from array', function() {
            const date1 = DateTime.fromArray([2019, 4, 7, 2, 1, 0, 0], {
                timeZone: '+11:00',
            });
            const date2 = date1.setTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1100 (Australia/Sydney)',
            );
        });
    });

    describe('DST Offset (Post-Transition)', function() {
        it('creates correct date if offset is not correct', function() {
            const date1 = DateTime.fromFormat('dd/MM/yyyy HH:mm:ss ZZZZZ', '07/04/2019 03:01:00 +11:00');
            const date2 = date1.setTimeZone('Australia/Sydney');
            assert.strictEqual(
                date2.toString(),
                'Sun Apr 07 2019 02:01:00 +1000 (Australia/Sydney)',
            );
        });

        it('creates correct date from array', function() {
            const date1 = DateTime.fromArray([2019, 4, 7, 3, 1, 0, 0], {
                timeZone: '+11:00',
            });
            const date2 = date1.setTimeZone('Australia/Sydney');
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

    describe('DST Transition To', function() {
        it('creates correct date (set year)', function() {
            const date1 = DateTime.fromArray([2023, 10, 1, 3, 0, 0, 0], {
                timeZone: 'Australia/Sydney',
            });
            const date2 = date1.setYear(2024);

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
            const date2 = date1.setMonth(10);

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
            const date2 = date1.setMonth(10, 1);

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
            const date2 = date1.setHours(3);

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
            const date2 = date1.setYear(2023);

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
            const date2 = date1.setMonth(9);

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
            const date2 = date1.setMonth(9, 30);

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
            const date2 = date1.setHours(1);

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

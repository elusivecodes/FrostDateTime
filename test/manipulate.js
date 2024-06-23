import assert from 'node:assert/strict';
import DateTime from './../src/index.js';

describe('DateTime Manipulation', function() {
    describe('#addDay', function() {
        it('works with day', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addDay();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-02T00:00:00.000+00:00',
            );
        });
    });

    describe('#addDays', function() {
        it('works with days', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addDays(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-03T00:00:00.000+00:00',
            );
        });
    });

    describe('#addHour', function() {
        it('works with hour', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addHour();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-01T01:00:00.000+00:00',
            );
        });
    });

    describe('#addHours', function() {
        it('works with hours', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addHours(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-01T02:00:00.000+00:00',
            );
        });
    });

    describe('#addMinute', function() {
        it('works with minute', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addMinute();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-01T00:01:00.000+00:00',
            );
        });
    });

    describe('#addMinutes', function() {
        it('works with minutes', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addMinutes(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-01T00:02:00.000+00:00',
            );
        });
    });

    describe('#addMonth', function() {
        it('works with month', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addMonth();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-02-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#addMonths', function() {
        it('works with months', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addMonths(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-03-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#addSecond', function() {
        it('works with second', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addSecond();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-01T00:00:01.000+00:00',
            );
        });
    });

    describe('#addSeconds', function() {
        it('works with seconds', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addSeconds(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-01T00:00:02.000+00:00',
            );
        });
    });

    describe('#addWeek', function() {
        it('works with week', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addWeek();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-08T00:00:00.000+00:00',
            );
        });
    });

    describe('#addWeeks', function() {
        it('works with weeks', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addWeeks(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-15T00:00:00.000+00:00',
            );
        });
    });

    describe('#addYear', function() {
        it('works with year', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addYear();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2019-01-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#addYears', function() {
        it('works with years', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.addYears(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2020-01-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#subDay', function() {
        it('works with day', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subDay();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-31T00:00:00.000+00:00',
            );
        });
    });

    describe('#subDays', function() {
        it('works with days', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subDays(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-30T00:00:00.000+00:00',
            );
        });
    });

    describe('#subHour', function() {
        it('works with hour', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subHour();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-31T23:00:00.000+00:00',
            );
        });
    });

    describe('#subHours', function() {
        it('works with hours', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subHours(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-31T22:00:00.000+00:00',
            );
        });
    });

    describe('#subMinute', function() {
        it('works with minute', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subMinute();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-31T23:59:00.000+00:00',
            );
        });
    });

    describe('#subMinutes', function() {
        it('works with minute', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subMinutes(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-31T23:58:00.000+00:00',
            );
        });
    });

    describe('#subMonth', function() {
        it('works with month', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subMonth();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#subMonths', function() {
        it('works with months', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subMonths(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-11-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#subSecond', function() {
        it('works with second', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subSecond();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-31T23:59:59.000+00:00',
            );
        });
    });

    describe('#subSeconds', function() {
        it('works with seconds', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subSeconds(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-31T23:59:58.000+00:00',
            );
        });
    });

    describe('#subWeek', function() {
        it('works with week', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subWeek();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-25T00:00:00.000+00:00',
            );
        });
    });

    describe('#subWeeks', function() {
        it('works with weeks', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subWeeks(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-12-18T00:00:00.000+00:00',
            );
        });
    });

    describe('#subYear', function() {
        it('works with year', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subYear();
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2017-01-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#subYears', function() {
        it('works with years', function() {
            const date1 = DateTime.fromArray([2018]);
            const date2 = date1.subYears(2);
            assert.strictEqual(
                date1.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2016-01-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#startOfDay', function() {
        it('works with day', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.startOfDay();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-15T00:00:00.000+00:00',
            );
        });
    });

    describe('#startOfHour', function() {
        it('works with hour', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.startOfHour();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-15T11:00:00.000+00:00',
            );
        });
    });

    describe('#startOfMinute', function() {
        it('works with minute', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.startOfMinute();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-15T11:30:00.000+00:00',
            );
        });
    });

    describe('#startOfMonth', function() {
        it('works with month', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.startOfMonth();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#startOfQuarter', function() {
        it('works with quarter', function() {
            const date1 = DateTime.fromArray([2018, 8, 15, 11, 30, 30, 500]);
            const date2 = date1.startOfQuarter();
            assert.strictEqual(
                date1.toISOString(),
                '2018-08-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-07-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#startOfSecond', function() {
        it('works with second', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.startOfSecond();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-15T11:30:30.000+00:00',
            );
        });
    });

    describe('#startOfWeek', function() {
        it('works with week', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.startOfWeek();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-10T00:00:00.000+00:00',
            );
        });
    });

    describe('#startOfYear', function() {
        it('works with year', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.startOfYear();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-01-01T00:00:00.000+00:00',
            );
        });
    });

    describe('#endOfDay', function() {
        it('works with day', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.endOfDay();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-15T23:59:59.999+00:00',
            );
        });
    });

    describe('#endOfHour', function() {
        it('works with hour', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.endOfHour();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-15T11:59:59.999+00:00',
            );
        });
    });

    describe('#endOfMinute', function() {
        it('works with minute', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.endOfMinute();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-15T11:30:59.999+00:00',
            );
        });
    });

    describe('#endOfMonth', function() {
        it('works with month', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.endOfMonth();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-30T23:59:59.999+00:00',
            );
        });
    });

    describe('#endOfQuarter', function() {
        it('works with quarter', function() {
            const date1 = DateTime.fromArray([2018, 8, 15, 11, 30, 30, 500]);
            const date2 = date1.endOfQuarter();
            assert.strictEqual(
                date1.toISOString(),
                '2018-08-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-09-30T23:59:59.999+00:00',
            );
        });
    });

    describe('#endOfSecond', function() {
        it('works with second', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.endOfSecond();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-15T11:30:30.999+00:00',
            );
        });
    });

    describe('#endOfWeek', function() {
        it('works with week', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.endOfWeek();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-06-16T23:59:59.999+00:00',
            );
        });
    });

    describe('#endOfYear', function() {
        it('works with year', function() {
            const date1 = DateTime.fromArray([2018, 6, 15, 11, 30, 30, 500]);
            const date2 = date1.endOfYear();
            assert.strictEqual(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00',
            );
            assert.strictEqual(
                date2.toISOString(),
                '2018-12-31T23:59:59.999+00:00',
            );
        });
    });
});

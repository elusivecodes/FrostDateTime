const assert = require('assert').strict;
const { DateTimeImmutable, DateInterval } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Manipulation', function() {

    describe('#add', function() {
        it('works with year', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('1 year');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('works with years', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('2 years');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2020-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('1 month');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-02-01T00:00:00.0+00:00'
            );
        });

        it('works with months', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('2 months');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-03-01T00:00:00.0+00:00'
            );
        });

        it('works with week', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('1 week');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-08T00:00:00.0+00:00'
            );
        });

        it('works with weeks', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('2 weeks');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-15T00:00:00.0+00:00'
            );
        });

        it('works with day', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('1 day');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-02T00:00:00.0+00:00'
            );
        });

        it('works with days', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('2 days');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-03T00:00:00.0+00:00'
            );
        });

        it('works with hour', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('1 hour');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T01:00:00.0+00:00'
            );
        });

        it('works with hours', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('2 hours');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T02:00:00.0+00:00'
            );
        });

        it('works with minute', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('1 minute');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T00:01:00.0+00:00'
            );
        });

        it('works with minutes', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('2 minutes');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T00:02:00.0+00:00'
            );
        });

        it('works with second', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('1 second');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T00:00:01.0+00:00'
            );
        });

        it('works with seconds', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.add('2 seconds');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T00:00:02.0+00:00'
            );
        });
    });

    describe('#addInterval', function() {
        it('works with year', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P1Y');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2019-01-01T00:00:00.0+00:00'
            );
        });

        it('works with years', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P2Y');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2020-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P1M');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-02-01T00:00:00.0+00:00'
            );
        });

        it('works with months', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P2M');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-03-01T00:00:00.0+00:00'
            );
        });

        it('works with week', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P1W');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-08T00:00:00.0+00:00'
            );
        });

        it('works with weeks', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P2W');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-15T00:00:00.0+00:00'
            );
        });

        it('works with day', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P1D');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-02T00:00:00.0+00:00'
            );
        });

        it('works with days', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P2D');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-03T00:00:00.0+00:00'
            );
        });

        it('works with hour', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT1H');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T01:00:00.0+00:00'
            );
        });

        it('works with hours', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT2H');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T02:00:00.0+00:00'
            );
        });

        it('works with minute', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT1M');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T00:01:00.0+00:00'
            );
        });

        it('works with minutes', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT2M');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T00:02:00.0+00:00'
            );
        });

        it('works with second', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT1S');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T00:00:01.0+00:00'
            );
        });

        it('works with seconds', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT2S');
            const date2 = date1.addInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T00:00:02.0+00:00'
            );
        });
    });

    describe('#sub', function() {
        it('works with year', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('1 year');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-01-01T00:00:00.0+00:00'
            );
        });

        it('works with years', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('2 years');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2016-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('1 month');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-01T00:00:00.0+00:00'
            );
        });

        it('works with months', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('2 months');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-11-01T00:00:00.0+00:00'
            );
        });

        it('works with week', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('1 week');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-25T00:00:00.0+00:00'
            );
        });

        it('works with weeks', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('2 weeks');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-18T00:00:00.0+00:00'
            );
        });

        it('works with day', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('1 day');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T00:00:00.0+00:00'
            );
        });

        it('works with days', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('2 days');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-30T00:00:00.0+00:00'
            );
        });

        it('works with hour', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('1 hour');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T23:00:00.0+00:00'
            );
        });

        it('works with hours', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('2 hours');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T22:00:00.0+00:00'
            );
        });

        it('works with minute', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('1 minute');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T23:59:00.0+00:00'
            );
        });

        it('works with minute', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('2 minutes');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T23:58:00.0+00:00'
            );
        });

        it('works with second', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('1 second');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T23:59:59.0+00:00'
            );
        });

        it('works with seconds', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const date2 = date1.sub('2 seconds');
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T23:59:58.0+00:00'
            );
        });
    });

    describe('#subInterval', function() {
        it('works with year', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P1Y');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-01-01T00:00:00.0+00:00'
            );
        });

        it('works with years', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P2Y');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2016-01-01T00:00:00.0+00:00'
            );
        });

        it('works with month', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P1M');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-01T00:00:00.0+00:00'
            );
        });

        it('works with months', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P2M');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-11-01T00:00:00.0+00:00'
            );
        });

        it('works with week', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P1W');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-25T00:00:00.0+00:00'
            );
        });

        it('works with weeks', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P2W');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-18T00:00:00.0+00:00'
            );
        });

        it('works with day', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P1D');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T00:00:00.0+00:00'
            );
        });

        it('works with days', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('P2D');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-30T00:00:00.0+00:00'
            );
        });

        it('works with hour', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT1H');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T23:00:00.0+00:00'
            );
        });

        it('works with hours', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT2H');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T22:00:00.0+00:00'
            );
        });

        it('works with minute', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT1M');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T23:59:00.0+00:00'
            );
        });

        it('works with minute', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT2M');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T23:58:00.0+00:00'
            );
        });

        it('works with second', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT1S');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T23:59:59.0+00:00'
            );
        });

        it('works with seconds', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1], 'UTC');
            const interval = new DateInterval('PT2S');
            const date2 = date1.subInterval(interval);
            assert.equal(
                date1.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2017-12-31T23:59:58.0+00:00'
            );
        });
    });

    describe('#startOf', function() {
        it('works with year', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('year');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-01-01T00:00:00.0+00:00'
            );
        });

        // quarter

        it('works with month', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('month');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-01T00:00:00.0+00:00'
            );
        });

        it('works with week', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('week');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-10T00:00:00.0+00:00'
            );
        });

        it('works with day', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('day');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-15T00:00:00.0+00:00'
            );
        });

        it('works with hour', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('hour');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-15T11:00:00.0+00:00'
            );
        });

        it('works with minute', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('minute');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-15T11:30:00.0+00:00'
            );
        });

        it('works with second', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.startOf('second');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-15T11:30:30.0+00:00'
            );
        });
    });

    describe('#endOf', function() {
        it('works with year', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('year');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-12-31T23:59:59.999+00:00'
            );
        });

        // quarter

        it('works with month', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('month');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-30T23:59:59.999+00:00'
            );
        });

        it('works with week', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('week');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-16T23:59:59.999+00:00'
            );
        });

        it('works with day', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('day');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-15T23:59:59.999+00:00'
            );
        });

        it('works with hour', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('hour');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-15T11:59:59.999+00:00'
            );
        });

        it('works with minute', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('minute');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-15T11:30:59.999+00:00'
            );
        });

        it('works with second', function() {
            const date1 = new DateTimeImmutable([2018, 5, 15, 11, 30, 30, 500], 'UTC');
            const date2 = date1.endOf('second');
            assert.equal(
                date1.toISOString(),
                '2018-06-15T11:30:30.500+00:00'
            );
            assert.equal(
                date2.toISOString(),
                '2018-06-15T11:30:30.999+00:00'
            );
        });
    });

});

const assert = require('assert').strict;
const { DateInterval, DateTime } = require('../../dist/frost-datetime.min');

describe('DateInterval #toString Tests', function() {

    describe('Arguments', function() {
        it('works with no argument', function() {
            const interval = new DateInterval;
            assert.doesNotThrow(_ => {
                interval.toString();
            });
        });

        it('uses default maxValues of 1', function() {
            it('works with positive year', function() {
                const date1 = new DateTime([2019, 1, 2, 1, 1, 1], 'UTC');
                const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
                const interval = date1.diff(date2);
                const intervalString = interval.toString();
                assert.equal(
                    intervalString,
                    'In 1 year'
                );
            });
        });

        it('works with maxValues', function() {
            const date1 = new DateTime([2019, 1, 2, 1, 1, 1], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString(6);
            assert.equal(
                intervalString,
                'In 1 year, 1 month, 1 day, 1 hour, 1 minute, 1 second'
            );
        });
    });

    describe('Now', function() {
        it('works with now', function() {
            const interval = new DateInterval;
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'Now'
            );
        });
    });

    describe('Years', function() {
        it('works with positive year', function() {
            const date1 = new DateTime([2019, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 1 year'
            );
        });

        it('works with negative year', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2019, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '1 year ago'
            );
        });

        it('works with positive years', function() {
            const date1 = new DateTime([2020, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 2 years'
            );
        });

        it('works with negative years', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2020, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '2 years ago'
            );
        });
    });

    describe('Months', function() {
        it('works with positive month', function() {
            const date1 = new DateTime([2018, 1, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 1 month'
            );
        });

        it('works with negative month', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 1, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '1 month ago'
            );
        });

        it('works with positive months', function() {
            const date1 = new DateTime([2018, 2, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 2 months'
            );
        });

        it('works with negative months', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 2, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '2 months ago'
            );
        });
    });

    describe('Days', function() {
        it('works with positive day', function() {
            const date1 = new DateTime([2018, 0, 2, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 1 day'
            );
        });

        it('works with negative day', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 2, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '1 day ago'
            );
        });

        it('works with positive days', function() {
            const date1 = new DateTime([2018, 0, 3, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 2 days'
            );
        });

        it('works with negative days', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 3, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '2 days ago'
            );
        });
    });

    describe('Hours', function() {
        it('works with positive hour', function() {
            const date1 = new DateTime([2018, 0, 1, 1, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 1 hour'
            );
        });

        it('works with negative hour', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 1, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '1 hour ago'
            );
        });

        it('works with positive hours', function() {
            const date1 = new DateTime([2018, 0, 1, 2, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 2 hours'
            );
        });

        it('works with negative hours', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 2, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '2 hours ago'
            );
        });
    });

    describe('Minutes', function() {
        it('works with positive minute', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 1, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 1 minute'
            );
        });

        it('works with negative minute', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 1, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '1 minute ago'
            );
        });

        it('works with positive minutes', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 2, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 2 minutes'
            );
        });

        it('works with negative minutes', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 2, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '2 minutes ago'
            );
        });
    });

    describe('Seconds', function() {
        it('works with positive second', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 1], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 1 second'
            );
        });

        it('works with negative second', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 1], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '1 second ago'
            );
        });

        it('works with positive seconds', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 2], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                'In 2 seconds'
            );
        });

        it('works with negative seconds', function() {
            const date1 = new DateTime([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTime([2018, 0, 1, 0, 0, 2], 'UTC');
            const interval = date1.diff(date2);
            const intervalString = interval.toString();
            assert.equal(
                intervalString,
                '2 seconds ago'
            );
        });
    });

});

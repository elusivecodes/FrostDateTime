const assert = require('assert').strict;
const { DateTime, DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Diff Tests', function() {

    describe('Arguments', function() {
        it('works with no argument', function() {
            const date = new DateTimeImmutable(Date.now(), 'UTC');
            assert.doesNotThrow(_ => {
                date.diff();
            });
        });

        it('works with timestamp', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const timestamp = 1514764799000;
            const diff = date.diff(timestamp);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 0,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with Date', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new Date(1514764799000);
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 0,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with DateTime', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTime(1514764799000);
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 0,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with DateTimeImmutable', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable(1514764799000);
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 0,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with date string', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const dateString = '31 Dec 2017 23:59:59 GMT';
            const diff = date.diff(dateString);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 0,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with date array', function() {
            const date = new DateTimeImmutable([2018, 0, 1, 0, 0, 0, 0], 'UTC');
            const dateArray = [2017, 11, 31, 23, 59, 59];
            const diff = date.diff(dateArray);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 0,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with timezones', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'Australia/Brisbane');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 10,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });
    });

    describe('Year/Month', function() {
        it('works with same year and month before', function() {
            const date1 = new DateTimeImmutable([2018, 1, 2, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 1,
                    d: 1,
                    days: 32,
                    h: 0,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with same year and month after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 1, 2, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 1,
                    d: 1,
                    days: 32,
                    h: 0,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with year after and month before', function() {
            const date1 = new DateTimeImmutable([2018, 1, 2, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2019, 0, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 10,
                    d: 27,
                    days: 333,
                    h: 0,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with year after and month after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2019, 1, 2, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 1,
                    m: 1,
                    d: 1,
                    days: 397,
                    h: 0,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with year before and month before', function() {
            const date1 = new DateTimeImmutable([2018, 1, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2017, 0, 2, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 1,
                    m: 0,
                    d: 30,
                    days: 395,
                    h: 0,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with year before and month after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 2, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2017, 1, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 11,
                    d: 1,
                    days: 335,
                    h: 0,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });
    });

    describe('Month/Day', function() {
        it('works with same month and day before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 2, 1, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 1,
                    days: 1,
                    h: 1,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with same month and day after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 2, 1, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 1,
                    days: 1,
                    h: 1,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with month after and day before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 2, 1, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 1, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 29,
                    days: 29,
                    h: 23,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with month after and day after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 1, 2, 1, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 1,
                    d: 1,
                    days: 32,
                    h: 1,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with month before and day before', function() {
            const date1 = new DateTimeImmutable([2018, 1, 2, 1, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 1,
                    d: 1,
                    days: 32,
                    h: 1,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with month before and day after', function() {
            const date1 = new DateTimeImmutable([2018, 1, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 2, 1, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 29,
                    days: 29,
                    h: 23,
                    i: 0,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });
    });

    describe('Day/Hour', function() {
        it('works with same day and hour before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 1, 1, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 1,
                    i: 1,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with same day and hour after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 1, 1, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 1,
                    i: 1,
                    s: 0,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with day after and hour before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 1, 1, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 2, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 22,
                    i: 59,
                    s: 0,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with day after and hour after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 2, 1, 1, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 1,
                    days: 1,
                    h: 1,
                    i: 1,
                    s: 0,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with day before and hour before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 2, 1, 1, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 1,
                    days: 1,
                    h: 1,
                    i: 1,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with day before and hour after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 2, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 1, 1, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 22,
                    i: 59,
                    s: 0,
                    f: 0,
                    invert: false
                }
            );
        });
    });

    describe('Hour/Minute', function() {
        it('works with same hour and minute before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 1, 1], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 1,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with same hour and minute after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 1, 1], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 1,
                    s: 1,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with hour after and minute before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 1, 1], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 1, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 58,
                    s: 59,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with hour after and minute after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 1, 1, 1], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 1,
                    i: 1,
                    s: 1,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with hour before and minute before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 1, 1, 1], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 1,
                    i: 1,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with hour before and minute after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 1, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 1, 1], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 58,
                    s: 59,
                    f: 0,
                    invert: false
                }
            );
        });
    });

    describe('Minute/Second', function() {
        it('works with same minute and second before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 1], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 0,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with same minute and second after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 1], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 0,
                    s: 1,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with minute after and second before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 1], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 1, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 0,
                    s: 59,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with minute after and second after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 1, 1], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 1,
                    s: 1,
                    f: 0,
                    invert: true
                }
            );
        });

        it('works with minute before and second before', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 1, 1], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 0], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 1,
                    s: 1,
                    f: 0,
                    invert: false
                }
            );
        });

        it('works with minute before and second after', function() {
            const date1 = new DateTimeImmutable([2018, 0, 1, 0, 1, 0], 'UTC');
            const date2 = new DateTimeImmutable([2018, 0, 1, 0, 0, 1], 'UTC');
            const diff = date1.diff(date2);
            assert.deepEqual(
                {
                    ...diff
                },
                {
                    y: 0,
                    m: 0,
                    d: 0,
                    days: 0,
                    h: 0,
                    i: 0,
                    s: 59,
                    f: 0,
                    invert: false
                }
            );
        });
    });
});

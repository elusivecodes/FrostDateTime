const assert = require('assert');
const { DateTimeImmutable } = require('../../dist/frost-datetime.min');

describe('DateTimeImmutable Is Valid', function() {

    describe('Era', function() {
        it('validates AD era', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('GGG', 'AD').isValid,
                true
            );
        });

        it('validates BC era', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('GGG', 'BC').isValid,
                true
            );
        });

        it('invalid eras', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('GGG GGG', 'AD BC').isValid,
                false
            );
        });
    });

    describe('Year', function() {
        it('validates year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyyy', '2018').isValid,
                true
            );
        });

        it('invalid years', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('yyyy yyyy', '2012 2018').isValid,
                false
            );
        });
    });

    describe('Week Year', function() {
        it('validates week year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('YYYY', '2018').isValid,
                true
            );
        });

        it('invalid years', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('YYYY YYYY', '2012 2018').isValid,
                false
            );
        });
    });

    describe('Quarter', function() {
        it('validates quarter', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('q', '3').isValid,
                true
            );
        });

        it('invalid quarter', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('q', '5').isValid,
                false
            );
        });

        it('invalid quarters', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('q q', '2 3').isValid,
                false
            );
        });
    });

    describe('Month', function() {
        it('validates month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('M', '10').isValid,
                true
            );
        });

        it('invalid month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('M', '13').isValid,
                false
            );
        });

        it('invalid months', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('M M', '5 10').isValid,
                false
            );
        });
    });

    describe('Week Of Year', function() {
        it('validates week of year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('w', '22').isValid,
                true
            );
        });

        it('invalid week of year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('w', '55').isValid,
                false
            );
        });

        it('invalid week of years', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('w w', '1 22').isValid,
                false
            );
        });
    });

    describe('Week Of Month', function() {
        it('validates week of month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('W', '3').isValid,
                true
            );
        });

        it('invalid week of month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('W', '6').isValid,
                false
            );
        });

        it('invalid week of months', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('W W', '1 3').isValid,
                false
            );
        });
    });

    describe('Day Of Month', function() {
        it('validates day of month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('d', '21').isValid,
                true
            );
        });

        it('invalid day of month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('d', '32').isValid,
                false
            );
        });

        it('invalid day of months', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('d d', '6 21').isValid,
                false
            );
        });
    });

    describe('Day Of Year', function() {
        it('validates day of year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('D', '152').isValid,
                true
            );
        });

        it('invalid day of year', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('D', '367').isValid,
                false
            );
        });

        it('invalid day of years', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('D D', '50 152').isValid,
                false
            );
        });
    });

    describe('Day Of Week In Month', function() {
        it('validates day of week in month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('F', '3').isValid,
                true
            );
        });

        it('invalid day of week in month', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('F', '6').isValid,
                false
            );
        });

        it('invalid day of week in months', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('F F', '1 3').isValid,
                false
            );
        });
    });

    describe('Week Day', function() {
        it('validates week day', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('e', '6').isValid,
                true
            );
        });

        it('invalid week day', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('e', '8').isValid,
                false
            );
        });

        it('invalid week days', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('e e', '2 6').isValid,
                false
            );
        });
    });

    describe('Day Period', function() {
        it('validates AM day period', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('aaa', 'AM').isValid,
                true
            );
        });

        it('validates PM day period', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('aaa', 'PM').isValid,
                true
            );
        });

        it('invalid day periods', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('aaa aaa', 'AM PM').isValid,
                false
            );
        });
    });

    describe('Hour', function() {
        it('validates hour', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('h', '12').isValid,
                true
            );
        });

        it('invalid hour', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('h', '13').isValid,
                false
            );
        });

        it('invalid hours', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('h h', '6 12').isValid,
                false
            );
        });
    });

    describe('Minute', function() {
        it('validates minute', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('m', '25').isValid,
                true
            );
        });

        it('invalid minute', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('m', '61').isValid,
                false
            );
        });

        it('invalid minutes', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('m m', '5 25').isValid,
                false
            );
        });
    });

    describe('Second', function() {
        it('validates second', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('s', '25').isValid,
                true
            );
        });

        it('invalid second', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('s', '61').isValid,
                false
            );
        });

        it('invalid seconds', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('s s', '5 25').isValid,
                false
            );
        });
    });

    describe('Fractional', function() {
        it('validates fractional', function() {
            assert.strictEqual(
                DateTimeImmutable.fromFormat('SSS', '123').isValid,
                true
            );
        });
    });

});
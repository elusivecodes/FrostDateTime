/**
 * FrostDateTime v2.0.0
 * https://github.com/elusivecodes/FrostDateTime
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        Object.assign(global, factory());
    }

})(this, function() {
    'use strict';

    /**
     * DateInterval class
     * @class
     */
    class DateInterval {

        /**
         * New DateInterval constructor.
         * @param {string} [interval] The ISO duration string.
         * @returns {DateInterval} A new DateInterval object.
         */
        constructor(interval = '') {
            this.y = 0;
            this.m = 0;
            this.d = 0;
            this.h = 0;
            this.i = 0;
            this.s = 0;
            this.f = 0;

            this.days = null;
            this.invert = false;

            if (!interval) {
                return;
            }

            if (this._parseISO(interval)) {
                return;
            }

            if (this._parseDateTime(interval)) {
                return;
            }

            throw new Error('Invalid interval supplied');
        }

        /**
         * Format the current interval with a PHP DateInterval format string.
         * @param {string} formatString The format string to use.
         * @returns {string} The formatted date interval.
         */
        format(formatString) {
            let escaped = false;
            return [...formatString].reduce(
                (acc, char) => {
                    if (!escaped && char === '%') {
                        escaped = true;
                    } else if (!escaped || !this.constructor._formatData[char]) {
                        acc += char;
                    } else {
                        acc += this.constructor._formatData[char](this);
                        escaped = false;
                    }
                    return acc;
                },
                ''
            );
        }

        /**
         * Format the current interval to a relative time string.
         * @param {number} [maxValues=1] The maximum number of values to return.
         * @returns {string} The formatted relative time string.
         */
        toString(maxValues = 1) {
            const formats = [],
                keys = this.constructor._formatKeys.slice();

            let key;
            while (key = keys.shift()) {
                if (maxValues <= 0) {
                    break;
                }

                if (!this[key]) {
                    continue;
                }

                const index = Math.abs(this[key]) === 1 ?
                    0 :
                    1;
                formats.push(
                    this.constructor.langs[key][index]
                );
                maxValues--;
            }

            return formats.length ?
                this.constructor.lang.relative[this.invert ?
                    'ago' :
                    'in'
                ].replace(
                    '%n',
                    this.format(
                        formats
                            .map(f => this.constructor.lang.intervals[f])
                            .join(this.constructor.lang.seperator)
                    )
                ) :
                this.constructor.lang.relative.now;
        }

    }

    /**
     * DateInterval Format Data
     */

    DateInterval._formatData = {

        /* YEAR */

        Y: interval =>
            DateInterval._formatNumber(interval.y, 2),

        y: interval =>
            DateInterval._formatNumber(interval.y),

        /* MONTH */

        M: interval =>
            DateInterval._formatNumber(interval.m, 2),

        m: interval =>
            DateInterval._formatNumber(interval.m),

        /* DAYS */

        D: interval =>
            DateInterval._formatNumber(interval.d, 2),

        d: interval =>
            DateInterval._formatNumber(interval.d),

        a: interval =>
            DateInterval._formatNumber(interval.days),

        /* HOURS */

        H: interval =>
            DateInterval._formatNumber(interval.h, 2),

        h: interval =>
            DateInterval._formatNumber(interval.h),

        /* MINUTES */

        I: interval =>
            DateInterval._formatNumber(interval.i, 2),

        i: interval =>
            DateInterval._formatNumber(interval.i),

        /* SECONDS */

        S: interval =>
            DateInterval._formatNumber(interval.s, 2),

        s: interval =>
            DateInterval._formatNumber(interval.s),

        /* MICROSECONDS */

        F: interval =>
            DateInterval._formatNumber(interval.f, 6),

        f: interval =>
            DateInterval._formatNumber(interval.f),

        /* SIGN */

        R: interval =>
            interval.invert ?
                '-' :
                '+',

        r: interval =>
            interval.invert ?
                '-' :
                ''

    };

    /**
     * DateInterval Helpers
     */

    Object.assign(DateInterval.prototype, {

        /**
         * Parse a DateTime duration string.
         * @param {string} [interval] The DateTime duration string.
         * @return {Boolean} TRUE if the duration string was parsed, otherwise FALSE.
         */
        _parseDateTime(interval) {
            const dateTimeMatch = interval.match(this.constructor._dateTimeRegExp);

            if (!dateTimeMatch) {
                return false;
            }

            if (dateTimeMatch[1]) {
                this.y += parseInt(dateTimeMatch[1]);
            }

            if (dateTimeMatch[2]) {
                this.m += parseInt(dateTimeMatch[2]);
            }

            if (dateTimeMatch[3]) {
                this.d += parseInt(dateTimeMatch[3]);
            }

            if (dateTimeMatch[4]) {
                this.h += parseInt(dateTimeMatch[4]);
            }

            if (dateTimeMatch[5]) {
                this.i += parseInt(dateTimeMatch[5]);
            }

            if (dateTimeMatch[6]) {
                this.s += parseInt(dateTimeMatch[6]);
            }

            return true;
        },

        /**
         * Parse an ISO duration string.
         * @param {string} [interval] The ISO duration string.
         * @return {Boolean} TRUE if the duration string was parsed, otherwise FALSE.
         */
        _parseISO(interval) {
            const isoMatch = interval.match(this.constructor._isoRegExp);

            if (!isoMatch) {
                return false;
            }

            if (isoMatch[1]) {
                this.y += parseInt(isoMatch[1]);
            }

            if (isoMatch[2]) {
                this.m += parseInt(isoMatch[2]);
            }

            if (isoMatch[3]) {
                this.d += parseInt(isoMatch[3]);
            }

            if (isoMatch[4]) {
                this.d += parseInt(isoMatch[4]) * 7;
            }

            if (isoMatch[5]) {
                this.h += parseInt(isoMatch[5]);
            }

            if (isoMatch[6]) {
                this.i += parseInt(isoMatch[6]);
            }

            if (isoMatch[7]) {
                this.s += parseInt(isoMatch[7]);
            }

            return true;
        }

    });

    /**
     * DateInterval (Static)
     */

    Object.assign(DateInterval, {

        /**
         * Create a new DateInterval from the relative parts of the string.
         * @param {string} durationString The date with relative parts.
         * @returns {DateInterval} A new DateInterval object.
         */
        fromString(durationString) {
            const interval = new this,
                regExp = new RegExp(this._stringRegExp);

            let match;
            while (match = regExp.exec(durationString)) {
                const value = parseInt(match[1]);

                if (match[2]) {
                    // years
                    interval.y += value;
                } else if (match[3]) {
                    // months
                    interval.m += value;
                } else if (match[4]) {
                    // fortnights
                    interval.d += value * 14;
                } else if (match[5]) {
                    // weeks
                    interval.d += value * 7;
                } else if (match[6]) {
                    // days
                    interval.d += value;
                } else if (match[7]) {
                    // hours
                    interval.h += value;
                } else if (match[8]) {
                    // minutes
                    interval.i += value;
                } else if (match[9]) {
                    // seconds
                    interval.s += value;
                }
            }

            return interval;
        },

        /**
         * Format a number to string (optionally zero-padded).
         * @param {number} value The number to format.
         * @param {number} [padding] The number of digits to zero-pad to.
         * @returns {string} The formatted number string.
         */
        _formatNumber(number, padding = 0) {
            return `${number}`.padStart(padding, 0);
        }

    });

    /**
     * DateInterval Properties
     */

    Object.assign(DateInterval, {

        // Format keys
        _formatKeys: ['y', 'm', 'd', 'h', 'i', 's'],

        // Language
        lang: {
            intervals: {
                day: '%d day',
                days: '%d days',
                hour: '%h hour',
                hours: '%h hours',
                minute: '%i minute',
                minutes: '%i minutes',
                month: '%m month',
                months: '%m months',
                second: '%s second',
                seconds: '%s seconds',
                year: '%y year',
                years: '%y years'
            },
            relative: {
                ago: '%n ago',
                in: 'In %n',
                now: 'Now'
            },
            seperator: ', '
        },

        langs: {
            y: ['year', 'years'],
            m: ['month', 'months'],
            d: ['day', 'days'],
            h: ['hour', 'hours'],
            i: ['minute', 'minutes'],
            s: ['second', 'seconds']
        },

        // DateTime RegExp
        _dateTimeRegExp: /^P(\d{4})\-(\d{2})\-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})$/,

        // ISO RegExp
        _isoRegExp: /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:(\d+)W)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?|)$/,

        // String RegExp
        _stringRegExp: /([\+\-]?\s*\d+)\s*(?:(years?)|(months?)|(fortnights?|forthnights?)|(weeks?)|(days?)|(hours?)|(minutes?|mins?)|(seconds?|secs?))/gi

    });

    /**
     * DateTime class
     * @class
     */
    class DateTime {

        /**
         * New DateTime constructor.
         * @param {null|string} [dateString] The date to parse.
         * @param {null|string} [timeZone] The timeZone.
         * @returns {DateTime} A new DateTime object.
         */
        constructor(dateString = null, timeZone = null) {

            let timestamp,
                adjustOffset = false;

            if (dateString === null) {
                timestamp = Date.now();
            } else if (dateString === `${dateString}`) {
                timestamp = Date.parse(dateString);

                if (isNaN(timestamp)) {
                    throw new Error('Invalid date string supplied');
                }

                if (!dateString.match(this.constructor._dateStringTimeZoneRegExp)) {
                    timestamp -= new Date()
                        .getTimezoneOffset()
                        * 60000;
                }

                adjustOffset = true;
            } else {
                throw new Error('Invalid date supplied');
            }

            this._utcDate = new Date(timestamp);
            this._fraction = 0;
            this._dynamicTz = false;
            this.isValid = true;

            if (!timeZone) {
                timeZone = this.constructor.defaultTimeZone;
            }

            const match = timeZone.match(this.constructor._offsetRegExp);
            if (match) {
                this._offset = match[2] * 60 + parseInt(match[4]);
                if (this._offset && match[1] === '+') {
                    this._offset *= -1;
                }
                this._timeZone = this.constructor._formatOffset(this._offset);
            } else if (timeZone in this.constructor._abbrOffsets) {
                this.constructor._loadTimeZoneAbbreviation(timeZone);
                this._offset = this.constructor._abbreviations[timeZone];
                this._timeZone = timeZone;
            } else if (timeZone in this.constructor._zones) {
                this.constructor._loadTimeZone(timeZone);
                this._dynamicTz = true;
                this._timeZone = timeZone;

                this._makeFormatter();
                this._checkOffset();
            } else {
                throw new Error('Invalid timeZone supplied');
            }

            if (adjustOffset) {
                this._adjustOffset();
            }

            if (this._dynamicTz) {
                this._getTransition();
            }
        }

        /**
         * Get an object representation of the date/time.
         * @returns {object} An object representation of the date/time.
         */
        toObject() {
            return {
                year: this.getYear(),
                month: this.getMonth(),
                date: this.getDate(),
                hours: this.getHours(),
                minutes: this.getMinutes(),
                seconds: this.getSeconds(),
                milliseconds: this.getMilliseconds(),
                timeZone: this.getTimeZone()
            };
        }

        /**
         * Get the number of milliseconds since the UNIX epoch.
         * @returns {number} The number of milliseconds since the UNIX epoch.
         */
        valueOf() {
            return this.getTime();
        }

        /**
         * Return a primitive value of the DateTime.
         * @returns {string|number}
         */
        [Symbol.toPrimitive](hint) {
            return hint === 'number' ?
                this.valueOf() :
                this.toString();
        }

    }

    /**
     * DateTimeImmutable class
     * @class
     */
    class DateTimeImmutable extends DateTime {

        /**
         * Set the number of milliseconds since the UNIX epoch.
         * @param {number} time The number of milliseconds since the UNIX epoch.
         * @returns {DateTimeImmutable} A new DateTimeImmutable object.
         */
        setTime(time) {
            const tempDate = new DateTimeImmutable(null, this.getTimeZone());
            tempDate._utcDate = new Date(time);

            if (!tempDate._dynamicTz) {
                return tempDate;
            }

            tempDate._checkOffset();

            const timestamp = time / 1000;
            if (
                timestamp < tempDate._transition.start ||
                timestamp > tempDate._transition.end
            ) {
                tempDate._getTransition();
            }

            return tempDate;
        }

        /**
         * Set the current timeZone.
         * @param {string} timeZone The name of the timeZone.
         * @returns {DateTimeImmutable} A new DateTimeImmutable object.
         */
        setTimeZone(timeZone) {
            const tempDate = new DateTimeImmutable(null, timeZone);
            return tempDate.setTime(this.getTime());
        }

        /**
         * Set the current UTC offset.
         * @param {number} offset The UTC offset (in minutes).
         * @returns {DateTimeImmutable} The DateTime object.
         */
        setTimeZoneOffset(offset) {
            const tempDate = this.clone();

            tempDate._dynamicTz = false;
            tempDate._offset = offset || 0;
            tempDate._timeZone = this.constructor._formatOffset(tempDate._offset);
            tempDate._transition = null;
            tempDate._formatter = null;

            return tempDate;
        }

    }

    /**
     * DateTime Format Data
     */

    DateTime._formatData = {

        /* YEAR */

        // leap year
        L: {
            output: datetime =>
                DateTime._formatNumber(
                    datetime.isLeapYear() ?
                        1 :
                        0
                )
        },

        // year
        Y: {
            value: 'year',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{1,4})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getYear()
                )
        },

        // year short
        y: {
            value: 'year',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{2})`,
            input: value =>
                (value < 70 ? 2000 : 1900)
                + DateTime._parseNumber(value),
            output: datetime => {
                const year = datetime.getYear()
                    .toString();
                return DateTime._formatNumber(
                    year.substring(year.length - 2)
                );
            }
        },

        // iso year
        o: {
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getISOYear()
                )
        },

        /* MONTH */

        // month name
        F: {
            value: 'month',
            regex: _ =>
                `(${DateTime.lang.months.full.join('|')})`,
            input: value =>
                DateTime.lang.months['full'].indexOf(value) + 1,
            output: datetime =>
                datetime.monthName()
        },

        // month name short
        M: {
            value: 'month',
            regex: _ =>
                `(${DateTime.lang.months.short.join('|')})`,
            input: value =>
                DateTime.lang.months['short'].indexOf(value) + 1,
            output: datetime =>
                datetime.monthName('short')
        },

        // month
        m: {
            value: 'month',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{2})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getMonth(),
                    2
                )
        },

        // month short
        n: {
            value: 'month',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{1,2})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getMonth()
                )
        },

        // days in month
        t: {
            output: datetime =>
                DateTime._formatNumber(
                    datetime.daysInMonth()
                )
        },

        /* WEEKS */

        // iso week
        W: {
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getISOWeek()
                )
        },

        /* DAYS */

        // day of year
        z: {
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{1,3})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getDayOfYear()
                )
        },

        // date
        d: {
            value: 'date',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{2})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getDate(),
                    2
                )
        },

        // date short
        j: {
            value: 'date',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{1,2})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getDate()
                )
        },

        // ordinal suffix
        S: {
            regex: _ =>
                DateTime.lang.ordinalRegExp,
            output: datetime =>
                datetime.dateSuffix()
        },

        // iso day
        N: {
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getISODay()
                )
        },

        // day of week
        w: {
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getDay()
                )
        },

        // day name
        l: {
            value: 'day',
            regex: _ =>
                `(${DateTime.lang.days.full.join('|')})`,
            input: value =>
                DateTime.lang.days.full.indexOf(value),
            output: datetime =>
                datetime.dayName()
        },

        // day name short
        D: {
            value: 'day',
            regex: _ =>
                `(${DateTime.lang.days.short.join('|')})`,
            input: value =>
                DateTime.lang.days.short.indexOf(value),
            output: datetime =>
                datetime.dayName('short')
        },

        /* TIME */

        // day period
        a: {
            value: 'dayPeriod',
            regex: _ =>
                `(${DateTime.lang.dayPeriods.lower.join('|')})`,
            input: value =>
                DateTime.lang.dayPeriods.lower.indexOf(value) ?
                    'pm' :
                    'am',
            output: datetime =>
                DateTime.lang.dayPeriods.lower[datetime.getHours() < 12 ?
                    0 :
                    1
                ]
        },

        // day period upper
        A: {
            value: 'dayPeriod',
            regex: _ =>
                `(${DateTime.lang.dayPeriods.upper.join('|')})`,
            input: value =>
                DateTime.lang.dayPeriods.upper.indexOf(value) ?
                    'pm' :
                    'am',
            output: datetime =>
                DateTime.lang.dayPeriods.upper[datetime.getHours() < 12 ?
                    0 :
                    1
                ]
        },

        // swatch time
        B: {
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getBeat()
                )
        },

        // hours (24)
        H: {
            value: 'hours',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{2})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getHours(),
                    2
                )
        },

        // hours short (24)
        G: {
            value: 'hours',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{1,2})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getHours()
                )
        },

        // hours (12)
        h: {
            value: 'hours',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{2})`,
            input: value =>
                DateTime._parseNumber(value) % 12,
            output: datetime =>
                DateTime._formatNumber(
                    (
                        datetime.getHours() % 12 ||
                        12
                    ),
                    2
                )
        },

        // hours short (12)
        g: {
            value: 'hours',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{1,2})`,
            input: value =>
                DateTime._parseNumber(value) % 12,
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getHours() % 12 ||
                    12
                )
        },

        // minutes
        i: {
            value: 'minutes',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{2})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getMinutes(),
                    2
                )
        },

        // seconds
        s: {
            value: 'seconds',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{2})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getSeconds(),
                    2
                )
        },

        // milliseconds
        v: {
            value: 'milliseconds',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{1,3})`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime => {
                return DateTime._formatNumber(
                    datetime.getMilliseconds()
                );
            }
        },

        // microseconds
        u: {
            value: 'milliseconds',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{1,6})`,
            input: value =>
                DateTime._parseNumber(value)
                / 1000,
            output: datetime => {
                return DateTime._formatNumber(
                    Math.floor(
                        (
                            datetime.getMilliseconds()
                            + datetime._fraction
                        )
                        * 1000
                    )
                );
            }
        },

        /* TIMEZONE */

        // timeZone
        e: {
            value: 'timeZone',
            regex: '([\\w\\/]+)',
            input: value => value,
            output: datetime => datetime._timeZone
        },

        // daylight savings
        I: {
            output: datetime =>
                DateTime._formatNumber(
                    datetime.isDST() ?
                        1 :
                        0
                )
        },

        // offset
        O: {
            value: 'timeZone',
            regex: _ =>
                `([\\+\\-][${DateTime.lang.numberRegExp}]{4})`,
            input: value => value,
            output: datetime =>
                DateTime._formatOffset(datetime._offset, false)
        },

        // offset colon
        P: {
            value: 'timeZone',
            regex: _ =>
                `([\\+\\-][${DateTime.lang.numberRegExp}]{2}\\:[${DateTime.lang.numberRegExp}]{2})`,
            input: value => value,
            output: datetime =>
                DateTime._formatOffset(datetime._offset)
        },

        // timeZone abbreviated
        T: {
            value: 'timeZone',
            regex: '([A-Z]{1,5})',
            input: value => value,
            output: datetime =>
                datetime.getTimeZoneAbbr()
        },

        // offset seconds
        Z: {
            value: 'offset',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]{1,5})`,
            input: value =>
                DateTime._parseNumber(value)
                / 60,
            output: datetime =>
                DateTime._formatNumber(
                    datetime._offset
                    * -60
                )
        },

        /* FULL */

        // iso 8601
        c: {
            output: datetime =>
                datetime.toISOString()
        },

        // rfc 2822
        r: {
            output: datetime =>
                datetime.format(DateTime.formats.rfc822)
        },

        // timestamp
        U: {
            value: 'timestamp',
            regex: _ =>
                `([${DateTime.lang.numberRegExp}]+)`,
            input: value =>
                DateTime._parseNumber(value),
            output: datetime =>
                DateTime._formatNumber(
                    datetime.getTime()
                )
        },

        /* SPECIAL */

        // space
        ' ': {
            regex: '(\\s)'
        },

        // seperator
        '#': {
            regex: _ =>
                `([${DateTime._seperators.map(
                    seperator => '\\' + seperator
                ).join('')}])`
        },

        // wildcard
        '?': {
            regex: '(.)'
        },

        // wildcards
        '*': {
            regex: _ =>
                `([^${DateTime._seperators.map(
                    seperator => '\\' + seperator
                )}${DateTime.lang.numberRegExp}]*)`
        }

    };

    /**
     * DateTime Attributes (Get)
     */

    Object.assign(DateTime.prototype, {

        /**
         * Get the internet swatch time beat in current timeZone.
         * @returns {number} The internet swatch time beat.
         */
        getBeat() {
            const tempDate = new Date(
                this.getTime()
                + 3600000
            );
            return (
                (
                    tempDate.getUTCHours() * 3600000
                    + tempDate.getUTCMinutes() * 60000
                    + tempDate.getUTCSeconds() * 1000
                    + tempDate.getUTCMilliseconds()
                )
                / 86400
            ) | 0;
        },

        /**
         * Get the date of the month in current timeZone.
         * @returns {number} The date of the month.
         */
        getDate() {
            return new Date(this._getOffsetTime()).getUTCDate();
        },

        /**
         * Get the day of the week in current timeZone.
         * @returns {number} The day of the week. (0 - Sunday, 6 - Saturday)
         */
        getDay() {
            return new Date(this._getOffsetTime()).getUTCDay();
        },

        /**
         * Get the day of the year in current timeZone.
         * @returns {number} The day of the year. (1, 366)
         */
        getDayOfYear() {
            return this.constructor.dayOfYear(
                this.getYear(),
                this.getMonth(),
                this.getDate()
            );
        },

        /**
         * Get the hours of the day in current timeZone.
         * @returns {number} The hours of the day. (0, 23)
         */
        getHours() {
            return new Date(this._getOffsetTime()).getUTCHours();
        },

        /**
         * Get the ISO day of the week in current timeZone.
         * @returns {number} The ISO day of the week. (1 - Monday, 7 = Sunday)
         */
        getISODay() {
            return this.constructor._isoDay(
                this.getDay()
            );
        },

        /**
         * Get the ISO week in current timeZone.
         * @returns {number} The ISO week. (1, 53)
         */
        getISOWeek() {
            const
                week = this.constructor._isoDate(
                    this.getYear(),
                    this.getMonth(),
                    this.getDate()
                ),
                firstWeek = this.constructor._isoDate(
                    week.getUTCFullYear(),
                    1,
                    4
                );

            return 1
                + (
                    (
                        (week - firstWeek)
                        / 604800000
                    ) | 0
                );
        },

        /**
         * Get the ISO year in current timeZone.
         * @returns {number} The ISO year.
         */
        getISOYear() {
            return this.constructor._isoDate(
                this.getYear(),
                this.getMonth(),
                this.getDate()
            ).getUTCFullYear();
        },

        /**
         * Get the milliseconds in current timeZone.
         * @returns {number} The milliseconds.
         */
        getMilliseconds() {
            return new Date(this._getOffsetTime()).getUTCMilliseconds();
        },

        /**
         * Get the minutes in current timeZone.
         * @returns {number} The minutes. (0, 59)
         */
        getMinutes() {
            return new Date(this._getOffsetTime()).getUTCMinutes();
        },

        /**
         * Get the month in current timeZone.
         * @returns {number} The month. (1, 12)
         */
        getMonth() {
            return new Date(this._getOffsetTime()).getUTCMonth() + 1;
        },

        /**
         * Get the quarter of the year in current timeZone.
         * @returns {number} The quarter of the year. (1, 4)
         */
        getQuarter() {
            return Math.ceil(
                (this.getMonth() + 1)
                / 3
            );
        },

        /**
         * Get the seconds in current timeZone.
         * @returns {number} The seconds. (0, 59)
         */
        getSeconds() {
            return new Date(this._getOffsetTime()).getUTCSeconds();
        },

        /**
         * Get the number of milliseconds since the UNIX epoch.
         * @returns {number} The number of milliseconds since the UNIX epoch.
         */
        getTime() {
            return this._utcDate.getTime();
        },

        /**
         * Get the number of seconds since the UNIX epoch.
         * @returns {number} The number of seconds since the UNIX epoch.
         */
        getTimestamp() {
            return this.getTime()
                / 1000;
        },

        /**
         * Get the name of the current timeZone.
         * @returns {string} The name of the current timeZone.
         */
        getTimeZone() {
            return this._timeZone;
        },

        /**
         * Get the abbreviated name of the current timeZone.
         * @returns {string} The abbreviated name of the current timeZone.
         */
        getTimeZoneAbbr() {
            if (!this._dynamicTz) {
                return this._timeZone;
            }

            return this.isDST() ?
                this._transition.dst :
                this._transition.abbr;
        },

        /**
         * Get the UTC offset (in minutes) of the current timeZone.
         * @returns {number} The UTC offset (in minutes) of the current timeZone.
         */
        getTimeZoneOffset() {
            return this._offset;
        },

        /**
         * Get the year in current timeZone.
         * @returns {number} The year.
         */
        getYear() {
            return new Date(this._getOffsetTime()).getUTCFullYear();
        }

    });

    /**
     * DateTime Attributes (Set)
     */

    Object.assign(DateTime.prototype, {

        /**
         * Set the internet swatch time beat in current timeZone.
         * @param {number} beat The internet swatch time beat.
         * @returns {DateTime} The DateTime object.
         */
        setBeat(beat) {
            return this.setTime(
                new Date(
                    this.getTime()
                    + 3600000
                ).setUTCHours(
                    0,
                    0,
                    0,
                    beat * 86400
                )
                - 3600000
            );
        },

        /**
         * Set the date of the month in current timeZone.
         * @param {number} date The date of the month.
         * @returns {DateTime} The DateTime object.
         */
        setDate(date) {
            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCDate(date)
            );
        },

        /**
         * Set the day of the week in current timeZone.
         * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
         * @returns {DateTime} The DateTime object.
         */
        setDay(day) {
            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCDate(
                    this.getDate()
                    - this.getDay()
                    + parseInt(day)
                )
            );
        },

        /**
         * Set the day of the year in current timeZone.
         * @param {number} day The day of the year. (1, 366)
         * @returns {DateTime} The DateTime object.
         */
        setDayOfYear(day) {
            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCMonth(
                    0,
                    day
                )
            );
        },

        /**
         * Set the hours in current timeZone (and optionally, minutes, seconds and milliseconds).
         * @param {number} hours The hours. (0, 23)
         * @param {number} [minutes] The minutes. (0, 59)
         * @param {number} [seconds] The seconds. (0, 59)
         * @param {number} [milliseconds] The milliseconds.
         * @returns {DateTime} The DateTime object.
         */
        setHours(...args) {
            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCHours(...args)
            );
        },

        /**
         * Set the ISO day of the week in current timeZone.
         * @param {number} day The ISO day of the week. (1 - Monday, 7 - Sunday)
         * @returns {DateTime} The DateTime object.
         */
        setISODay(day) {
            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCDate(
                    this.getDate()
                    - this.getISODay()
                    + parseInt(day)
                )
            );
        },

        /**
         * Set the ISO day of the week in current timeZone (and optionally, day of the week).
         * @param {number} week The ISO week.
         * @param {null|number} [day] The ISO day of the week. (1 - Monday, 7 - Sunday)
         * @returns {DateTime} The DateTime object.
         */
        setISOWeek(week, day = null) {
            if (day === null) {
                day = this.getISODay();
            }

            const tempDate = new Date(this._getOffsetTime());

            tempDate.setUTCFullYear(
                this.getISOYear(),
                0,
                4
                + (
                    (week - 1)
                    * 7
                )
            );

            return this._setOffsetTime(
                tempDate.setUTCDate(
                    tempDate.getUTCDate()
                    - this.constructor._isoDay(
                        tempDate.getUTCDay()
                    )
                    + parseInt(day)
                )
            );
        },

        /**
         * Set the ISO day of the week in current timeZone (and optionally, week and day of the week).
         * @param {number} year The ISO year.
         * @param {null|number} [week] The ISO week.
         * @param {null|number} [day] The ISO day of the week. (1 - Monday, 7 - Sunday)
         * @returns {DateTime} The DateTime object.
         */
        setISOYear(year, week = null, day = null) {
            if (week === null) {
                week = this.getISOWeek();
            }

            if (day === null) {
                day = this.getISODay();
            }

            const tempDate = new Date(this._getOffsetTime());

            tempDate.setUTCFullYear(
                year,
                0,
                4
                + (
                    (week - 1)
                    * 7
                )
            );

            return this._setOffsetTime(
                tempDate.setUTCDate(
                    tempDate.getUTCDate()
                    - this.constructor._isoDay(
                        tempDate.getUTCDay()
                    )
                    + parseInt(day)
                )
            );
        },

        /**
         * Set the milliseconds in current timeZone.
         * @param {number} milliseconds The milliseconds.
         * @returns {DateTime} The DateTime object.
         */
        setMilliseconds(ms) {
            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCMilliseconds(ms)
            );
        },

        /**
         * Set the minutes in current timeZone (and optionally, seconds and milliseconds).
         * @param {number} minutes The minutes. (0, 59)
         * @param {number} [seconds] The seconds. (0, 59)
         * @param {number} [milliseconds] The milliseconds.
         * @returns {DateTime} The DateTime object.
         */
        setMinutes(...args) {
            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCMinutes(...args)
            );
        },

        /**
         * Set the month in current timeZone (and optionally, date).
         * @param {number} month The month. (1, 12)
         * @param {null|number} [date] The date of the month.
         * @returns {DateTime} The DateTime object.
         */
        setMonth(month, date = null) {
            if (date === null) {
                date = this.getDate();

                if (this.constructor.clampDates) {
                    date = Math.min(
                        date,
                        this.constructor.daysInMonth(
                            this.getYear(),
                            month
                        )
                    );
                }
            }

            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCMonth(
                    month - 1,
                    date
                )
            );
        },

        /**
         * Set the quarter of the year in current timeZone.
         * @param {number} quarter The quarter of the year. (1, 4)
         * @returns {DateTime} The DateTime object.
         */
        setQuarter(quarter) {
            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCMonth(
                    quarter * 3
                    - 3
                )
            );
        },

        /**
         * Set the seconds in current timeZone (and optionally, milliseconds).
         * @param {number} seconds The seconds. (0, 59)
         * @param {number} [milliseconds] The milliseconds.
         * @returns {DateTime} The DateTime object.
         */
        setSeconds(...args) {
            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCSeconds(...args)
            );
        },

        /**
         * Set the number of milliseconds since the UNIX epoch.
         * @param {number} time The number of milliseconds since the UNIX epoch.
         * @returns {DateTime} The DateTime object.
         */
        setTime(time) {
            this._utcDate.setTime(time);

            if (!this._dynamicTz) {
                return this;
            }

            this._checkOffset();

            const timestamp = time / 1000;
            if (
                timestamp < this._transition.start ||
                timestamp > this._transition.end
            ) {
                this._getTransition();
            }

            return this;
        },

        /**
         * Set the number of seconds since the UNIX epoch.
         * @param {number} timestamp The number of seconds since the UNIX epoch.
         * @returns {DateTime} The DateTime object.
         */
        setTimestamp(timestamp) {
            return this.setTime(timestamp * 1000);
        },

        /**
         * Set the current timeZone.
         * @param {string} timeZone The name of the timeZone.
         * @param {Boolean} [adjust=false] Whether to adjsut the timestamp.
         * @returns {DateTime} The DateTime object.
         */
        setTimeZone(timeZone, adjust = false) {
            this._dynamicTz = false;

            const offset = this._offset;

            const match = timeZone.match(this.constructor._offsetRegExp);
            if (match) {
                this._offset = match[2] * 60 + parseInt(match[4]);
                if (this._offset && match[1] === '+') {
                    this._offset *= -1;
                }
                this._timeZone = this.constructor._formatOffset(this._offset);
            } else if (timeZone in this.constructor._abbrOffsets) {
                this.constructor._loadTimeZoneAbbreviation(timeZone);
                this._offset = this.constructor._abbreviations[timeZone];
                this._timeZone = timeZone;
            } else if (timeZone in this.constructor._zones) {
                this.constructor._loadTimeZone(timeZone);
                this._dynamicTz = true;
                this._timeZone = timeZone;

                this._makeFormatter();
                this._checkOffset();
            } else {
                throw new Error('Invalid timeZone supplied');
            }

            // compensate for DST transitions
            if (adjust && offset !== this._offset) {
                this._utcDate.setTime(
                    this._utcDate.getTime()
                    - (offset - this._offset) * 60000
                );
            }

            if (this._dynamicTz) {
                this._getTransition();
            }

            return this;
        },

        /**
         * Set the current UTC offset.
         * @param {number} offset The UTC offset (in minutes).
         * @returns {DateTime} The DateTime object.
         */
        setTimeZoneOffset(offset) {
            this._dynamicTz = false;
            this._offset = offset || 0;
            this._timeZone = this.constructor._formatOffset(this._offset);
            this._transition = null;
            this._formatter = null;

            return this;
        },

        /**
         * Set the year in current timeZone (and optionally, month and date).
         * @param {number} year The year.
         * @param {null|number} [month] The month. (1, 12)
         * @param {null|number} [date] The date of the month.
         * @returns {DateTime} The DateTime object.
         */
        setYear(year, month = null, date = null) {
            if (month === null) {
                month = this.getMonth();
            }

            if (this.constructor.clampDates && date === null) {
                date = Math.min(
                    this.getDate(),
                    this.constructor.daysInMonth(
                        year,
                        month
                    )
                );
            }

            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCFullYear(
                    year,
                    month - 1,
                    date
                )
            );
        }

    });

    /**
     * DateTime Helpers
     */

    Object.assign(DateTime.prototype, {

        _adjustOffset() {
            if (!this._offset) {
                return;
            }

            const oldOffset = this._offset;
            this._utcDate.setTime(
                this.getTime()
                + this._offset * 60000
            );

            if (this._dynamicTz) {
                this._checkOffset();

                // compensate for DST transitions
                if (oldOffset !== this._offset) {
                    this._utcDate.setTime(
                        this._utcDate.getTime()
                        - (oldOffset - this._offset) * 60000
                    );
                }
            }
        },

        /**
         * Update the timeZone offset for current timestamp.
         */
        _checkOffset() {
            this._offset = this._timeZone === 'UTC' ?
                0 :
                (
                    new Date(
                        this.constructor._utcFormatter.format(this)
                    )
                    - new Date(
                        this._formatter.format(this)
                    )
                )
                / 60000;
        },

        /**
         * Compare this DateTime with another date.
         * @param {DateTime} other The date to compare to.
         * @param {string} granularity The level of granularity to use for comparison.
         * @param {function} callback The callback to compare the difference in values.
         * @returns {Boolean} TRUE if the comparison test was passed for the level of granularity, otherwise FALSE.
         */
        _compare(other, granularity, callback) {
            if (!granularity) {
                const timeDiff = this.getTime()
                    - other.getTime();
                return callback(timeDiff) >= 0;
            }

            granularity = granularity.toLowerCase();

            for (const lookup of this.constructor._compareLookup) {
                const preCheck = !lookup.values.includes(granularity);
                const method = lookup.method;
                const diff = this[method]() - other[method]();
                const result = callback(diff, preCheck);

                if (result < 0) {
                    return false;
                } else if (result > 0) {
                    return true;
                }

                if (!preCheck) {
                    break;
                }
            }

            return true;
        },

        /**
         * Get the number of milliseconds since the UNIX epoch (offset to timeZone).
         * @returns {number} The number of milliseconds since the UNIX epoch (offset to timeZone).
         */
        _getOffsetTime() {
            return this.getTime()
                - this._offset * 60000;
        },

        /**
         * Update the timeZone transition for current timestamp.
         */
        _getTransition() {
            const timestamp = this.getTimestamp();

            this._transition = this.constructor._timeZones[this._timeZone]
                .find(transition =>
                    transition.start <= timestamp &&
                    transition.end >= timestamp
                );
        },

        /**
         * Update the formatter for current timeZone.
         */
        _makeFormatter() {
            this._formatter = new Intl.DateTimeFormat(this.constructor._formatterLocale, {
                ...this.constructor._formatterOptions,
                timeZone: this._timeZone
            });
        },

        /**
         * Modify the DateTime by a duration.
         * @param {number} amount The amount to modify the date by.
         * @param {string} [timeUnit] The unit of time.
         * @return {DateTime} The DateTime object.
         */
        _modify(amount, timeUnit) {
            timeUnit = timeUnit.toLowerCase();

            switch (timeUnit) {
                case 'second':
                case 'seconds':
                    return this.setSeconds(
                        this.getSeconds() + amount
                    );
                case 'minute':
                case 'minutes':
                    return this.setMinutes(
                        this.getMinutes() + amount
                    );
                case 'hour':
                case 'hours':
                    return this.setHours(
                        this.getHours() + amount
                    );
                case 'week':
                case 'weeks':
                    return this.setDate(
                        this.getDate() + (amount * 7)
                    );
                case 'day':
                case 'days':
                    return this.setDate(
                        this.getDate() + amount
                    );
                case 'month':
                case 'months':
                    return this.setMonth(
                        this.getMonth() + amount
                    );
                case 'year':
                case 'years':
                    return this.setYear(
                        this.getYear() + amount
                    );
                default:
                    throw new Error('Invalid time unit supplied');
            }
        },

        /**
         * Modify the DateTime by a DateInterval.
         * @param {DateInterval} interval The DateInterval to modify the date by.
         * @param {Boolean} [invert=false] Whether to invert (subtract) the interval.
         * @return {DateTime} The DateTime object.
         */
        _modifyInterval(interval, invert = false) {
            let modify = 1;

            if (interval.invert) {
                modify *= -1;
            }

            if (invert) {
                modify *= -1;
            }

            const tempDate = new Date(this._getOffsetTime());

            if (interval.y) {
                tempDate.setUTCFullYear(
                    tempDate.getUTCFullYear()
                    + interval.y * modify
                );
            }

            if (interval.m) {
                tempDate.setUTCMonth(
                    tempDate.getUTCMonth()
                    + interval.m * modify
                );
            }

            if (interval.d) {
                tempDate.setUTCDate(
                    tempDate.getUTCDate()
                    + interval.d * modify
                );
            }

            if (interval.h) {
                tempDate.setUTCHours(
                    tempDate.getUTCHours()
                    + interval.h * modify
                );
            }

            if (interval.i) {
                tempDate.setUTCMinutes(
                    tempDate.getUTCMinutes()
                    + interval.i * modify
                );
            }

            if (interval.s) {
                tempDate.setUTCSeconds(
                    tempDate.getUTCSeconds()
                    + interval.s * modify
                );
            }

            if (interval.f) {
                tempDate.setUTCTime(
                    tempDate.getUTCTime()
                    + interval.f * modify
                );
            }

            return this._setOffsetTime(
                tempDate.getTime()
            );
        },

        /**
         * Set the number of milliseconds since the UNIX epoch (offset to timeZone).
         * @param {number} time The number of milliseconds since the UNIX epoch (offset to timeZone).
         * @returns {DateTime} The DateTime object.
         */
        _setOffsetTime(time) {
            return this.setTime(
                time +
                this._offset * 60000
            );
        }

    });

    /**
     * DateTime Manipulation
     */

    Object.assign(DateTime.prototype, {

        /**
         * Add a duration to the date.
         * @param {number} amount The amount to modify the date by.
         * @param {string} timeUnit The unit of time.
         * @returns {DateTime} The DateTime object.
         */
        add(amount, timeUnit) {
            return this._modify(amount, timeUnit);
        },

        /**
         * Add a DateInterval to the date.
         * @param {DateInterval} [interval] The DateInterval to add to the current date.
         * @returns {DateTime} The DateTime object.
         */
        addInterval(interval) {
            return this._modifyInterval(interval);
        },

        /**
         * Modify the DateTime by setting it to the end of a unit of time.
         * @param {string} [timeUnit] The unit of time.
         * @returns {DateTime} The DateTime object.
         */
        endOf(timeUnit) {
            timeUnit = timeUnit.toLowerCase();

            switch (timeUnit) {
                case 'second':
                    return this.setMilliseconds(999);
                case 'minute':
                    return this.setSeconds(59, 999);
                case 'hour':
                    return this.setMinutes(59, 59, 999);
                case 'day':
                case 'date':
                    return this.setHours(23, 59, 59, 999);
                case 'week':
                    return this.setDay(6)
                        .setHours(23, 59, 59, 999);
                case 'isoweek':
                    return this.setISODay(7)
                        .setHours(23, 59, 59, 999);
                case 'month':
                    return this.setDate(this.daysInMonth())
                        .setHours(23, 59, 59, 999);
                case 'quarter':
                    const month = this.getQuarter() * 3;
                    return this.setMonth(month, this.constructor.daysInMonth(this.getYear(), month))
                        .setHours(23, 59, 59, 999);
                case 'year':
                    return this.setMonth(12, 31)
                        .setHours(23, 59, 59, 999);
                default:
                    throw new Error('Invalid time unit supplied');
            }
        },

        /**
         * Modify the DateTime by setting it to the start of a unit of time.
         * @param {string} [timeUnit] The unit of time.
         * @returns {DateTime} The DateTime object.
         */
        startOf(timeUnit) {
            timeUnit = timeUnit.toLowerCase();

            switch (timeUnit) {
                case 'second':
                    return this.setMilliseconds(0);
                case 'minute':
                    return this.setSeconds(0, 0);
                case 'hour':
                    return this.setMinutes(0, 0, 0);
                case 'day':
                case 'date':
                    return this.setHours(0, 0, 0, 0);
                case 'week':
                    return this.setDay(0)
                        .setHours(0, 0, 0, 0);
                case 'isoweek':
                    return this.setISODay(1)
                        .setHours(0, 0, 0, 0);
                case 'month':
                    return this.setDate(1)
                        .setHours(0, 0, 0, 0);
                case 'quarter':
                    const month = this.getQuarter() * 3 - 2;
                    return this.setMonth(month, 1)
                        .setHours(0, 0, 0, 0);
                case 'year':
                    return this.setMonth(1, 1)
                        .setHours(0, 0, 0, 0);
                default:
                    throw new Error('Invalid time unit supplied');
            }
        },

        /**
         * Subtract a duration from the date.
         * @param {number} amount The amount to modify the date by.
         * @param {string} timeUnit The unit of time.
         * @returns {DateTime} The DateTime object.
         */
        sub(amount, timeUnit) {
            return this._modify(-amount, timeUnit);
        },

        /**
         * Subtract a DateInterval to the date.
         * @param {DateInterval} [interval] The DateInterval to subtract from the current date.
         * @returns {DateTime} The DateTime object.
         */
        subInterval(interval) {
            return this._modifyInterval(interval, true);
        }

    });

    /**
     * DateTime Output
     */

    Object.assign(DateTime.prototype, {

        /**
         * Format the current date with a PHP DateTime format string.
         * @param {string} formatString The string to use for formatting.
         * @returns {string} The formatted date string.
         */
        format(formatString) {
            let escaped = false;
            return [...formatString].reduce(
                (acc, char) => {
                    if (
                        !escaped &&
                        char === '\\'
                    ) {
                        escaped = true;
                    } else if (
                        escaped ||
                        !this.constructor._formatData[char] ||
                        !this.constructor._formatData[char].output
                    ) {
                        acc += char;
                        escaped = false;
                    } else {
                        acc += this.constructor._formatData[char].output(this);
                    }
                    return acc;
                },
                ''
            );
        },

        /**
         * Format the current date using "D M d Y".
         * @returns {string} The formatted date string.
         */
        toDateString() {
            return this.format(this.constructor.formats.date)
        },

        /**
         * Format the current date using Date's native "toLocaleDateString" method.
         * @param {string|string[]} [locales] The locale(s) to use for formatting.
         * @param {object} [options] The options to use for formatting.
         * @param {string} [options.localeMatcher] The locale matching algorithm to use.
         * @param {string} [options.timeZone] The time zone to use.ANGLE_instanced_arrays
         * @param {Boolean} [options.hour12] Whether to use 12-hour time.
         * @param {string} [options.hourCycle] The hour cycle to use.
         * @param {string} [options.formatMatcher] The format matching algorithm to use.
         * @param {string} [options.weekday] The method to represent the weekday.
         * @param {string} [options.era] The method to represent the era.
         * @param {string} [options.year] The method to represent the year.
         * @param {string} [options.month] The method to represent the month.
         * @param {string} [options.day] The method to represent the day.
         * @param {string} [options.hour] The method to represent the hour.
         * @param {string} [options.minute] The method to represent the minute.
         * @param {string} [options.second] The method to represent the second.
         * @param {string} [options.timeZoneName] The method to represent the time zone name.
         * @returns {string} The formatted date string.
         */
        toLocaleDateString(locales, options) {
            return this._utcDate.toLocaleDateString(
                locales || this.constructor.defaultLocale,
                {
                    timeZone: this._timeZone,
                    ...options
                }
            );
        },

        /**
         * Format the current date using Date's native "toLocaleString" method.
         * @param {string|string[]} [locales] The locale(s) to use for formatting.
         * @param {object} [options] The options to use for formatting.
         * @param {string} [options.localeMatcher] The locale matching algorithm to use.
         * @param {string} [options.timeZone] The time zone to use.ANGLE_instanced_arrays
         * @param {Boolean} [options.hour12] Whether to use 12-hour time.
         * @param {string} [options.hourCycle] The hour cycle to use.
         * @param {string} [options.formatMatcher] The format matching algorithm to use.
         * @param {string} [options.weekday] The method to represent the weekday.
         * @param {string} [options.era] The method to represent the era.
         * @param {string} [options.year] The method to represent the year.
         * @param {string} [options.month] The method to represent the month.
         * @param {string} [options.day] The method to represent the day.
         * @param {string} [options.hour] The method to represent the hour.
         * @param {string} [options.minute] The method to represent the minute.
         * @param {string} [options.second] The method to represent the second.
         * @param {string} [options.timeZoneName] The method to represent the time zone name.
         * @returns {string} The formatted date string.
         */
        toLocaleString(locales, options) {
            return this._utcDate.toLocaleString(
                locales || this.constructor.defaultLocale,
                {
                    timeZone: this._timeZone,
                    ...options
                }
            );
        },

        /**
         * Format the current date using Date's native "toLocaleTimeString" method.
         * @param {string|string[]} [locales] The locale(s) to use for formatting.
         * @param {object} [options] The options to use for formatting.
         * @param {string} [options.localeMatcher] The locale matching algorithm to use.
         * @param {string} [options.timeZone] The time zone to use.ANGLE_instanced_arrays
         * @param {Boolean} [options.hour12] Whether to use 12-hour time.
         * @param {string} [options.hourCycle] The hour cycle to use.
         * @param {string} [options.formatMatcher] The format matching algorithm to use.
         * @param {string} [options.weekday] The method to represent the weekday.
         * @param {string} [options.era] The method to represent the era.
         * @param {string} [options.year] The method to represent the year.
         * @param {string} [options.month] The method to represent the month.
         * @param {string} [options.day] The method to represent the day.
         * @param {string} [options.hour] The method to represent the hour.
         * @param {string} [options.minute] The method to represent the minute.
         * @param {string} [options.second] The method to represent the second.
         * @param {string} [options.timeZoneName] The method to represent the time zone name.
         * @returns {string} The formatted date string.
         */
        toLocaleTimeString(locales, options) {
            return this._utcDate.toLocaleTimeString(
                locales || this.constructor.defaultLocale,
                {
                    timeZone: this._timeZone,
                    ...options
                }
            );
        },

        /**
         * Format the current date using "Y-m-d\TH:i:s.vP".
         * @returns {string} The formatted date string.
         */
        toISOString() {
            return this.format(this.constructor.formats.rfc3339_extended)
        },

        /**
         * Format the current date using "D M d Y H:i:s O (e)".
         * @returns {string} The formatted date string.
         */
        toString() {
            return this.format(this.constructor.formats.string);
        },

        /**
         * Format the current date using "H:i:s O (e)".
         * @returns {string} The formatted date string.
         */
        toTimeString() {
            return this.format(this.constructor.formats.time);
        },

        /**
         * Format the current date in UTC timeZone using "D M d Y H:i:s O (e)".
         * @returns {string} The formatted date string.
         */
        toUTCString() {
            return new DateTime(null, 'UTC')
                .setTime(this.getTime())
                .toString();
        }

    });

    /**
     * DateTime Utility
     */

    Object.assign(DateTime.prototype, {

        /**
         * Create a new DateTime using the current date and timeZone.
         * @returns {DateTime} A new DateTime object.
         */
        clone() {
            return this.constructor.fromTimestamp(this.getTimestamp(), this.getTimeZone());
        },

        /**
         * Get the ordinal suffix for the date of the month.
         * @returns {string} The ordinal suffix for the date of the month.
         */
        dateSuffix() {
            return this.constructor.lang.ordinal(
                this.getDate()
            );
        },

        /**
         * Get the name of the day of the week in current timeZone.
         * @param {string} [type=full] The type of day name to return.
         * @returns {string} The name of the day of the week.
         */
        dayName(type = 'full') {
            return this.constructor.lang.days[type][this.getDay()];
        },

        /**
         * Get the number of days in the current month.
         * @returns {number} The number of days in the current month.
         */
        daysInMonth() {
            return this.constructor.daysInMonth(
                this.getYear(),
                this.getMonth()
            );
        },

        /**
         * Get the number of days in the current year.
         * @returns {number} The number of days in the current year.
         */
        daysInYear() {
            return this.constructor.daysInYear(
                this.getYear()
            );
        },

        /**
         * Get the difference between two Dates.
         * @param {DateTime} [other] The date to compare to.
         * @param {Boolean} [absolute=false] Whether the interval will be forced to be positive.
         * @returns {DateInterval} A new DateInterval object.
         */
        diff(other = null, absolute = false) {
            const interval = new DateInterval;

            if (this.getTime() === other.getTime()) {
                interval.days = 0;
                return interval;
            }

            const lessThan = this < other,
                thisMonth = this.getMonth(),
                thisDate = this.getDate(),
                thisHour = this.getHours(),
                thisMinute = this.getMinutes(),
                thisSecond = this.getSeconds(),
                thisMillisecond = this.getMilliseconds()
                    * 1000,
                otherMonth = other.getMonth(),
                otherDate = other.getDate(),
                otherHour = other.getHours(),
                otherMinute = other.getMinutes(),
                otherSecond = other.getSeconds(),
                otherMillisecond = other.getMilliseconds()
                    * 1000;

            interval.y = Math.abs(
                this.getYear()
                - other.getYear()
            );
            interval.m = Math.abs(
                thisMonth
                - otherMonth
            );
            interval.d = Math.abs(
                thisDate
                - otherDate
            );
            interval.h = Math.abs(
                thisHour
                - otherHour
            );
            interval.i = Math.abs(
                thisMinute
                - otherMinute
            );
            interval.s = Math.abs(
                thisSecond
                - otherSecond
            );
            interval.f = Math.abs(
                thisMillisecond
                - otherMillisecond
            );
            interval.days = (
                Math.abs(
                    (this - other)
                    / 86400000
                )
            ) | 0;
            interval.invert = !absolute && lessThan;

            if (
                interval.y &&
                interval.m &&
                (
                    (
                        !lessThan &&
                        thisMonth < otherMonth
                    ) ||
                    (
                        lessThan &&
                        thisMonth > otherMonth
                    )
                )
            ) {
                interval.y--;
                interval.m = 12 - interval.m;
            }

            if (
                interval.m &&
                interval.d &&
                (
                    (!
                        lessThan &&
                        thisDate < otherDate
                    ) ||
                    (
                        lessThan &&
                        thisDate > otherDate
                    )
                )
            ) {
                interval.m--;
                interval.d = (
                    lessThan ?
                        this.daysInMonth() :
                        other.daysInMonth()
                ) - interval.d;
            }

            if (
                interval.d &&
                interval.h &&
                (
                    (
                        !lessThan &&
                        thisHour < otherHour
                    ) ||
                    (
                        lessThan &&
                        thisHour > otherHour
                    )
                )
            ) {
                interval.d--;
                interval.h = 24 - interval.h;
            }

            if (
                interval.h &&
                interval.i &&
                (
                    (
                        !lessThan &&
                        thisMinute < otherMinute
                    ) ||
                    (
                        lessThan &&
                        thisMinute > otherMinute
                    )
                )
            ) {
                interval.h--;
                interval.i = 60 - interval.i;
            }

            if (
                interval.i &&
                interval.s &&
                (
                    (
                        !lessThan &&
                        thisSecond < otherSecond
                    ) ||
                    (
                        lessThan &&
                        thisSecond > otherSecond
                    )
                )
            ) {
                interval.i--;
                interval.s = 60 - interval.s;
            }

            if (
                interval.s &&
                interval.f &&
                (
                    (
                        !lessThan &&
                        thisMillisecond < otherMillisecond
                    ) ||
                    (
                        lessThan &&
                        thisMillisecond > otherMillisecond
                    )
                )
            ) {
                interval.s--;
                interval.f = 1000000 - interval.f;
            }

            return interval;
        },

        /**
         * Determine whether this DateTime is after another date (optionally to a granularity).
         * @param {DateTime} [other] The date to compare to.
         * @param {string} [granularity] The level of granularity to use for comparison.
         * @returns {Boolean} TRUE if this DateTime is after the other date, otherwise FALSE.
         */
        isAfter(other, granularity) {
            return this._compare(
                other,
                granularity,
                (diff, preCheck) => {
                    if (diff > 0) {
                        return 1;
                    }

                    if (diff < 0 || (!diff && !preCheck)) {
                        return -1;
                    }

                    return 0;
                }
            );
        },

        /**
         * Determine whether this DateTime is before another date (optionally to a granularity).
         * @param {DateTime} [other] The date to compare to.
         * @param {string} [granularity] The level of granularity to use for comparison.
         * @returns {Boolean} TRUE if this DateTime is before the other date, otherwise FALSE.
         */
        isBefore(other, granularity) {
            return this._compare(
                other,
                granularity,
                (diff, preCheck) => {
                    if (diff < 0) {
                        return 1;
                    }

                    if (diff > 0 || (!diff && !preCheck)) {
                        return -1;
                    }

                    return 0;
                }
            );
        },

        /**
         * Determine whether this DateTime is between two other dates (optionally to a granularity).
         * @param {DateTime} [start] The first date to compare to.
         * @param {DateTime} [end] The second date to compare to.
         * @param {string} [granularity] The level of granularity to use for comparison.
         * @returns {Boolean} TRUE if this DateTime is between the other dates, otherwise FALSE.
         */
        isBetween(start, end, granularity) {
            return this.isAfter(start, granularity) &&
                this.isBefore(end, granularity);
        },

        /**
         * Return true if the DateTime is in daylight savings.
         * @returns {Boolean} TRUE if the current time is in daylight savings, otherwise FALSE.
         */
        isDST() {
            if (!this._dynamicTz || !this._transition.dst) {
                return false;
            }

            const year = this.getYear(),
                dateA = DateTime.fromArray([year, 1, 1], this._timeZone),
                dateB = DateTime.fromArray([year, 6, 1], this._timeZone);

            if (dateA.getTimestamp() < this._transition.start) {
                dateA.setYear(year + 1);
            }

            if (dateB.getTimestamp() > this._transition.end) {
                dateB.setYear(year - 1);
            }

            if (
                dateA.getTimestamp() > this._transition.end ||
                dateB.getTimestamp() < this._transition.start
            ) {
                dateA.setTimestamp(this._transition.start);
                dateB.setTimestamp(this._transition.end);
            }

            return this._offset < Math.max(dateA._offset, dateB._offset);
        },

        /**
         * Return true if the year is a leap year.
         * @returns {Boolean} TRUE if the current year is a leap year, otherwise FALSE.
         */
        isLeapYear() {
            return this.constructor.isLeapYear(
                this.getYear()
            );
        },

        /**
         * Determine whether this DateTime is the same as another date (optionally to a granularity).
         * @param {DateTime} [other] The date to compare to.
         * @param {string} [granularity] The level of granularity to use for comparison.
         * @returns {Boolean} TRUE if this DateTime is the same as the other date, otherwise FALSE.
         */
        isSame(other, granularity) {
            return this._compare(
                other,
                granularity,
                diff => diff ?
                    -1 :
                    0
            );
        },

        /**
         * Determine whether this DateTime is the same or after another date (optionally to a granularity).
         * @param {DateTime} [other] The date to compare to.
         * @param {string} [granularity] The level of granularity to use for comparison.
         * @returns {Boolean} TRUE if this DateTime is the same or after the other date, otherwise FALSE.
         */
        isSameOrAfter(other, granularity) {
            return this._compare(
                other,
                granularity,
                diff => {
                    if (diff > 0) {
                        return 1;
                    }

                    if (diff < 0) {
                        return -1;
                    }

                    return 0;
                }
            );
        },

        /**
         * Determine whether this DateTime is the same or before another date.
         * @param {DateTime} other The date to compare to.
         * @param {string} [granularity] The level of granularity to use for comparison.
         * @returns {Boolean} TRUE if this DateTime is the same or before the other date, otherwise FALSE.
         */
        isSameOrBefore(other, granularity) {
            return this._compare(
                other,
                granularity,
                diff => {
                    if (diff < 0) {
                        return 1;
                    }

                    if (diff > 0) {
                        return -1;
                    }

                    return 0;
                }
            );
        },

        /**
         * Get the name of the month in current timeZone.
         * @param {string} [type=full] The type of month name to return.
         * @returns {string} The name of the month.
         */
        monthName(type = 'full') {
            return this.constructor.lang.months[type][this.getMonth() - 1];
        },

        /**
         * Get the number of weeks in the current ISO year.
         * @returns {number} The number of weeks in the current ISO year.
         */
        weeksInISOYear() {
            return this.constructor.weeksInISOYear(this.getISOYear());
        }

    });

    /**
     * DateTime (Static) Creation
     */

    Object.assign(DateTime, {

        /**
         * Create a new DateTime from an array.
         * @param {number[]} date The date to parse.
         * @param {null|string} [timeZone] The timeZone.
         * @returns {DateTime} A new DateTime object.
         */
        fromArray(dateArray, timeZone) {
            const dateValues = dateArray.slice(0, 3);
            const timeValues = dateArray.slice(3);

            if (dateValues.length < 3) {
                dateValues.push(...new Array(3 - dateValues.length).fill(1));
            }

            if (timeValues.length < 4) {
                timeValues.push(...new Array(4 - timeValues.length).fill(0));
            }

            return new this(null, timeZone)
                .setYear(...dateValues)
                .setHours(...timeValues);
        },

        /**
         * Create a new DateTime from a Date.
         * @param {Date} date The date.
         * @param {null|string} [timeZone] The timeZone.
         * @returns {DateTime} A new DateTime object.
         */
        fromDate(date, timeZone = null) {
            return new this(null, timeZone)
                .setTime(date.getTime());
        },

        /**
         * Create a new DateTime from a date string and format string.
         * @param {string} formatString The PHP date format string.
         * @param {string} dateString The date string to parse.
         * @param {string} [timeZone=null] The timeZone to use for the new DateTime.
         * @returns {DateTime} A new DateTime object.
         */
        fromFormat(formatString, dateString, timeZone = null) {
            let escaped = false;
            const originalDateString = dateString,
                data = [...formatString].reduce(
                    (acc, char) => {
                        if (
                            !escaped &&
                            char === '\\'
                        ) {
                            escaped = true;
                            return acc;
                        }

                        if (
                            escaped &&
                            char === dateString.substring(0, 1)
                        ) {
                            dateString = dateString.substring(1);
                            escaped = false;
                            return acc;
                        }

                        if (
                            this._seperators.includes(char) &&
                            char === dateString.substring(0, 1)
                        ) {
                            dateString = dateString.substring(1);
                            return acc;
                        }

                        if (['!', '|'].includes(char)) {
                            return Object.assign(
                                acc,
                                char === '!' ?
                                    this._epoch :
                                    {
                                        ...this._epoch,
                                        ...acc
                                    }
                            );
                        }

                        if (
                            !this._formatData[char] ||
                            !this._formatData[char].regex
                        ) {
                            throw new Error(`Invalid char in DateTime format: ${char}`);
                        }

                        const regex = this._formatData[char].regex,
                            regExp = (typeof regex === 'function' ?
                                regex(char) :
                                regex
                            ),
                            dateMatch = dateString.match(new RegExp(`^${regExp}`));

                        if (!dateMatch) {
                            throw new Error(`Unmatched char in DateTime string: ${char}`);
                        }

                        dateString = dateString.substring(dateMatch[1].length);

                        if (this._formatData[char].input) {
                            const value = this._formatData[char].value;
                            acc[value] = this._formatData[char].input(dateMatch[1]);
                        }

                        return acc;
                    },
                    {}
                );

            let date = this.fromObject(data);

            date.isValid = date.format(formatString) === originalDateString;

            if (timeZone !== null && timeZone !== date.getTimeZone() && !('timeZone' in data)) {
                date = date.setTimeZone(timeZone, true);
            }

            return date;
        },

        /**
         * Create a new DateTime from an object containing date properties.
         * @param {object} dateObject An object with date properties.
         * @param {number} [dateObject.year] The year.
         * @param {number} [dateObject.month] The month.
         * @param {number} [dateObject.date] The date.
         * @param {number} [dateObject.dayOfYear] The day of the year.
         * @param {number} [dateObject.day] The day of the week.
         * @param {number} [dateObject.hours] The hours.
         * @param {number} [dateObject.minutes] The minutes.
         * @param {number} [dateObject.seconds] The seconds.
         * @param {number} [dateObject.milliseconds] The milliseconds.
         * @param {Boolean} [dateObject.pm] Whether the hours are in PM.
         * @param {number} [dateObject.timestamp] The number of seconds since the UNIX epoch.
         * @param {string} [dateObject.timeZone] The timeZone, abbreviation or offset.
         * @param {string} [timeZone=null] The timeZone to use for the new DateTime.
         * @returns {DateTime} A new DateTime object.
         */
        fromObject(dateObject, timeZone = null) {
            let date,
                currentDay = null,
                initialTimeZone = 'timeZone' in dateObject ?
                    dateObject.timeZone :
                    timeZone;

            if (dateObject.timestamp) {
                date = this.fromTimestamp(dateObject.timestamp, initialTimeZone);
            } else {
                if ('dayOfYear' in dateObject &&
                    !(
                        'month' in dateObject ||
                        'date' in dateObject
                    )
                ) {
                    dateObject.month = 0;
                    dateObject.date = dateObject.dayOfYear;
                }

                if ('dayPeriod' in dateObject) {
                    if ('hours' in dateObject) {
                        dateObject.hours = dateObject.hours % 12;
                    } else {
                        dateObject.hours = 0
                    }

                    if (dateObject.dayPeriod === 'pm') {
                        dateObject.hours += 12;
                    }
                }

                if (
                    'day' in dateObject &&
                    !('date' in dateObject)
                ) {
                    currentDay = dateObject.day;
                }

                const now = new Date,
                    newDate = {
                        year: now.getFullYear(),
                        month: now.getMonth(),
                        date: now.getDate(),
                        hours: now.getHours(),
                        minutes: now.getMinutes(),
                        seconds: now.getSeconds(),
                        milliseconds: now.getMilliseconds(),
                        ...dateObject
                    };

                if (
                    !('date' in dateObject) &&
                    (
                        'month' in dateObject ||
                        'year' in dateObject
                    )
                ) {
                    const days = this.daysInMonth(newDate.year, newDate.month);
                    newDate.date = Math.min(days, newDate.date);
                }

                const currentDate = [
                    newDate.year,
                    newDate.month,
                    newDate.date,
                    newDate.hours,
                    newDate.minutes,
                    newDate.seconds,
                    newDate.milliseconds
                ];

                date = this.fromArray(currentDate, initialTimeZone);
            }

            // set fraction
            if (dateObject.milliseconds) {
                date._fraction = dateObject.milliseconds - Math.floor(dateObject.milliseconds);
            }

            // set day
            if (currentDay !== null) {
                date = date.setDay(currentDay);
            }

            // set time zone
            if (timeZone !== null && timeZone !== date.getTimeZone() && !('timeZone' in dateObject)) {
                date = date.setTimeZone(timeZone, true);
            }

            return date;
        },

        /**
         * Create a new DateTime from a timestamp.
         * @param {number} timestamp The timestamp.
         * @param {null|string} [timeZone] The timeZone.
         * @returns {DateTime} A new DateTime object.
         */
        fromTimestamp(timestamp, timeZone = null) {
            return new this(null, timeZone)
                .setTimestamp(timestamp);
        },

        /**
         * Create a new DateTime for the current time.
         * @param {null|string} [timeZone] The timezone.
         */
        now(timeZone) {
            return new this(null, timeZone);
        }

    });

    /**
     * DateTime (Static) Helpers
     */

    Object.assign(DateTime, {

        /**
         * Format a number to string using localized digits (and optionally zero-padded).
         * @param {number} value The number to format.
         * @param {number} [padding] The number of digits to zero-pad to.
         * @returns {string} The formatted number string.
         */
        _formatNumber(value, padding) {
            value = value.toString();

            if (padding) {
                value = value.padStart(padding, 0);
            }

            return this.lang.numbers ?
                value.replace(
                    /./g,
                    match => this.lang.numbers[match]
                ) :
                value;
        },

        /**
         * Format a number to an offset string.
         * @param {number} offset The offset to format.
         * @param {Boolean} [useColon=true] Whether to use a colon seperator.
         * @returns {string} The formatted offset string.
         */
        _formatOffset(offset, useColon = true) {
            const sign = offset > 0 ?
                '-' :
                '+';
            const hours = this._formatNumber(
                Math.abs(
                    (offset / 60) | 0
                ),
                2
            );
            const minutes = this._formatNumber(
                Math.abs(offset % 60),
                2
            );
            const colon = useColon ?
                ':' :
                '';
            return `${sign}${hours}${colon}${minutes}`;
        },

        /**
         * Create a Date object set to Thursday of the ISO week.
         * @param {number} year The year.
         * @param {number} month The month.
         * @param {number} date The date.
         * @returns {Date} A new Date object.
         */
        _isoDate(...args) {
            if (args.length > 1) {
                args[1]--;
            }

            const date = new Date(
                Date.UTC(...args)
            ),
                day = this._isoDay(date.getUTCDay());
            date.setUTCDate(
                date.getUTCDate()
                - day
                + 4
            );
            return date;
        },

        /**
         * Convert a day of the week to a ISO format.
         * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
         * @returns {number} The day of the week in ISO format. (1 - Monday, 7 - Sunday)
         */
        _isoDay(day) {
            return (
                (parseInt(day) + 6) % 7
            ) + 1;
        },

        /**
         * Load transitions for a timeZone.
         * @param {string} timeZone The timeZone to load.
         */
        _loadTimeZone(timeZone) {
            if (timeZone in this._timeZones) {
                return;
            }

            const zoneIndex = this._zones[timeZone];
            const parts = this._values[zoneIndex].split('|');
            const zoneAbbrs = parts.shift().split(';')
                .map(a => this._abbrs[a]);
            const transitions = parts.shift().split(';')
                .map(t => {
                    const data = t.split(',');
                    data[0] = data[0] ?
                        parseInt(data[0], 36) :
                        Number.NEGATIVE_INFINITY;
                    return data;
                });

            this._timeZones[timeZone] = transitions.map((transition, i) => {
                const start = transition[0];
                const end = i == transitions.length - 1 ?
                    Number.POSITIVE_INFINITY :
                    transitions[i + 1][0] - 1;
                const abbr = transition[1] && zoneAbbrs[transition[1]];
                const dst = transition[2] && zoneAbbrs[transition[2]];

                return {
                    start,
                    end,
                    abbr,
                    dst
                };
            });
        },

        /**
         * Load offset for a timeZone abbreviation.
         * @param {string} abbr The timeZone abbreviation to load.
         */
        _loadTimeZoneAbbreviation(abbr) {
            if (abbr in this._abbreviations) {
                return;
            }

            const offset = parseInt(this._abbrOffsets[abbr], 36) / 60;
            this._abbreviations[abbr] = offset ?
                offset * -1 :
                0;
        },

        /**
         * Parse a number from a string using localized digits.
         * @param {string} value The formatted number string.
         * @returns {number} The parsed number.
         */
        _parseNumber(value) {
            if (this.lang.numbers) {
                value = value.replace(
                    /./g,
                    match => this.lang.numbers.findIndex(match)
                );
            }

            return parseInt(value);
        }

    });

    /**
     * DateTime (Static) Utility
     */

    Object.assign(DateTime, {

        /**
         * Get the day of the year for a year, month and date.
         * @param {number} year The year.
         * @param {number} month The month. (1, 12)
         * @param {number} date The date.
         * @returns {number} The day of the year. (1, 366)
         */
        dayOfYear(year, month, date) {
            return new Array(month - 1)
                .fill()
                .reduce(
                    (d, _, i) =>
                        d + this.daysInMonth(year, i + 1),
                    date
                );
        },

        /**
         * Get the number of days in a month, from a year and month.
         * @param {number} year The year.
         * @param {number} month The month. (1, 12)
         * @returns {number} The number of days in the month.
         */
        daysInMonth(year, month) {
            const date = new Date(Date.UTC(year, month - 1));
            month = date.getUTCMonth();

            return this._monthDays[month]
                + (
                    month == 1 && this.isLeapYear(
                        date.getUTCFullYear()
                    ) ?
                        1 :
                        0
                );
        },

        /**
         * Get the number of days in a year.
         * @param {number} year The year.
         * @returns {number} The number of days in the year.
         */
        daysInYear(year) {
            return !this.isLeapYear(year) ?
                365 :
                366;
        },

        /**
         * Return true if a year is a leap year.
         * @param {number} year The year.
         * @returns {Boolean} TRUE if the year is a leap year, otherwise FALSE.
         */
        isLeapYear(year) {
            return new Date(year, 1, 29)
                .getDate() === 29;
        },

        /**
         * Get the number of ISO weeks in a year.
         * @param {number} year  The year.
         * @returns {number} The number of ISO weeks in the year.
         */
        weeksInISOYear(year) {
            return new DateTime([year, 11, 28])
                .getISOWeek();
        }

    });

    DateTime._abbrs = ["-1130","-1120","-1040","-1030","-0930","-0830","-0530","-0430","-0345","-0330","-0230","-0130","-12","-11","-10","-09","-08","-07","-06","-05","-04","-03","-02","-01","+00","+01","+02","+03","+04","+05","+06","+07","+08","+09","+10","+11","+12","+13","+14","+0020","+0120","+0130","+0220","+0230","+0245","+0330","+0430","+0530","+0545","+0630","+0720","+0730","+0820","+0845","+0930","+0945","+1030","+1112","+1130","+1215","+1220","+1230","+1245","+1345","ACDT","ACST","ADDT","ADT","AEDT","AEST","AHDT","AHST","AKDT","AKST","AMT","APT","AST","AWDT","AWST","AWT","BDST","BDT","BMT","BST","CAST","CAT","CDDT","CDT","CEMT","CEST","CET","CMT","CPT","CST","CWT","ChST","DMT","EAT","EDDT","EDT","EEST","EET","EMT","EPT","EST","EWT","FFMT","FMT","GDT","GMT","GST","HDT","HKST","HKT","HKWT","HMT","HPT","HST","HWT","IDDT","IDT","IMT","IST","JDT","JMT","JST","KDT","KMT","KST","LMT","LST","MDDT","MDST","MDT","MMT","MPT","MSD","MSK","MST","MWT","NDDT","NDT","NPT","NST","NWT","NZDT","NZMT","NZST","PDDT","PDT","PKST","PKT","PLMT","PMMT","PMT","PPMT","PPT","PST","PWT","QMT","RMT","SAST","SDMT","SET","SJMT","SMT","SST","TBMT","TMT","UTC","WAST","WAT","WEMT","WEST","WET","WIB","WIT","WITA","WMT","YDDT","YDT","YPT","YST","YWT"];DateTime._zones = {"Africa/Abidjan":0,"Africa/Accra":1,"Africa/Addis_Ababa":2,"Africa/Algiers":3,"Africa/Asmara":2,"Africa/Bamako":0,"Africa/Bangui":4,"Africa/Banjul":0,"Africa/Bissau":5,"Africa/Blantyre":6,"Africa/Brazzaville":4,"Africa/Bujumbura":6,"Africa/Cairo":7,"Africa/Casablanca":8,"Africa/Ceuta":9,"Africa/Conakry":0,"Africa/Dakar":0,"Africa/Dar_es_Salaam":2,"Africa/Djibouti":2,"Africa/Douala":4,"Africa/El_Aaiun":10,"Africa/Freetown":0,"Africa/Gaborone":6,"Africa/Harare":6,"Africa/Johannesburg":11,"Africa/Juba":12,"Africa/Kampala":2,"Africa/Khartoum":13,"Africa/Kigali":6,"Africa/Kinshasa":4,"Africa/Lagos":4,"Africa/Libreville":4,"Africa/Lome":0,"Africa/Luanda":4,"Africa/Lubumbashi":6,"Africa/Lusaka":6,"Africa/Malabo":4,"Africa/Maputo":6,"Africa/Maseru":11,"Africa/Mbabane":11,"Africa/Mogadishu":2,"Africa/Monrovia":14,"Africa/Nairobi":2,"Africa/Ndjamena":15,"Africa/Niamey":4,"Africa/Nouakchott":0,"Africa/Ouagadougou":0,"Africa/Porto-Novo":4,"Africa/Sao_Tome":16,"Africa/Tripoli":17,"Africa/Tunis":18,"Africa/Windhoek":19,"America/Adak":20,"America/Anchorage":21,"America/Anguilla":22,"America/Antigua":22,"America/Araguaina":23,"America/Argentina/Buenos_Aires":24,"America/Argentina/Catamarca":25,"America/Argentina/Cordoba":26,"America/Argentina/Jujuy":27,"America/Argentina/La_Rioja":28,"America/Argentina/Mendoza":29,"America/Argentina/Rio_Gallegos":30,"America/Argentina/Salta":31,"America/Argentina/San_Juan":32,"America/Argentina/San_Luis":33,"America/Argentina/Tucuman":34,"America/Argentina/Ushuaia":35,"America/Aruba":36,"America/Asuncion":37,"America/Atikokan":38,"America/Bahia":39,"America/Bahia_Banderas":40,"America/Barbados":41,"America/Belem":42,"America/Belize":43,"America/Blanc-Sablon":44,"America/Boa_Vista":45,"America/Bogota":46,"America/Boise":47,"America/Cambridge_Bay":48,"America/Campo_Grande":49,"America/Cancun":50,"America/Caracas":51,"America/Cayenne":52,"America/Cayman":53,"America/Chicago":54,"America/Chihuahua":55,"America/Costa_Rica":56,"America/Creston":57,"America/Cuiaba":58,"America/Curacao":36,"America/Danmarkshavn":59,"America/Dawson":60,"America/Dawson_Creek":61,"America/Denver":62,"America/Detroit":63,"America/Dominica":22,"America/Edmonton":64,"America/Eirunepe":65,"America/El_Salvador":66,"America/Fort_Nelson":67,"America/Fortaleza":68,"America/Glace_Bay":69,"America/Goose_Bay":70,"America/Grand_Turk":71,"America/Grenada":22,"America/Guadeloupe":22,"America/Guatemala":72,"America/Guayaquil":73,"America/Guyana":74,"America/Halifax":75,"America/Havana":76,"America/Hermosillo":77,"America/Indiana/Indianapolis":78,"America/Indiana/Knox":79,"America/Indiana/Marengo":80,"America/Indiana/Petersburg":81,"America/Indiana/Tell_City":82,"America/Indiana/Vevay":83,"America/Indiana/Vincennes":84,"America/Indiana/Winamac":85,"America/Inuvik":86,"America/Iqaluit":87,"America/Jamaica":88,"America/Juneau":89,"America/Kentucky/Louisville":90,"America/Kentucky/Monticello":91,"America/Kralendijk":36,"America/La_Paz":92,"America/Lima":93,"America/Los_Angeles":94,"America/Lower_Princes":36,"America/Maceio":95,"America/Managua":96,"America/Manaus":97,"America/Marigot":22,"America/Martinique":98,"America/Matamoros":99,"America/Mazatlan":77,"America/Menominee":100,"America/Merida":101,"America/Metlakatla":102,"America/Mexico_City":103,"America/Miquelon":104,"America/Moncton":105,"America/Monterrey":99,"America/Montevideo":106,"America/Montserrat":22,"America/Nassau":107,"America/New_York":108,"America/Nipigon":109,"America/Nome":110,"America/Noronha":111,"America/North_Dakota/Beulah":112,"America/North_Dakota/Center":113,"America/North_Dakota/New_Salem":114,"America/Ojinaga":55,"America/Panama":53,"America/Pangnirtung":115,"America/Paramaribo":116,"America/Phoenix":117,"America/Port-au-Prince":118,"America/Port_of_Spain":22,"America/Porto_Velho":119,"America/Puerto_Rico":120,"America/Punta_Arenas":121,"America/Rainy_River":122,"America/Rankin_Inlet":123,"America/Recife":124,"America/Regina":125,"America/Resolute":126,"America/Rio_Branco":127,"America/Santarem":128,"America/Santiago":129,"America/Santo_Domingo":130,"America/Sao_Paulo":131,"America/Scoresbysund":132,"America/Sitka":133,"America/St_Barthelemy":22,"America/St_Johns":134,"America/St_Kitts":22,"America/St_Lucia":22,"America/St_Thomas":22,"America/St_Vincent":22,"America/Swift_Current":135,"America/Tegucigalpa":136,"America/Thule":137,"America/Thunder_Bay":138,"America/Tijuana":139,"America/Toronto":140,"America/Tortola":22,"America/Vancouver":141,"America/Whitehorse":142,"America/Winnipeg":143,"America/Yakutat":144,"America/Yellowknife":145,"Antarctica/Casey":146,"Antarctica/Davis":147,"Antarctica/DumontDUrville":148,"Antarctica/Macquarie":149,"Antarctica/Mawson":150,"Antarctica/Palmer":151,"Antarctica/Rothera":152,"Antarctica/Syowa":153,"Antarctica/Troll":154,"Antarctica/Vostok":155,"Arctic/Longyearbyen":156,"Asia/Aden":157,"Asia/Almaty":158,"Asia/Amman":159,"Asia/Anadyr":160,"Asia/Aqtau":161,"Asia/Aqtobe":162,"Asia/Ashgabat":163,"Asia/Atyrau":164,"Asia/Baghdad":165,"Asia/Bahrain":166,"Asia/Baku":167,"Asia/Bangkok":168,"Asia/Barnaul":169,"Asia/Beirut":170,"Asia/Bishkek":171,"Asia/Brunei":172,"Asia/Chita":173,"Asia/Choibalsan":174,"Asia/Colombo":175,"Asia/Damascus":176,"Asia/Dhaka":177,"Asia/Dili":178,"Asia/Dubai":179,"Asia/Dushanbe":180,"Asia/Famagusta":181,"Asia/Gaza":182,"Asia/Hebron":183,"Asia/Ho_Chi_Minh":184,"Asia/Hong_Kong":185,"Asia/Hovd":186,"Asia/Irkutsk":187,"Asia/Jakarta":188,"Asia/Jayapura":189,"Asia/Jerusalem":190,"Asia/Kabul":191,"Asia/Kamchatka":192,"Asia/Karachi":193,"Asia/Kathmandu":194,"Asia/Khandyga":195,"Asia/Kolkata":196,"Asia/Krasnoyarsk":197,"Asia/Kuala_Lumpur":198,"Asia/Kuching":199,"Asia/Kuwait":157,"Asia/Macau":200,"Asia/Magadan":201,"Asia/Makassar":202,"Asia/Manila":203,"Asia/Muscat":179,"Asia/Nicosia":204,"Asia/Novokuznetsk":205,"Asia/Novosibirsk":206,"Asia/Omsk":207,"Asia/Oral":208,"Asia/Phnom_Penh":168,"Asia/Pontianak":209,"Asia/Pyongyang":210,"Asia/Qatar":166,"Asia/Qostanay":211,"Asia/Qyzylorda":212,"Asia/Riyadh":157,"Asia/Sakhalin":213,"Asia/Samarkand":214,"Asia/Seoul":215,"Asia/Shanghai":216,"Asia/Singapore":217,"Asia/Srednekolymsk":218,"Asia/Taipei":219,"Asia/Tashkent":220,"Asia/Tbilisi":221,"Asia/Tehran":222,"Asia/Thimphu":223,"Asia/Tokyo":224,"Asia/Tomsk":225,"Asia/Ulaanbaatar":226,"Asia/Urumqi":227,"Asia/Ust-Nera":228,"Asia/Vientiane":168,"Asia/Vladivostok":229,"Asia/Yakutsk":230,"Asia/Yangon":231,"Asia/Yekaterinburg":232,"Asia/Yerevan":233,"Atlantic/Azores":234,"Atlantic/Bermuda":235,"Atlantic/Canary":236,"Atlantic/Cape_Verde":237,"Atlantic/Faroe":238,"Atlantic/Madeira":239,"Atlantic/Reykjavik":240,"Atlantic/South_Georgia":241,"Atlantic/St_Helena":0,"Atlantic/Stanley":242,"Australia/Adelaide":243,"Australia/Brisbane":244,"Australia/Broken_Hill":245,"Australia/Currie":246,"Australia/Darwin":247,"Australia/Eucla":248,"Australia/Hobart":249,"Australia/Lindeman":250,"Australia/Lord_Howe":251,"Australia/Melbourne":252,"Australia/Perth":253,"Australia/Sydney":254,"Europe/Amsterdam":255,"Europe/Andorra":256,"Europe/Astrakhan":257,"Europe/Athens":258,"Europe/Belgrade":259,"Europe/Berlin":260,"Europe/Bratislava":261,"Europe/Brussels":262,"Europe/Bucharest":263,"Europe/Budapest":264,"Europe/Busingen":265,"Europe/Chisinau":266,"Europe/Copenhagen":267,"Europe/Dublin":268,"Europe/Gibraltar":269,"Europe/Guernsey":270,"Europe/Helsinki":271,"Europe/Isle_of_Man":270,"Europe/Istanbul":272,"Europe/Jersey":270,"Europe/Kaliningrad":273,"Europe/Kiev":274,"Europe/Kirov":275,"Europe/Lisbon":276,"Europe/Ljubljana":259,"Europe/London":270,"Europe/Luxembourg":277,"Europe/Madrid":278,"Europe/Malta":279,"Europe/Mariehamn":271,"Europe/Minsk":280,"Europe/Monaco":281,"Europe/Moscow":282,"Europe/Oslo":156,"Europe/Paris":283,"Europe/Podgorica":259,"Europe/Prague":261,"Europe/Riga":284,"Europe/Rome":285,"Europe/Samara":286,"Europe/San_Marino":285,"Europe/Sarajevo":259,"Europe/Saratov":287,"Europe/Simferopol":288,"Europe/Skopje":259,"Europe/Sofia":289,"Europe/Stockholm":290,"Europe/Tallinn":291,"Europe/Tirane":292,"Europe/Ulyanovsk":293,"Europe/Uzhgorod":294,"Europe/Vaduz":265,"Europe/Vatican":285,"Europe/Vienna":295,"Europe/Vilnius":296,"Europe/Volgograd":297,"Europe/Warsaw":298,"Europe/Zagreb":259,"Europe/Zaporozhye":299,"Europe/Zurich":265,"Indian/Antananarivo":2,"Indian/Chagos":300,"Indian/Christmas":301,"Indian/Cocos":302,"Indian/Comoro":2,"Indian/Kerguelen":303,"Indian/Mahe":304,"Indian/Maldives":305,"Indian/Mauritius":306,"Indian/Mayotte":2,"Indian/Reunion":307,"Pacific/Apia":308,"Pacific/Auckland":309,"Pacific/Bougainville":310,"Pacific/Chatham":311,"Pacific/Chuuk":312,"Pacific/Easter":313,"Pacific/Efate":314,"Pacific/Enderbury":315,"Pacific/Fakaofo":316,"Pacific/Fiji":317,"Pacific/Funafuti":318,"Pacific/Galapagos":319,"Pacific/Gambier":320,"Pacific/Guadalcanal":321,"Pacific/Guam":322,"Pacific/Honolulu":323,"Pacific/Kiritimati":324,"Pacific/Kosrae":325,"Pacific/Kwajalein":326,"Pacific/Majuro":327,"Pacific/Marquesas":328,"Pacific/Midway":329,"Pacific/Nauru":330,"Pacific/Niue":331,"Pacific/Norfolk":332,"Pacific/Noumea":333,"Pacific/Pago_Pago":329,"Pacific/Palau":334,"Pacific/Pitcairn":335,"Pacific/Pohnpei":336,"Pacific/Port_Moresby":337,"Pacific/Rarotonga":338,"Pacific/Saipan":322,"Pacific/Tahiti":339,"Pacific/Tarawa":340,"Pacific/Tongatapu":341,"Pacific/Wake":342,"Pacific/Wallis":343,"UTC":344};DateTime._values = ["129;109|,0;-u9rgl4,1","129;109;39|,0;-r507yk,1,2","129;97;43;44|,0;-lnsetg,1;-kvjsc0,2;-fnosa0,3;-57x0z0,1","129;154;174;173;90;89|,0;-154i5uo,1;-uozn3l,2,3;-fkul40,4,5;-c4kqs0,2;-79mio0,4;-3i8is0,2,3;42lp80,4,5;54et80,2,3;5wuyo0,4","129;171|,0;-q9qbao,1","129;23;109|,0;-u9rek0,1;2lxk40,2","129;85|,0;-yvtfd8,1","129;101;100|,0;-1054wgl,1,2","129;24;25|,0;-tblt9g,1,2;7eveo0,2;8cm580,1,2;phadk0,2,1","129;174;173;90;89|,0;-100edc0,1,2;7eveo0,3,4","129;23;24;25|,0;-isdxk0,1;3a22s0,2,3;phadk0,3,2","129;161|,0;-14nj6io,1;-yvtdi0,1,1","129;85;84;97|,0;-kcrsis,1,2;fodfs0,3","129;85;84;97|,0;-kcrsow,1,2;fodfs0,3;oyph00,1","129;134;109|,0;-19xcbc4,1;11v0q6,2","129;171;170|,0;-u9rk4c,1,2","129;109;171|,0;-u9rhc0,1;p1uqs0,2;pkmo40,1","129;90;89;101|,0;-q3gfrw,1,2;-5qotg0,3;69gig0,1,2;am3h80,3;dyil40,1,2;ehhx40,3;md8w00,1,2;mv76o0,3","129;154;90;89|,0;-1a9dr7w,1;-uozn3l,2,3","129;41;161;85;171|,0;-14nj4i0,1;-yvtdi0,2,2;ajtx40,3,4","129;143;144;142;83;81;71;117;111|,0;-1078oma,1,2;-cq2tg0,1,3;-1fq440,4,5;77ss00,6;79e140,7,8","129;76;79;75;71;70;182;73;72|,0;-1078tko,1,2;-cq2tg0,1,3;-1fq6w0,4,5;77sp80,6;79dyc0,7,8","129;76|,0;-u6m79w,1","129;21;22|,0;-t85j2o,1,2","129;91;20;21;22|,0;-138aaic,1;-px7ys0,2,3;-4ink0,3,4;c3hxk0,3,3;fqtsc0,3,4","129;91;20;21;22|,0;-138a95g,1;-px7ys0,2,3;-4ink0,3,4;b1otk0,2,4;bkew80,3,4;c3hxk0,3,3;hym0c0,2;hzl9s0,3,4","129;91;20;21;22|,0;-138a9g0,1;-px7ys0,2,3;-4ink0,3,4;b1otk0,2,4;bkew80,3,4;c3hxk0,3,3;fqtsc0,3,4","129;91;20;21;22|,0;-138a98o,1;-px7ys0,2,3;-4ink0,3,4;aiyqw0,2,3;b2eto0,2,4;bkew80,3,4;c3hxk0,3,3;fqtsc0,3,4","129;91;20;21;22|,0;-138a8yc,1;-px7ys0,2,3;-4ink0,3,4;b1l480,2;b51cg0,3,4;c3hxk0,3,3;hym0c0,2;hzl9s0,3,4","129;91;20;21;22|,0;-138a8l8,1;-px7ys0,2,3;-4ink0,3,4;aiyqw0,2,3;bkez00,2,4;c3hxk0,3,3;hy5cc0,2;i4mr40,3,4","129;91;20;21;22|,0;-138a8ik,1;-px7ys0,2,3;-4ink0,3,4;c3hxk0,3,3;hym0c0,2;hzl9s0,3,4","129;91;20;21;22|,0;-138a97w,1;-px7ys0,2,3;-4ink0,3,4;b1otk0,2,4;bkew80,3,4;c3hxk0,3,3;fqtsc0,3,4","129;91;20;21;22|,0;-138a8n8,1;-px7ys0,2,3;-4ink0,3,4;b1l480,2;b51cg0,3,4;c3hxk0,3,3;hyk5o0,2;i1e340,3,4","129;91;20;21;22|,0;-138a91o,1;-px7ys0,2,3;-4ink0,3,4;ajh9k0,2,3;b6bn40,3,3;hyk5o0,2;i1e340,3,4;juz1k0,2,3;krc0g0,3","129;91;20;21;22|,0;-138a998,1;-px7ys0,2,3;-4ink0,3,4;b1otk0,2,4;bkew80,3,4;c3hxk0,3,3;hym0c0,2;hz8b40,3,4","129;91;20;21;22|,0;-138a8oo,1;-px7ys0,2,3;-4ink0,3,4;c3hxk0,3,3;hyib00,2;hzl9s0,3,4","129;7;76|,0;-u7lckd,1;-2lx4u0,2","129;74;20;21|,0;-15r0ynk,1;-jy93zk,2;1fnkg0,3;27sgc0,2,3","129;93;87;94;92;104|,0;-1353b18,1,2;-ek21s0,1,3;-cq2tg0,5,4","129;21;22|,0;-t85kv8,1,2","129;138;93;157;133;87|,0;-p1u4k0,1;-m7mko0,2;-kf67c0,1;-k6j3c0,2;-jypm00,1;-jpan80,2;-eg9600,1;-axv380,3;m80,1,4;ks28w0,1,5;lb57g0,2,5","129;82;76;67|,0;-o0aiaj,1;-jtzeaj,2,3","129;21;22|,0;-t85j0s,1,2","129;93;6;87|,0;-u52ic0,1,2;-e11220,1,3","129;76;67;79;75|,0;-18vs838,1,2;-qpm4s0,1,3;-cq2tg0,1,4","129;20;21|,0;-t85grk,1,2","129;82;19;20|,0;-18s2sy8,1;-srdoy8,2,3","129;157;149;138;139;135;133|,0;-18y0gg0,1,2;-oc9iw0,3,4;-cq2tg0,3,5;-1e8kc0,3,6","24;138;139;135;131;133;93;87;104|,0;-q3gdc0,1,2;-cq2tg0,1,3;-2g1tw0,1,4;5dwbo0,1,5;f9nqc0,6,5;fsdq80,8,7;g3jck0,6,5;glwow0,1,5","129;20;21|,0;-t85hvw,1,2","129;93;104;99;87|,0;-p1u7c0,1;690go0,2,3;ex1so0,1,4;nj3280,2","129;91;7;20|,0;-15r0wxs,1;-u7lcxw,2;-2lx4u0,3;jsrss0,2;o6hks0,3","129;20;21|,0;-uj7yb4,1;-16brk0,2","129;91;104|,0;-15r0uls,1;-w757vc,2","129;93;87;104;94;92|,0;-18y0m00,1,2;-hnqf40,3;-haev80,1,2;-eqy9w0,1,4;-cq2tg0,1,5;-ccw1s0,1,2","129;138;93;87;133|,0;-p1u4k0,1;-m7mko0,2;-kf67c0,1;-k6j3c0,2;-jypm00,1;-jpan80,2,3;eincs0,2,4;f1di80,1,4","129;164;93;87|,0;-15r0trn,1;-pjw8fn,2,3","129;138;157|,0;-18vrx38,1;-rshz80,2;-qx64g0,1","129;20;21|,0;-t85hm4,1,2","129;21;22;109|,0;-rvusjk,1,2;dkhf00,3","129;182;180;183;181;179;157;149;138|,0;-1079suk,1,2;-q6kps0,1,3;-cq2tg0,1,4;-2g1oc0,1,5;1ztvo0,6,7;q6vd40,8","129;157;149;158;156;138|,0;-18vrweg,1,2;-qplto0,1,3;-cq2tg0,1,4;-bu5tk0,1,2;17qug0,5,2","129;138;133;139;135|,0;-18y0j80,1,2;-pdcv40,1,3;-cq2tg0,1,4;-2g1oc0,1,2","129;93;104;105;103;99|,0;-xx8dyd,1;-sih340,2,3;-cq2tg0,2,4;-bbfz80,2,5","129;138;133;139;135|,0;-x1yazk,1,2;-o52f40,1,3;-cq2tg0,1,4;-bu5wc0,1,2","129;19;20|,0;-t85f28,1,2;k2yb80,2;mw14g0,1","129;93;87|,0;-pkm4tc,1,2","129;157;149;158;156;138|,0;-18vrvy1,1,2;-qplto0,1,3;-cq2tg0,1,4;-bu5tk0,1,2;nkw140,5","129;21;22|,0;-t85kvc,1,2","129;76;67;79;75|,0;-z94kwc,1,2;-qpm4s0,1,3;-cq2tg0,1,4;-8pgq00,1,2","129;143;141;144;142;76;67;66|,0;-18vs7h8,1,2;-eqjt20,1,3;-cq2tg0,1,4;-cc6be0,1,2;-1zdy20,5,6;9aodpo,5,7;9trc9o,5,6","129;127;104;99;76|,0;-15r0w5s,1;-u85og2,2,3;nx4go0,4,3;phnnc0,2,3","129;93;87|,0;-qqqskk,1,2","129;159;19;20|,0;-15r0ujs,1;-kcr84o,2,3","129;8;21;20|,0;-smcak8,1;2wsif0,2;ayjxo0,3","129;76;67;79;75|,0;-z94k80,1,2;-eqwqc0,1,3;-cq2tg0,1,4;-ccw7c0,1,2","129;115;93;87|,0;-15r0u2w,1;-n7762o,2,3","129;138;93;157;133|,0;-p1u4k0,1;-m7mko0,2;-kf67c0,1;-k6j3c0,2;-jypm00,1;-jpan80,2;-eg9600,1;-axv380,3;m80,1,4","129;93;87;94;92;104;99|,0;-18y0m00,1,2;-eqy9w0,1,3;-cq2tg0,1,4;-ccw1s0,1,2;-7o0f40,5;-6ea780,1;-63h8g0,5,6","129;93;87;94;92;104|,0;-18y0m00,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-bu5z40,1,2;-407z40,5;-384xw0,1,2;bdxy40,5,2;j7vy40,1,2","129;93;87;94;92;104;99|,0;-18y0m00,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-9qwps0,1,2;-4iy1s0,5,6;1ztnc0,5,2;2ijss0,5,6","129;93;87;94;92;104;99|,0;-18y0m00,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-7nnm00,1,2;-2g1r40,5;-1nlr80,1,2;432zg0,5,2;j7vy40,1,2;jqyzg0,5,6","129;93;87;94;92;104;99|,0;-18y0m00,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-7nnm00,1,2;-2yrts0,5;-14vok0,1,2;-m5lw0,1,6;-3fm00,5,6;fago0,5,2;j7vy40,1,2","129;93;87;94;92;104;99|,0;-18y0m00,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-86qhs0,5,6","129;93;87;94;92;104;99|,0;-18y0m00,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-ccw1s0,1,2;-2yrts0,5,6;fago0,5,2;j7vy40,1,2;jqyzg0,5,6","129;93;87;94;92;104;99|,0;-18y0m00,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-ccw1s0,1,2;-4iy1s0,5,6;fago0,5,2;j7vy40,1,6;jqywo0,5,6","24;157;148;138;133|,0;-8ve5c0,1,2;4v6bs0,3,4","24;105;103;104;98;99;93;87|,0;-4do2a5oxwe0w,0,1;-cq2tg0,3,2;-2g1zg0,3,4;5dw640,3,5;f9nks0,6,5;fsdq80,3,7;gb3q40,3,5","129;127;104;99|,0;-15r0v42,1;-u85og2,2,3","129;157;158;156;149;180;182;73;72|,0;-1078wfv,1,2;-cq2tg0,1,3;-csc80,1,4;5dweg0,1,5;5wmh40,1,4;6y2mg0,6,4;79dyc0,7,8","129;93;87;94;92;104;99|,0;-18y0m00,1,2;-eqy9w0,1,3;-cq2tg0,1,4;-ccw7ac,1,2;-4iy1s0,5,2;-vin80,5,6;23fcs0,5,2;2oo640,5,6","129;93;87;94;92;104;99|,0;-18y0m00,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-vikg0,1,2;fsdq80,5,2;gb3q40,5,6","129;91;83;20|,0;-15r0wpo,1,2;-jpva5o,3","129;19;20|,0;-w25lpo,1,2","129;157;149;158;156|,0;-18y0gg0,1,2;-q6vr00,1,3;-cq2tg0,1,4;-bdliuc,1,2","129;21;22|,0;-t85ldw,1,2","129;134;93;104;87|,0;-15r0tcs,1;-ijh6oo,2;1qkbc0,3;2ob1w0,2,4;bhceg0,3;bv2gk0,2;c05vc0,3;e3bck0,2,4","129;20;21|,0;-t85gvw,1,2","129;106;76;67|,0;-15r0y0s,1;-umcvcs,2,3","129;93;87|,0;-p1u7c0,1,2","129;93;87;94;92;104|,0;-17zjvrx,1,2;-q6vwk0,1,3;-cq2tg0,1,4;-ccw1s0,1,2;-cshs0,5,2;1ztq40,1,2","129;93;104;87|,0;-p1u7c0,1;690go0,2;6qpf80,1,3","129;157;158;156;149;73;72|,0;-1078wyu,1,2;-cq2tg0,1,3;-csc80,1,4;nx4rs0,5,6;phnyg0,1;plmjs0,5,6","129;138;93;87;94|,0;-p1u4k0,1;-m7mko0,2;-kf67c0,1;-k6j3c0,2;-jypm00,1;-jpan80,2,3;-f07rg0,2,4;-deaks0,2,3","129;76;21;22|,0;-ulmyxk,1;5e3cg0,2,3","129;104;76;67;79;75|,0;-18wys04,1;-z94i40,2,3;-er0cw0,2,4;-cq2tg0,2,5;-ccw7c0,2,3","129;134;20;21;9;10;22;11|,0;-w4mll9,1;-px8099,2,3;-nvm2c0,4,3;-e482c0,3,5;-572yc0,3,6;-u1900,3,5;5vcc0,3,6;23s0c0,3,7;26nli0,3,5;2lf700,3,6","129;104;99|,0;-u6m4c6,1,2","129;104;99;105;103|,0;-18y0os0,1,2;-eqyco0,1,3;-cq2tg0,1,4;-ccw4k0,1,2","129;104;99;105;103|,0;-1353bnk,1,2;-ek24k0,1,3;-cq2tg0,1,4;296rg0,1,2","129;143;144;142;83;81;182;73;72|,0;-1078qpa,1,2;-cq2tg0,1,3;-1fq440,4,5;77ss00,6;79dyc0,7,8","129;22;23|,0;-t85lzw,1,2","129;138;133;139;135;93;87|,0;-18y0j80,1,2;-q6vts0,1,3;-cq2tg0,1,4;-1e8kc0,1,2;kz9l00,5,2;lhzkw0,5,6","129;138;133;139;135;93;87|,0;-18y0j80,1,2;-q6vts0,1,3;-cq2tg0,1,4;-1e8kc0,1,2;bm8900,5,2;c4y8w0,5,6","129;138;133;139;135;93;87|,0;-18y0j80,1,2;-q6vts0,1,3;-cq2tg0,1,4;-1e8kc0,1,2;hcwzo0,5,2;hvmzk0,5,6","24;76;79;75;66;67;99;104;93;87|,0;-pkmlc0,1,2;-cq2tg0,1,3;-2g2280,1,4;5dw3c0,1,5;d6e8o0,7,6;f9nks0,8,6;fsdq80,7,9;gb3q40,7,6","129;154;9;21|,0;-usj4g8,1;-cnnf4c,2;7p4720,3","129;138;133;139|,0;-18y0j80,1,2;-q6vts0,1,3;-d6f5yc,1,2","129;155;104;99|,0;-15r0vxs,1;-rmk9ac,2,3","129;20;21|,0;-t85g60,1,2","129;76;79;75|,0;-10xhp3b,1,2;-cq2tg0,1,3","129;165;19;20;21|,0;-15r0w78,1;-vauawq,2;-rx8i40,1;-qs16wq,3;-qcwsw0,1,3;-lsgfk0,2,3;-jhfgs0,3;-eeay80,2;-eb5ws0,3;-bvifk0,2;-bsvzk0,3,4;ohn4c0,4","129;93;87;94;92|,0;-1353ahk,1,2;-ek21s0,1,3;-cq2tg0,1,4;296u80,1,2","24;93;86;87;104|,0;-6s8lc0,1,2;-26bwo0,1,3;g36jg0,4,3;glwm40,1,3","129;21;22|,0;-t85ljc,1,2","129;138;133;139;135;93|,0;-xkq9yc,1,2;-eq8fc0,1,3;-cq2tg0,1,4;-cdlwc0,1,2;-5210c0,5","24;93;86;87;104|,0;-bnp9c0,1,2;-26bwo0,1,3;g36jg0,4,3;glwm40,1,3;j7vy40,4,3;jqyzg0,1,3","129;19;20|,0;-t85fg0,1,2;k2yb80,2;mw14g0,1","129;20;21|,0;-t85hvc,1,2;k2y8g0,2","129;165;19;20;21|,0;-15r0w8q,1;-vauawq,2;-rx8i40,1;-qs16wq,3;-qcwsw0,1,3;-lsgfk0,2,3;-jhfgs0,3;-eeay80,2;-eb5ws0,3,4;-bvifk0,2;-bsvzk0,3,4","129;162;104;99;7;76|,0;-15r0we0,1;-j6hz1c,2,3;-1hdww0,2,4;2ijn80,5;g36go0,2;g4za00,5","129;21;22|,0;-t85jd8,1,2","129;22;23;24|,0;-rvurxk,1,2;5lt4g0,1,3;64iys0,2,3","129;157;158;156;149;182;73;72|,0;-1078w9z,1,2;-cq2tg0,1,3;-csc80,1,4;6y2mg0,5,4;79dyc0,6,7","129;143;141;144;142;140|,0;-18vs8wk,1,2;-eqjt20,1,3;-cq2tg0,1,4;-cc6be0,1,2;9iykfo,1,5;a1on3o,1,2","129;138;133;139;135;93|,0;-xkq9d4,1,2;-qplwg0,1,3;-cq2tg0,1,4;-ccvz00,1,2;17qro0,5","129;93;87|,0;-pfzh6k,1,2","129;76;67|,0;-rvuj9g,1,2","129;93;104;105;103;99|,0;-1353bh0,1;-vbavc0,2,3;-cq2tg0,2,4;5xi40,2,5","129;138;157;149;158;156|,0;-p1u1s0,1;-o0a9w0,2;-m7mhw0,1;-kf64k0,2,3;-jyrdw0,2,4;-cq2tg0,2,5;-bcgxs0,2,3","129;104;99;105;103|,0;-1353das,1,2;-ek24k0,1,3;-cq2tg0,1,4;-ccw4k0,1,2","129;157;149;158;156|,0;-18vrvv8,1,2;-qplto0,1,3;-cq2tg0,1,4;-ccvw80,1,2","129;182;180;183;181;179;157;149;138|,0;-1079tno,1,2;-q6kps0,1,3;-cq2tg0,1,4;-2g1oc0,1,5;-1cspo0,6,7;q6vd40,8","129;93;87;94;92|,0;-171bfcc,1,2;-gu7j80,1,3;-cq2tg0,1,4;-cc64g0,1,2","129;182;183;181;180;73;72|,0;-1078vgh,1,2;-cq2tg0,1,3;-cs9g0,1,4;79dyc0,5,6","24;138;139;135;131;133|,0;-i9m2o0,1,2;-cq2tg0,1,3;-2g1tw0,1,4;5dwbo0,1,5","24;32;35|,0;-irxc0,1;kro7c0,2;kyrj00,1;ltqko0,2;lzr5w0,1;ofen40,2;p5dwk0,1","24;31;29|,0;-6rmdc0,1;-2p2zg0,0;-h6io0,1;kroa40,2;kz30w0,1;ltqng0,2;lzre80,1","24;34|,0;-c05eo0,1;-9dkmg0,0;-6vdk00,1","24;69;68;35|,0;-10mb9c0,1,2;-qhmeg0,0;-bd1xc0,1,2;l0b5s0,3","24;30;29|,0;-8aelc0,1;krocw0,2","24;21;20;22|,0;-4do2a5oxwe0w,0,1;-2ivzo0,2,1;-4ink0,1,3;6fn4c0,2,1;ohn4c0,1","24;21|,0;3lxs00,1","24;27|,0;-6qsqo0,1","24;26|,0;ibruo0,0,1","24;30|,0;-6aaao0,1","129;90;89|,0;-1353tzo,1,2","129;27|,0;-bwgbbg,1","129;29;30;31|,0;-nu1a90,1;-kmr9w0,2,3;atr680,2,2;bchbo0,1;bi8qc0,2,3","129;101;100|,0;-kcrtbk,1,2","129;36;37;38;35|,0;-nu1sv8,1;-kmrtc0,2,3;64p7s0,2,2;6nh7w0,1,2;atqpk0,1,1;bcgv00,4;bi89o0,1,2;ks0uw0,1,1;lb3z00,4;lio700,1","129;28;29;30|,0;-nu15b4,1;-kmr740,2;64pws0,3,3;6nhrc0,2,3;atr900,2,2;bcheg0,1;bi8t40,2,3;cwnjo0,1,2;i6f3s0,2","129;28;29;30|,0;-nu16l4,1;-kmr740,2,3;64pu00,3,3;6nhrc0,2,3;atr900,2,2;bcheg0,1;bi8t40,2,3","129;28;29;30|,0;-nu16t8,1;-kmr740,2,3;atr900,2,2;bcheg0,1;bi8t40,2","129;27;29;30;28|,0;-nu15m8,1;-kmr4c0,2;64pws0,3,3;6nhrc0,2,3;atr900,2,2;bcheg0,4;bi8t40,2,3;f1cno0,2,2;fkfrs0,4,2;i6f3s0,2","129;82;27;28|,0;-15r1hk4,1;-r50g80,2,3","129;28;27|,0;-q3gmvk,1;19d0w0,2","129;27;28;29|,0;-nu158c,1;-6p7kc0,2,3;atrbs0,2,2;bchh80,1,2;bv7jw0,2;dkgvk0,2,3","129;82;31|,0;-1ayyla4,1;-pysda4,2","129;30;31;32|,0;-q4ljic,1;-kmrco0,2,3;atr3g0,2,2;bch8w0,1;bi8nk0,2,3;d98v40,1,2;liokw0,2;ne0ks0,1;o4nww0,2","129;101;100|,0;-1ayy98o,1,2","129;29;30;31|,0;-nu19tc,1;-kmr9w0,2,3;atr680,2,2;bazjk0,1,2;il2ko0,2","129;51;32|,0;-mvofy4,1;-jb6i60,2","129;32;33;34|,0;-q4cfog,1;-kmri80,2,3;atqxw0,2,2;bch3c0,1;bi8i00,2,3;liock0,3;ne0cg0,1;o4nrc0,2","129;31;32;34;33|,0;-xmct7c,1;46akk0,2,3;769dk0,4,3;jyjto0,2,4","129;134;47;30;49|,0;-1ayyhgc,1;-xehask,2,3;-e9lco0,2,4;drxa20,4;dzufc0,3;ixq620,2","129;101;100|,0;-q3gk20,1,2","129;115;49;47;30;31|,0;-15r1q2s,1;-eqtpow,2;-ef78q0,3;-e9lba0,2;-9j0ne0,4,5","129;32;33|,0;-u9s4l8,1;-ejfac0,2;3b0ho0,1;g0zls0,2","129;28|,0;-q3gnko,1","129;29;30;31|,0;-nu18qo,1;-kmr9w0,2,3;atr680,2,2;bbgac0,1","129;101;100;27|,0;-p4bqac,1,2;od5jo0,3;oyk840,1,2","129;101;100;122;120|,0;-1054x1s,1,2;-1ceto0,3,4;dkh140,1,2","129;101;100;122;120|,0;-1054x5z,1,2;-1ceto0,3,4;dkh140,1,2","129;152;31;32;33|,0;-x56934,1;-umdqeu,2;-e3bkw0,3;-cxyro0,4;-cp63o0,2;-bvja40,3;-7kjq80,2;-57xfk0,3;2uaps0,2","129;113;112;114;125|,0;-y0i0s0,1,2;-eqtn80,4,3;-cl7cs0,1,2","129;30;31;32|,0;-xmcoz0,1;46anc0,2,3","129;121;31;32;33|,0;-1ayylz5,1;-q28gn5,2;-kmrfg0,3,4;atr0o0,3,3;bch640,2;bi8ks0,3,4;liofc0,4;ne0f80,3","129;82;50;51;33;32;175|,0;-1hftyg0,1;-o0bdpc,2;-jebgdc,3;-ehxgu0,4;-co37o0,3;-bb5zi0,5;-a9m680,3;-34ru60,6","129;33;54;176|,0;-jebm20,1;-d7zvo0,2;-34rzq0,3","129;124;122;120;119|,0;-1ayy96u,1;-r50eig,2,3;-c3alo0,2,4;-b4txs0,2,3","129;28;46|,0;-15r1m5c,1;-d1pkg0,2","129;35;36;37|,0;-olrupo,1;-kmrqk0,2,3;atqpk0,2,2;bcgv00,1;bi89o0,2,3;ks0uw0,2,2;lb3z00,1;lio700,2","129;47;49;29;151;150|,0;-wvpb30,1,2;-9j0km0,3;n33g0,4,5","129;47;48|,0;-q3gt4s,1;8clsq0,2","129;32;33;34;35|,0;-q4cjrp,1;-kmri80,2,3;atqxw0,2,2;bch3c0,1;bi8i00,2,3;hqrlo0,3,4;lio9s0,4;lreus0,3;ne0cg0,2","129;115;134;122;49|,0;-1oaa314,1;-1g6thow,2;-xehava,3,4","129;30;31;32|,0;-q37l72,1;-kmrco0,2,3;atr3g0,2,2;bch8w0,1;bi8nk0,2,3;lioi40,3;ne0i00,2","129;165;31;50;51;33;32|,0;-100ew5y,1;-xphpwd,2,3;-hquppc,3;-esddpc,4;-ejqa60,5;-conl00,4;69g360,6","129;51;32;52;33|,0;-mvof3k,1;-jb6i60,2,3;-ejqbk0,4;-conl00,2","129;93;33;34;87|,0;-y0i2cy,1;-emm3o0,2,3;-cnoec0,1,4","129;34;35;36|,0;-nu1nxc,1;-kmrns0,2,3;atqsc0,2,2;bcgxs0,1;bi8cg0,2,3;lio700,3;ne06w0,1;o63gg0,2","129;134;32;33;177|,0;-q3gzg0,1;-jebi40,2;-ek3a80,3;-co37o0,4","129;157;149;125|,0;-10va3qo,1,2;-efxa80,3;-d4ux00,1,2","129;101;100|,0;-p4bq6g,1,2","129;30;31;32|,0;-nu36tc,1;-kmrco0,2,3;atr3g0,2,2;bch8w0,1;bi8nk0,2,3;ks18s0,2,2;lb4cw0,1;liokw0,2","129;30;31;32|,0;-q4do0s,1;-kmrco0,2,3;atr3g0,2,2;bch8w0,1;bi8nk0,2,3;c7fr40,1,2;liokw0,2;ne0ks0,1;oasa80,2","129;29;30;31|,0;-q5xmx6,1;-kmr9w0,2,3;atr680,2,2;bchbo0,1;bi8qc0,2,3;liokw0,3;ne0ks0,2","129;27;29;30;28|,0;-nu15ic,1;-kmr4c0,2,3;64pu00,3,3;6nhrc0,2,3;9ry500,2,2;aaoag0,4,2;bi8t40,2,2;bv7h40,4,2;i6f3s0,2","129;154;51;33;32;177;175|,0;-w6piww,1;-jebg8w,2;-eknm60,3;-co37o0,2;-bb5zi0,4;-a9m680,2;-34ru60,5;9e5gg0,6","129;128;125|,0;-w895yc,1;-u9s4y0,2;-cpmro0,1","129;28;29;30|,0;-nu17s4,1;-kmr740,2,3;64pu00,3,3;6nhrc0,2,3;atr900,2,2;bcheg0,1;bi8t40,2,3;i6f100,3","129;28;29;30|,0;-nu184g,1;-kmr740,2,3;64pu00,3,3;6nhrc0,2,3;atr900,2,2;bi8qc0,3,3;bv7ec0,2,3;i6f100,3;pk1rc0,2","129;33;35;36;34|,0;-xl87rc,1;-cpkx00,2,3;atqsc0,2,2;bcgxs0,4;bi8cg0,2,3;dzw1o0,2,2;eim740,4,2;lio9s0,2;ne09o0,4;o4nls0,2","129;28;29;30|,0;-nu18eh,1;-kmr740,2,3;64pu00,3,3;6nhrc0,2,3","129;128;125;126|,0;-w8966g,1;-u9s4y0,2;-couzo0,1,3","129;93;87|,0;-100eztj,1,2","129;165;31;50;51;33;32|,0;-100ewkd,1;-xphpwd,2,3;-hquppc,3;-esddpc,4;-ejqa60,5;-conl00,4;69g360,6","129;34;35;36|,0;-nu1ogs,1;-kmrns0,2,3;atqsc0,2,2;bcgxs0,1;bi8cg0,2,3;lio700,3;ne06w0,2","129;93;125;87|,0;-12mch60,1;-gtzfk0,2;-co6u80,1,3","129;29;30;31|,0;-nu18tz,1;-kmr9w0,2,3;atr680,2,2;bchbo0,1","129;167;27;28;29|,0;-1ayyayn,1;-nu14an,2;-6p7kc0,3,4;atrbs0,3,3;bchh80,2;bhbec0,2,3;cwngw0,3,4;hzxjg0,2,3;idzek0,3","129;168;45;28;29;46|,0;-s6m6uw,1;-cixliw,2;435vm0,3,4;4p2q80,2,5","129;47;30|,0;-bojclo,1;99fa20,2","129;125;123|,0;-16snno0,1,2","129;30;31;32|,0;-q3zbqf,1;-kmrco0,2,3;atr3g0,2,2;bch8w0,1;bi8nk0,2,3;gvea40,1,2;liokw0,2;ne0ks0,1;o7wkw0,2","129;31;32;33|,0;-xmcrsk,1;46akk0,2,3","129;30|,0;-lx5pjw,1","129;32;33;36;35;34|,0;-q4cl6u,1;-kmri80,2,3;64pdc0,4,3;atqsc0,4,4;bcgxs0,5;bi8cg0,4,3;lio700,3;lres00,4;ne09o0,5","129;33;34;35|,0;-oligf7,1;-kmrl00,2,3;atqv40,2,2;bch0k0,1;bi8f80,2,3;lio9s0,3;ne09o0,2","129;32;33;34|,0;-q4cioy,1;-kmri80,2,3;atqxw0,2,2;bch3c0,1;bi8i00,2,3;liock0,3;ne0cg0,2","129;160;49;33|,0;-1ayykhb,1;-q3gv5b,2;-efx620,3;-cvg100,2","129;154;28;29;30|,0;-rx5hw9,1;-qc75z5,2;-kmr740,3,4;atr900,3,3;bcheg0,2;bi8t40,3,4;liono0,4;ne0nk0,3","129;27;28;29|,0;-nu148o,1;-6p7kc0,2,3;atrbs0,2,2;bchh80,1,2;dfdrw0,2;e3ank0,2,3","129;115;22;23;24;174|,0;-18vsdww,1;-u9rbs0,2,3;-eg5xc0,2,4;-eaeio0,2,3;-dxstc0,2,4;-dqyio0,2,3;-deps00,2,4;-d88g00,2,3;-cvzpc0,2,4;-cpidc0,2,3;-1yevk0,3,4;bv7s80,5,4;cdxs40,3,4","129;76;67|,0;-kvj2fu,1,2","129;23;174;173|,0;-oytbtc,1;-c4xh40,2,3","129;22;23|,0;-u9rbs0,1,2;32t740,2","129;174;173|,0;-wcehew,1,2","129;107;23;24;25;174;173|,0;-18vsfjc,1;-u9rek0,2,3;-eg6040,2,4;-eaelg0,2,3;-dxsw40,2,4;-dqylg0,2,3;-depus0,2,4;-d88is0,2,3;-cvzs40,2,4;-cpig40,2,3;-1yeyc0,5,6","129;23;24;109|,0;-wcwx9c,1,2;-wlx40,3","129;22|,0;-15r12kg,1","129;165;20;21;22|,0;-15r0ymc,1;-u63pac,2,3;6yf4g0,3,4;7zv480,3,3;8i8b00,2,3;l89fc0,3","129;65;64|,0;-133j2zw,1;-10vsp00,1,2","129;69;68|,0;-1354kc8,1,2","129;69;65;64|,0;-133j3j0,1;-12a9fs0,2;-10vsp00,2,3","129;69;68|,0;-12smin4,1,2","129;65;64|,0;-133j1k8,1;-10vsp00,1,2","129;53;55|,0;-12nxx74,1,2","129;69;68|,0;-12smja4,1,2","129;69;68|,0;-1354jl8,1,2","129;69;56;58;35|,0;-133j6sk,1;5tp880,2,3;7wyiy0,2,4","129;69;68|,0;-133j46g,1,2","129;78;77|,0;-12nxusc,1,2","129;69;68|,0;-133j5c4,1,2","129;74;143;40;39;89;90|,0;-1ygf4wk,1,2;-gypack,4,3;-fgorlc,6,5","129;174;90;89|,0;-100edm4,1;-c4xmo0,2,3","129;27;28;29|,0;-nu2zkc,1;-kmr4c0,2,3;9ry7s0,2,2;aaod80,1,2;b34fw0,2,2;bv7jw0,1,2;liot80,2;ne0t40,1;o4o580,2","129;74;101;100;89;90|,0;-12rxtq4,1;-rvv0cg,2,3;-eyqoc0,5,4;-dfp1g0,2,3","129;90;89|,0;-18vsmgo,1,2","129;90;89;88|,0;-1421154,1,2;-cucg00,1,3;-co0o00,1,2;-btgl80,1,3;-bqxxc0,1,2","129;154;90;89;109|,0;-1qmkw08,1;-14u7uo8,2,3;-c1qns0,2,4;-bujh80,2,3","129;82;174;90;89;173|,0;-1ayy3h6,1;-14j9c00,2;-ss5uo0,3,4;-qotw40,2,5;-fgh6g0,3,4","129;82;101;100|,0;-14u7wu0,1;-k29zi0,2,3","129;90;89|,0;-15czsv8,1,2","129;82;90;89|,0;-1os49kw,1;-13g441m,2,3","129;91;82;101;100;89;90;137;136|,0;-1ayy808,1;-r2p1bo,2;-k29zi0,3,4;-euq8c0,6,5;-dfqqk0,7,5;5vb6c0,7,8;am73s0,3,4","129;91;90;89|,0;-15r1bnw,1;-13nvrnw,2,3","129;96;122;109;83|,0;-1anxquc,1,2;-rsibxr,3,4;-p36tc0,3,2;-m6840,2,3","129;109;83;80;90;89|,0;-1anxr0c,1,2;-eyiyk0,1,3;-ethh80,1,2;-eh8qk0,1,3;-earek0,1,2;-dyinw0,1,3;-drod80,1,2;-dfsl80,1,3;-d75h80,1,2;-cx0nw0,1,3;-cro2k0,1,2;-buwfw0,1,3;-bos2k0,1,2;-6mxp40,4,5","129;109;83;80|,0;-1rprx9x,1,2;-eyiyk0,1,3;-ethh80,1,2;-eh8qk0,1,3;-earek0,1,2;-dyinw0,1,3;-drod80,1,2;-dfsl80,1,3;-d75h80,1,2;-cx0nw0,1,3;-cro2k0,1,2;-buwfw0,1,3;-bos2k0,1,2;-z4ns0,2,2;yd6w0,1,2","129;115;101;100|,0;-1bss9yd,1;-peghyd,2,3","129;121;101;100;27;28|,0;-1ayy814,1;-ux9xew,2,3;4fid00,4,5;7qp980,2,3;od3p00,4","129;90;89;101;100;137;136;27|,0;-14212go,1,2;-cwm2w0,3,4;-cdzpk0,5,6;9ryak0,5,4;aaog00,3,4;liow00,7;ne0vw0,3","129;127;101;137;89;90;136;100|,0;-1ayy8bg,1;-nu11ng,2;-kmr1k0,3,4;-e6dzw0,5,4;-dnetg0,3,6;ap2t40,2,7","129;27;28;29|,0;-qcx400,1;-kmr4c0,2,3;9ry7s0,2,2;aaod80,1,2;b34fw0,2,2;bv7jw0,1,2;liot80,2;ne0t40,1","129;174;173;172;90;89|,0;-u9rhc0,1,2;-eg62w0,1,3;-eaeo80,1,2;-dxsyw0,1,3;-dqyo80,1,2;-depxk0,1,3;-d88lk0,1,2;-cvzuw0,1,3;-cpiiw0,1,2;-1yf140,4;3ijk00,1,2;bv7pg0,4,5;dfdxg0,4,2;dzwtg0,1,2","129;90;89;174;173|,0;-y89550,1,2;-qo4w40,3,4;-dfqqk0,1,4;-cx0nw0,1,2","129;174;173;172;90;89|,0;-100edc0,1,2;-gj2dk0,1,3;-gb3c80,1,2;-fjrxg0,4,5","129;90;89|,0;-13qyw0s,1,2","129;134;101;137;89;90;136;100;27|,0;-1ayy7rs,1;-nu113c,2;-kmr1k0,3,4;-e6dzw0,5,4;-db2g80,3,6;afrjo0,3,7;bchk00,2,7;liow00,8","129;154;174;173;172;90;89|,0;-154i6p8,1;-uozn3l,2,3;-eyh9g0,2,4;-eqk5k0,2,3;-eimw40,2,4;-e6dzw0,2,3;-dytrw0,2,4;-dp3rw0,2,3;-dfqqk0,2,4;-d62qs0,2,3;-cx0nw0,5,4;396io0,5,6","129;134;138;132;136;137;29;101;100|,0;-1ayy9mh,1;-rx5dmh,1,2;-r57wg7,1,3;-qrqps7,1,2;-qeh0k7,1,3;-qcx400,5,4;-pgkok0,5,6;-p84z80,5,4;-ontcc0,7;-kmr1k0,5,4;atrek0,5,8;bchk00,7;bi8yo0,5,4","129;154;174;173;89;90;172|,0;-154i5px,1;-uozn1x,2,3;-ff5c80,5,4;-d8caw0,5,6;-d62qs0,5,3;-cx0nw0,5,6;396io0,5,4","129;160;130;101;137;89;90;136;100|,0;-1ayy74y,1,2;-ms0hsy,3;-fciw80,4,5;-e6dzw0,6,5;-d5thg0,4,7;9ryak0,4,8;aaog00,3,8","129;160;90;89|,0;-1hs7rn8,1;-13r0qs0,2,3","129;27;28;29|,0;-qcx400,1;-kmr4c0,2,3;9ry7s0,2,2;aaod80,1,2;atrek0,1,1;bdkg00,2,3;ks1h40,2,2;lb4l80,1;liot80,2","129;27;28;29|,0;-qcx400,1;-kmr4c0,2,3;998540,2,2;9ryak0,1,2;b34fw0,2,2;bv7jw0,1,2;liot80,2;ne0t40,1;ohmt80,2","129;165;101;137;89;90;136;100|,0;-1ayy8zc,1;-nu12ao,2;-kmr1k0,3,4;-e6dzw0,5,4;-df8g80,3,6;ap2vw0,2,7;cp3bo0,3,6;e3aqc0,3,7;eimw40,2,7;n382o0,3","129;121;101;90;89;100|,0;-1ayy6zg,1;-136r6qw,2;-e6dzw0,3,4;-cx0l40,2,5","129;163;90;89|,0;-1bhq3cc,1;-10j6dge,2,3","129;168;90;89;101;137;136;100|,0;-1ayy790,1;-r3exx0,2,3;-qcx6s0,1;-peghx0,4;-fch1k0,5,3;-e6dzw0,2,3;-d6wg80,5,6;9ryak0,5,7;aaog00,4,7","129;90;89|,0;-t85vo8,1,2","129;27;28;29;26|,0;-qcx400,1;-kmr4c0,2,3;9ry7s0,2,2;aaod80,1,2;atrek0,1,1;bchk00,4;bi8yo0,1,2;liot80,2;ne0t40,1;o4o580,2","129;90;89;137;136;101;100|,0;-15cztgo,1,2;-cshus0,3,4;ap2vw0,1;b34o80,5,6","129;90;89|,0;-14211ox,1,2","129;178;127;90;101;137;89;136;100|,0;-1ayy7cs,1;-rns980,2;-q7q73c,3;-ptj1g0,4;-poyaw0,3;-fcmis0,5,6;-e6dzw0,3,6;-d9kqw0,5,7;9ryak0,5,8;aaog00,4,8;em2qg0,4,6;f1cys0,3,6;fkg040,4;h807s0,4,8","129;27;28;29|,0;-q3cw84,1;-kmr4c0,2,3;998540,2,2;9ryak0,1,2;b34fw0,2,2;bv7jw0,1,2;liot80,2;ne0t40,1;pha580,2","129;178;90;89;101;100|,0;-1ayy6k0,1;-se9yk0,2,3;-qrqd80,4,5;-ou36w0,2,3","129;42;101;137;89;90;136;100|,0;-1ayy96g,1;-nu12hc,2;-kmr1k0,3,4;-e6dzw0,5,4;-do11g0,3,6;atrek0,3,7;bchbo0,2,7","129;29;30|,0;-wvpc2s,1;dkgss0,2","129;31|,0;-133iwws,1","129;49|,0;-10j6sm4,1","24;29|,0;-afrs00,1","129;28|,0;-x6pjlo,1","129;134;29|,0;-1ayyga0,1;-57x6y0,2","129;28;29|,0;-wvp9bc,1,2","129;28|,0;-uks29s,1","129;0;13;14;38;37|,0;-usiiv4,1;-afqw20,2,3;lx0h40,5,4","129;146;147;145|,0;-1gsoz14,1,2;-ciy9c0,2,3","129;153;34;33;35|,0;-1ayyvh4,1;-1354j8w,2;-ecsh40,3;-cpsbo0,2;nh90g0,4","129;59;62;63|,0;-1gsp0n0,1;-ciya10,2,3","129;34;33|,0;-100f5fw,1;-su4zs0,2;-qknl00,1;-f08x40,2;-cqtd00,1","129;102;17;18;19|,0;-15r0p2w,1;-jhfaew,2,3;6d68c0,3,4","129;35;36|,0;-u964i4,1,2","129;12;13;37|,0;-100dhng,1;535io0,2;d1o980,3","129;13;37|,0;-100dhmg,1;lx0jw0,2","129;36;37|,0;-sa2x4w,1,2","129;36|,0;-100fais,1","129;19;18|,0;-kcr62o,1;8cmlw0,2,1","129;15|,0;-tvndoc,1","129;35|,0;-tvowac,1","129;110;33;108;95|,0;-100f450,1;-en8eg0,2;-d9n500,1,3;g5z2w0,4","129;117;111;118;116|,0;-12lnw3m,1,2;-j3x0a0,1,3;-cq2tg0,1,4","129;2;14;38|,0;-100dk74,1;535eyo,2;d1o6g0,3","129;35;33;34;36|,0;-100f7ik,1;-su52k0,2;-qknl00,1;-h817w0,3;-f08x40,2;-cqtd00,1;-4r7w0,4;f4tw00,1","129;35;34;33;12;36|,0;-100f8bk,1;-h817w0,2;-f08x40,3;-dip2c0,1;-4r7w0,4;cc3yo0,5","129;35;33;34;36|,0;-100f91c,1;-su52k0,2;-qknl00,1;-h817w0,3;-f08x40,2;-dj2100,1;-4r7w0,4","129;4|,0;-tvncu0,1","129;166|,0;-usij20,1","129;58;33;36|,0;-pjxiws,1;-e9rby0,2;-couzo0,1;4r4dm0,3","129;1;0;13|,0;-100dhv8,1;-9wyz6o,2;4kdjy0,3","129;57;58;61;35;36|,0;-100f8fs,1;-9x0ps0,2,3;nvney0,4;ptwxg0,4,5","129;35;36|,0;-u9645o,1,2","129;33|,0;-100f28k,1","129;5;16|,0;-100dp8s,1;es2cy0,2","129;35;33;34|,0;-100f6ms,1;-su52k0,2;-qknl00,1;-h817w0,3;-f08x40,2;-cqtd00,1","129;153;34|,0;-1ayytx4,1;-1354j8w,2","129;3;4;14|,0;-100djqw,1,2;4sal20,3,2","129;14|,0;-tvnayw,1","129;36|,0;-100f9dg,1","129;60;37;38|,0;-100fbk8,1;-f4vrlc,2,3","129;36|,0;-100f86s,1","129;36|,0;-100fbdk,1","169|,0"];DateTime._abbrOffsets = {"ACDT":"t60","ACST":"qe0","ADDT":"-5k0","ADT":"-8c0","AEDT":"uk0","AEST":"rs0","AHDT":"-p00","AHST":"-rs0","AKDT":"-m80","AKST":"-p00","AMT":"-aog","APT":"-8c0","AST":"-b40","AWDT":"p00","AWST":"m80","AWT":"-8c0","BDST":"5k0","BDT":"-rs0","BMT":"-b1h","BST":"2s0","CAST":"qe0","CAT":"5k0","CDDT":"-b40","CDT":"-dw0","CEMT":"8c0","CEST":"5k0","CET":"2s0","CMT":"-bw0","CPT":"-dw0","CST":"-go0","CWT":"-dw0","DMT":"-169","EAT":"8c0","EDDT":"-8c0","EDT":"-b40","EEST":"8c0","EET":"5k0","EMT":"-k94","EPT":"-b40","EST":"-dw0","EWT":"-b40","FFMT":"-bb8","FMT":"-34o","GDT":"uk0","GMT":"0","GST":"rs0","HDT":"-qe0","HKST":"p00","HKT":"m80","HMT":"-f9c","HPT":"-qe0","HST":"-rs0","HWT":"-qe0","IDDT":"b40","IDT":"8c0","IMT":"jb5","IST":"5k0","JDT":"rs0","JMT":"6ig","JST":"p00","KDT":"rs0","KMT":"4fc","KST":"nm0","LST":"78y","MDDT":"-dw0","MDST":"ck7","MDT":"-go0","MMT":"6yh","MPT":"-go0","MSD":"b40","MSK":"8c0","MST":"-jg0","MWT":"-go0","NDDT":"-460","NDT":"-6zg","NPT":"-6y0","NST":"-9q0","NWT":"-6y0","NZDT":"1040","NZMT":"vy0","NZST":"xc0","PDDT":"-go0","PDT":"-jg0","PKST":"go0","PKT":"dw0","PLMT":"jqu","PMT":"-a7o","PPMT":"-ddo","PPT":"-jg0","PST":"-m80","PWT":"-jg0","QMT":"-ejc","RMT":"4gy","SAST":"5k0","SDMT":"-cyo","SJMT":"-fkd","SMT":"-apo","SST":"-uk0","TBMT":"8an","TMT":"9iw","UTC":"0","WAST":"5k0","WAT":"2s0","WEMT":"5k0","WEST":"2s0","WET":"0","WIB":"jg0","WIT":"p00","WITA":"m80","WMT":"3w0","YDDT":"-jg0","YDT":"-m80","YPT":"-m80","YST":"-p00","YWT":"-m80"};

    /**
     * DateTime (Static) Properties
     */

    // get resolved options
    const resolvedOptions = Intl.DateTimeFormat().resolvedOptions();

    Object.assign(DateTime, {

        // Whether to clamp current date when adjusting month
        clampDates: true,

        // Default locale
        defaultLocale: resolvedOptions.locale,

        // Default timeZone
        defaultTimeZone: resolvedOptions.timeZone,

        // Formats
        formats: {
            atom: 'Y-m-d\\TH:i:sP',
            cookie: 'l, d-M-Y H:i:s T',
            date: 'D M d Y',
            iso8601: 'Y-m-d\\TH:i:sO',
            rfc822: 'D, d M y H:i:s O',
            rfc850: 'l, d-M-y H:i:s T',
            rfc1036: 'D, d M y H:i:s O',
            rfc1123: 'D, d M Y H:i:s O',
            rfc2822: 'D, d M Y H:i:s O',
            rfc3339: 'Y-m-d\\TH:i:sP',
            rfc3339_extended: 'Y-m-d\\TH:i:s.vP',
            rss: 'D, d M Y H:i:s O',
            string: 'D M d Y H:i:s O (e)',
            time: 'H:i:s O (e)',
            w3c: 'Y-m-d\\TH:i:sP'
        },

        // Language
        lang: {
            dayPeriods: {
                lower: ['am', 'pm'],
                upper: ['AM', 'PM']
            },
            days: {
                min: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
                full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            },
            months: {
                short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
            numberRegExp: '\\d',
            numbers: false,
            ordinal: value => {
                const j = value % 10;
                const k = value % 100;

                if (j === 1 && k !== 11) {
                    return 'st';
                }

                if (j === 2 && k !== 12) {
                    return 'nd';
                }

                if (j === 3 && k !== 13) {
                    return 'rd';
                }

                return 'th';
            },
            ordinalRegExp: '(st|[nr]d|th)'
        },

        // Comparison lookup
        _compareLookup: [
            {
                values: ['year'],
                method: 'getYear'
            },
            {
                values: ['month'],
                method: 'getMonth'
            },
            {
                values: ['day', 'date'],
                method: 'getDate'
            },
            {
                values: ['hour'],
                method: 'getHours'
            },
            {
                values: ['minute'],
                method: 'getMinutes'
            },
            {
                values: ['second'],
                method: 'getSeconds'
            }
        ],

        // Unix epoch
        _epoch: {
            year: 1970,
            month: 1,
            date: 1,
            hours: 0,
            pm: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
            timeZone: 'UTC'
        },

        // Formatter locale
        _formatterLocale: 'en-US',

        // Formatter options
        _formatterOptions: {
            timeZone: 'UTC',
            hour12: false,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        },

        // Days in months
        _monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

        // Seperators
        _seperators: [';', ':', '/', '.', ',', '-', '(', ')'],

        // Date string timezone RegExp
        _dateStringTimeZoneRegExp: /\s(?:UTC|GMT|[\+\-]\d)|\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}[\+\-]\d{2}\:\d{2}/i,

        // Offset RegExp
        _offsetRegExp: /([\+\-])(\d{2})(\:?)(\d{2})/,

        // abbeviations
        _abbreviations: {},

        // timeZones
        _timeZones: {}

    });

    // UTC formatter
    DateTime._utcFormatter = new Intl.DateTimeFormat(DateTime._formatterLocale, DateTime._formatterOptions);

    return {
        DateInterval,
        DateTime,
        DateTimeImmutable
    };

});
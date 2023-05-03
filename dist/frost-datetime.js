(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DateTime = factory());
})(this, (function () { 'use strict';

    /**
     * DateTime Factory
     */

    const data = {};

    /**
     * Get values from cache (or generate if they don't exist).
     * @param {string} key The key for the values.
     * @param {function} callback The callback to generate the values.
     * @return {array} The cached values.
     */
    function getData(key, callback) {
        if (!(key in data)) {
            data[key] = callback();
        }

        return data[key];
    }
    /**
     * Create a new date formatter for a timeZone.
     * @param {string} timeZone The timeZone.
     * @param {object} options The options for the formatter.
     * @return {Intl.DateTimeFormat} A new DateTimeFormat object.
     */
    function getDateFormatter(timeZone) {
        return getData(
            `dateFormatter.${timeZone}`,
            (_) => makeFormatter('en', {
                timeZone,
                hourCycle: 'h23',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }),
        );
    }
    /**
     * Create a new relative formatter for a locale.
     * @param {string} locale The locale.
     * @param {object} options The options for the formatter.
     * @return {Intl.RelativeTimeFormat} A new RelativeTimeFormat object.
     */
    function getRelativeFormatter(locale) {
        if (!('RelativeTimeFormat' in Intl)) {
            return null;
        }

        return getData(
            `relativeFormatter.${locale}`,
            (_) => new Intl.RelativeTimeFormat(locale, {
                numeric: 'auto',
                style: 'long',
            }),
        );
    }
    /**
     * Create a new formatter for a locale.
     * @param {string} locale The locale.
     * @param {object} options The options for the formatter.
     * @return {Intl.DateTimeFormat} A new DateTimeFormat object.
     */
    function makeFormatter(locale, options) {
        return new Intl.DateTimeFormat(locale, {
            timeZone: 'UTC',
            ...options,
        });
    }

    /**
     * DateTime Variables
     */

    const resolvedOptions = (new Intl.DateTimeFormat).resolvedOptions();

    const config = {
        clampDates: true,
        defaultLocale: resolvedOptions.locale,
        defaultTimeZone: resolvedOptions.timeZone,
    };

    const dateStringTimeZoneRegExp = /\s(?:UTC|GMT|Z|[\+\-]\d)|\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}[\+\-]\d{2}\:\d{2}/i;

    const formats = {
        date: 'eee MMM dd yyyy',
        rfc3339_extended: `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`,
        string: 'eee MMM dd yyyy HH:mm:ss xx (VV)',
        time: 'HH:mm:ss xx (VV)',
    };

    const formatTokenRegExp = /([a-z])\1*|'[^']*'/i;

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const offsetRegExp = /(?:GMT)?([\+\-])(\d{2})(\:?)(\d{2})?/;

    const parseOrderKeys = [
        ['year', 'weekYear'],
        ['era'],
        ['quarter', 'month', 'week', 'dayOfYear'],
        ['weekOfMonth'],
        ['date', 'weekDay'],
        ['weekDayInMonth'],
        ['hours24', 'hours12', 'dayPeriod'],
        ['minutes', 'seconds', 'milliseconds'],
    ];

    const thresholds = {
        month: 12,
        week: null,
        day: 7,
        hour: 24,
        minute: 60,
        second: 60,
    };

    /**
     * DateTime Helpers
     */

    /**
     * Compensate the difference between two dates.
     * @param {DateTime} date The DateTime.
     * @param {DateTime} other The DateTime to compare to.
     * @param {number} amount The amount to compensate.
     * @param {Boolean} [compensate=true] Whether to compensate the amount.
     * @param {number} [compensation=1] The compensation offset.
     * @return {number} The compensated amount.
     */
    function compensateDiff(date, other, amount, compensate = true, compensation = 1) {
        if (amount > 0) {
            amount = Math.floor(amount);

            if (compensate && date < other) {
                amount += compensation;
            }
        } else if (amount < 0) {
            amount = Math.ceil(amount);

            if (compensate && date > other) {
                amount -= compensation;
            }
        }

        return amount;
    }
    /**
     * Get the biggest difference between two dates.
     * @param {DateTime} date The DateTime.
     * @param {DateTime} [other] The DateTime to compare to.
     * @return {array} The biggest difference (amount and time unit).
     */
    function getBiggestDiff(date, other) {
        let lastResult;
        for (const timeUnit of ['year', 'month', 'week', 'day', 'hour', 'minute', 'second']) {
            const relativeDiff = date.diff(other, timeUnit);
            if (lastResult && thresholds[timeUnit] && Math.abs(relativeDiff) >= thresholds[timeUnit]) {
                return lastResult;
            }

            const actualDiff = date.diff(other, timeUnit, false);
            if (actualDiff) {
                return [relativeDiff, timeUnit];
            }

            if (relativeDiff) {
                lastResult = [relativeDiff, timeUnit];
            } else {
                lastResult = null;
            }
        }

        return lastResult ?
            lastResult :
            [0, 'second'];
    }
    /**
     * Get the offset for a DateTime.
     * @param {DateTime} date The DateTime.
     * @return {number} The offset.
     */
    function getOffset(date) {
        const timeZone = date.getTimeZone();

        if (timeZone === 'UTC') {
            return 0;
        }

        const utcString = getDateFormatter('UTC').format(date);
        const localString = getDateFormatter(timeZone).format(date);

        return (new Date(utcString) - new Date(localString)) / 60000;
    }
    /**
     * Get the number of milliseconds since the UNIX epoch (offset to timeZone).
     * @param {DateTime} date The DateTime.
     * @return {number} The number of milliseconds since the UNIX epoch (offset to timeZone).
     */
    function getOffsetTime(date) {
        return date.getTime() - (date.getTimeZoneOffset() * 60000);
    }
    /**
     * Modify a DateTime by a duration.
     * @param {DateTime} date The DateTime.
     * @param {number} amount The amount to modify the date by.
     * @param {string} [timeUnit] The unit of time.
     * @return {DateTime} The DateTime object.
     */
    function modify(date, amount, timeUnit) {
        timeUnit = timeUnit.toLowerCase();

        switch (timeUnit) {
            case 'second':
            case 'seconds':
                return date.setSeconds(
                    date.getSeconds() + amount,
                );
            case 'minute':
            case 'minutes':
                return date.setMinutes(
                    date.getMinutes() + amount,
                );
            case 'hour':
            case 'hours':
                return date.setHours(
                    date.getHours() + amount,
                );
            case 'week':
            case 'weeks':
                return date.setDate(
                    date.getDate() + (amount * 7),
                );
            case 'day':
            case 'days':
                return date.setDate(
                    date.getDate() + amount,
                );
            case 'month':
            case 'months':
                return date.setMonth(
                    date.getMonth() + amount,
                );
            case 'year':
            case 'years':
                return date.setYear(
                    date.getYear() + amount,
                );
            default:
                throw new Error('Invalid time unit supplied');
        }
    }
    /**
     * Compare a literal format string with a date string.
     * @param {string} formatString The literal format string.
     * @param {string} dateString The date string.
     */
    function parseCompare(formatString, dateString) {
        let i = 0;
        for (const char of formatString) {
            if (char !== dateString[i]) {
                throw new Error(`Unmatched character in DateTime string: ${char}`);
            }

            i++;
        }
    }
    /**
     * Generate methods for parsing a date.
     * @return {object} An object containing date parsing methods.
     */
    function parseFactory() {
        let isPM = false;
        let lastAM = true;

        return {
            date: {
                get: (datetime) => datetime.getDate(),
                set: (datetime, value) => datetime.setDate(value),
            },
            dayPeriod: {
                get: (datetime) => datetime.getHours() < 12 ? 0 : 1,
                set: (datetime, value) => {
                    isPM = value;
                    let hours = value ? 12 : 0;
                    if (lastAM) {
                        hours += datetime.getHours();
                    }
                    return datetime.setHours(hours);
                },
            },
            dayOfYear: {
                get: (datetime) => datetime.getDayOfYear(),
                set: (datetime, value) => datetime.setDayOfYear(value),
            },
            era: {
                get: (datetime) => datetime.getYear() < 1 ? 0 : 1,
                set: (datetime, value) => {
                    const offset = value ? 1 : -1;
                    return datetime.setYear(
                        datetime.getYear() * offset,
                    );
                },
            },
            hours12: {
                get: (datetime) => datetime.getHours() % 12,
                set: (datetime, value) => {
                    if (isPM) {
                        value += 12;
                    }
                    lastAM = true;
                    return datetime.setHours(value);
                },
            },
            hours24: {
                get: (datetime) => datetime.getHours(),
                set: (datetime, value) => {
                    lastAM = false;
                    return datetime.setHours(value);
                },
            },
            milliseconds: {
                get: (datetime) => datetime.getMilliseconds(),
                set: (datetime, value) => datetime.setMilliseconds(value),
            },
            minutes: {
                get: (datetime) => datetime.getMinutes(),
                set: (datetime, value) => datetime.setMinutes(value),
            },
            month: {
                get: (datetime) => datetime.getMonth(),
                set: (datetime, value) => datetime.setMonth(value),
            },
            quarter: {
                get: (datetime) => datetime.getQuarter(),
                set: (datetime, value) => datetime.setQuarter(value),
            },
            seconds: {
                get: (datetime) => datetime.getSeconds(),
                set: (datetime, value) => datetime.setSeconds(value),
            },
            week: {
                get: (datetime) => datetime.getWeek(),
                set: (datetime, value) => datetime.setWeek(value),
            },
            weekDay: {
                get: (datetime) => datetime.getWeekDay(),
                set: (datetime, value) => datetime.setWeekDay(value),
            },
            weekDayInMonth: {
                get: (datetime) => datetime.getWeekDayInMonth(),
                set: (datetime, value) => datetime.setWeekDayInMonth(value),
            },
            weekOfMonth: {
                get: (datetime) => datetime.getWeekOfMonth(),
                set: (datetime, value) => datetime.setWeekOfMonth(value),
            },
            weekYear: {
                get: (datetime) => datetime.getWeekYear(),
                set: (datetime, value) => datetime.setWeekYear(value),
            },
            year: {
                get: (datetime) => {
                    const year = datetime.getYear();
                    return Math.abs(year);
                },
                set: (datetime, value) => datetime.setYear(value),
            },
        };
    }
    /**
     * Set the number of milliseconds since the UNIX epoch (offset to timeZone).
     * @param {DateTime} date The DateTime.
     * @param {number} time The number of milliseconds since the UNIX epoch (offset to timeZone).
     * @return {DateTime} The DateTime object.
     */
    function setOffsetTime(date, time) {
        return date.setTime(time + (date.getTimeZoneOffset() * 60000));
    }

    /**
     * DateFormatter Values
     */

    /**
     * Get cached day period values.
     * @param {string} locale The locale.
     * @param {string} [type=long] The formatting type.
     * @return {array} The cached values.
     */
    function getDayPeriods(locale, type = 'long') {
        return getData(
            `periods.${locale}.${type}`,
            (_) => {
                const dayPeriodFormatter = makeFormatter(locale, { hour: 'numeric', hourCycle: 'h11' });
                return new Array(2)
                    .fill()
                    .map((_, index) =>
                        dayPeriodFormatter.formatToParts(Date.UTC(2018, 0, 1, index * 12))
                            .find((part) => part.type === 'dayPeriod')
                            .value,
                    );
            },
        );
    }
    /**
     * Get cached day values.
     * @param {string} locale The locale.
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the values are standalone.
     * @return {array} The cached values.
     */
    function getDays(locale, type = 'long', standalone = true) {
        return getData(
            `days.${locale}.${type}.${standalone}`,
            (_) => {
                if (standalone) {
                    const dayFormatter = makeFormatter(locale, { weekday: type });
                    return new Array(7)
                        .fill()
                        .map((_, index) =>
                            dayFormatter.format(Date.UTC(2018, 0, index)),
                        );
                }

                const dayFormatter = makeFormatter(locale, { year: 'numeric', month: 'numeric', day: 'numeric', weekday: type });
                return new Array(7)
                    .fill()
                    .map((_, index) =>
                        dayFormatter.formatToParts(Date.UTC(2018, 0, index))
                            .find((part) => part.type === 'weekday')
                            .value,
                    );
            },
        );
    }
    /**
     * Get cached era values.
     * @param {string} locale The locale.
     * @param {string} [type=long] The formatting type.
     * @return {array} The cached values.
     */
    function getEras(locale, type = 'long') {
        return getData(
            `eras.${locale}.${type}`,
            (_) => {
                const eraFormatter = makeFormatter(locale, { era: type });
                return new Array(2)
                    .fill()
                    .map((_, index) =>
                        eraFormatter.formatToParts(Date.UTC(index - 1, 0, 1))
                            .find((part) => part.type === 'era')
                            .value,
                    );
            },
        );
    }
    /**
     * Get cached month values.
     * @param {string} locale The locale.
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the values are standalone.
     * @return {array} The cached values.
     */
    function getMonths(locale, type = 'long', standalone = true) {
        return getData(
            `months.${locale}.${type}.${standalone}`,
            (_) => {
                if (standalone) {
                    const monthFormatter = makeFormatter(locale, { month: type });
                    return new Array(12)
                        .fill()
                        .map((_, index) =>
                            monthFormatter.format(Date.UTC(2018, index, 1)),
                        );
                }

                const monthFormatter = makeFormatter(locale, { year: 'numeric', month: type, day: 'numeric' });
                return new Array(12)
                    .fill()
                    .map((_, index) =>
                        monthFormatter.formatToParts(Date.UTC(2018, index, 1))
                            .find((part) => part.type === 'month')
                            .value,
                    );
            },
        );
    }
    /**
     * Get cached number values.
     * @param {string} locale The locale.
     * @return {array} The cached values.
     */
    function getNumbers(locale) {
        return getData(
            `numbers.${locale}`,
            (_) => {
                const numberFormatter = makeFormatter(locale, { minute: 'numeric' });
                return new Array(10)
                    .fill()
                    .map((_, index) =>
                        numberFormatter.format(Date.UTC(2018, 0, 1, 0, index)),
                    );
            },
        );
    }
    /**
     * Get the RegExp for the number values.
     * @param {string} locale The locale.
     * @return {string} The number values RegExp.
     */
    function numberRegExp(locale) {
        const numbers = getNumbers(locale).join('|');
        return `(?:${numbers})+`;
    }

    /**
     * Format a day as a locale string.
     * @param {string} locale The locale.
     * @param {number} day The day to format (0-6).
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the value is standalone.
     * @return {string} The formatted string.
     */
    function formatDay(locale, day, type = 'long', standalone = true) {
        return getDays(locale, type, standalone)[day];
    }
    /**
     * Format a day period as a locale string.
     * @param {string} locale The locale.
     * @param {number} period The period to format (0-1).
     * @param {string} [type=long] The formatting type.
     * @return {string} The formatted string.
     */
    function formatDayPeriod(locale, period, type = 'long') {
        return getDayPeriods(locale, type)[period];
    }
    /**
     * Format an era as a locale string.
     * @param {string} locale The locale.
     * @param {number} era The period to format (0-1).
     * @param {string} [type=long] The formatting type.
     * @return {string} The formatted string.
     */
    function formatEra(locale, era, type = 'long') {
        return getEras(locale, type)[era];
    }
    /**
     * Format a month as a locale string.
     * @param {string} locale The locale.
     * @param {number} month The month to format (1-12).
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the value is standalone.
     * @return {string} The formatted string.
     */
    function formatMonth(locale, month, type = 'long', standalone = true) {
        return getMonths(locale, type, standalone)[month - 1];
    }
    /**
     * Format a number as a locale number string.
     * @param {string} locale The locale.
     * @param {number} number The number to format.
     * @param {number} [padding=0] The amount of padding to use.
     * @return {string} The formatted string.
     */
    function formatNumber(locale, number, padding = 0) {
        const numbers = getNumbers(locale);
        return `${number}`
            .padStart(padding, 0)
            .replace(/\d/g, (match) => numbers[match]);
    }
    /**
     * Format a number to an offset string.
     * @param {number} offset The offset to format.
     * @param {Boolean} [useColon=true] Whether to use a colon seperator.
     * @param {Boolean} [optionalMinutes=false] Whether minutes are optional.
     * @return {string} The formatted offset string.
     */
    function formatOffset(offset, useColon = true, optionalMinutes = false) {
        const hours = Math.abs(
            (offset / 60) | 0,
        );
        const minutes = Math.abs(offset % 60);

        const sign = offset > 0 ?
            '-' :
            '+';
        const hourString = `${hours}`.padStart(2, 0);
        const minuteString = minutes || !optionalMinutes ?
            `${minutes}`.padStart(2, 0) :
            '';
        const colon = useColon && minuteString ?
            ':' :
            '';

        return `${sign}${hourString}${colon}${minuteString}`;
    }
    /**
     * Format a time zone as a locale string.
     * @param {string} locale The locale.
     * @param {number} timestamp The timestamp to use.
     * @param {string} timeZone The time zone to format.
     * @param {string} [type=long] The formatting type.
     * @return {string} The formatted string.
     */
    function formatTimeZoneName(locale, timestamp, timeZone, type = 'long') {
        return makeFormatter(locale, { second: 'numeric', timeZone, timeZoneName: type })
            .formatToParts(timestamp)
            .find((part) => part.type === 'timeZoneName')
            .value;
    }

    /**
     * DateTime class
     * @class
     */
    class DateTime {
        /**
         * New DateTime constructor.
         * @param {string|number|null} [date] The date or timestamp to parse.
         * @param {object} [options] Options for the new DateTime.
         * @param {string} [options.timeZone] The timeZone to use.
         * @param {string} [options.locale] The locale to use.
         */
        constructor(date = null, options = {}) {
            let timestamp;
            let adjustOffset = false;

            if (date === null) {
                timestamp = Date.now();
            } else if (!isNaN(parseInt(date)) && isFinite(date)) {
                timestamp = date;
            } else if (date === `${date}`) {
                timestamp = Date.parse(date);

                if (isNaN(timestamp)) {
                    throw new Error('Invalid date string supplied');
                }

                if (!date.match(dateStringTimeZoneRegExp)) {
                    timestamp -= new Date()
                        .getTimezoneOffset() *
                        60000;
                }

                adjustOffset = true;
            } else {
                throw new Error('Invalid date supplied');
            }

            this._date = new Date(timestamp);
            this._dynamicTz = false;
            this.isValid = true;

            let timeZone = options.timeZone;

            if (!timeZone) {
                timeZone = config.defaultTimeZone;
            }

            if (['Z', 'GMT'].includes(timeZone)) {
                timeZone = 'UTC';
            }

            const match = timeZone.match(offsetRegExp);
            if (match) {
                this._offset = match[2] * 60 + parseInt(match[4] || 0);
                if (this._offset && match[1] === '+') {
                    this._offset *= -1;
                }

                if (this._offset) {
                    this._timeZone = formatOffset(this._offset);
                } else {
                    this._dynamicTz = true;
                    this._timeZone = 'UTC';
                }
            } else {
                this._dynamicTz = true;
                this._timeZone = timeZone;
            }

            if (this._dynamicTz) {
                this._offset = getOffset(this);
            }

            if (adjustOffset && this._offset) {
                const oldOffset = this._offset;

                this._date.setTime(this.getTime() + this._offset * 60000);

                if (this._dynamicTz) {
                    this._offset = getOffset(this);

                    // compensate for DST transitions
                    if (oldOffset !== this._offset) {
                        this._date.setTime(this.getTime() - ((oldOffset - offset) * 60000));
                    }
                }
            }

            if (!('locale' in options)) {
                options.locale = config.defaultLocale;
            }

            this._locale = options.locale;
        }

        /**
         * Get the name of the current locale.
         * @return {string} The name of the current locale.
         */
        getLocale() {
            return this._locale;
        }

        /**
         * Get the number of milliseconds since the UNIX epoch.
         * @return {number} The number of milliseconds since the UNIX epoch.
         */
        getTime() {
            return this._date.getTime();
        }

        /**
         * Get the name of the current timeZone.
         * @return {string} The name of the current timeZone.
         */
        getTimeZone() {
            return this._timeZone;
        }

        /**
         * Get the UTC offset (in minutes) of the current timeZone.
         * @return {number} The UTC offset (in minutes) of the current timeZone.
         */
        getTimeZoneOffset() {
            return this._offset;
        }

        /**
         * Set the current locale.
         * @param {string} locale The name of the timeZone.
         * @return {DateTime} The DateTime object.
         */
        setLocale(locale) {
            return new DateTime(this.getTime(), {
                locale,
                timeZone: this._timeZone,
            });
        }

        /**
         * Set the number of milliseconds since the UNIX epoch.
         * @param {number} time The number of milliseconds since the UNIX epoch.
         * @return {DateTime} The DateTime object.
         */
        setTime(time) {
            return new DateTime(time, {
                locale: this._locale,
                timeZone: this._timeZone,
            });
        }

        /**
         * Set the current timeZone.
         * @param {string} timeZone The name of the timeZone.
         * @return {DateTime} The DateTime object.
         */
        setTimeZone(timeZone) {
            return new DateTime(this.getTime(), {
                locale: this._locale,
                timeZone,
            });
        }

        /**
         * Set the current UTC offset.
         * @param {number} offset The UTC offset (in minutes).
         * @return {DateTime} The DateTime object.
         */
        setTimeZoneOffset(offset) {
            return new DateTime(this.getTime(), {
                locale: this._locale,
                timeZone: formatOffset(offset),
            });
        }

        /**
         * Get the number of milliseconds since the UNIX epoch.
         * @return {number} The number of milliseconds since the UNIX epoch.
         */
        valueOf() {
            return this.getTime();
        }

        /**
         * Return a primitive value of the DateTime.
         * @param {string} hint The type hint.
         * @return {string|number}
         */
        [Symbol.toPrimitive](hint) {
            return hint === 'number' ?
                this.valueOf() :
                this.toString();
        }
    }

    const weekStart = { '1': ['af', 'am', 'ar-il', 'ar-sa', 'ar-ye', 'as', 'bn', 'bo', 'brx', 'ccp', 'ceb', 'chr', 'dav', 'dz', 'ebu', 'en', 'fil', 'gu', 'guz', 'haw', 'he', 'hi', 'id', 'ii', 'ja', 'jv', 'kam', 'ki', 'kln', 'km', 'kn', 'ko', 'kok', 'ks', 'lkt', 'lo', 'luo', 'luy', 'mas', 'mer', 'mgh', 'ml', 'mr', 'mt', 'my', 'nd', 'ne', 'om', 'or', 'pa', 'ps-pk', 'pt', 'qu', 'saq', 'sd', 'seh', 'sn', 'ta', 'te', 'th', 'ti', 'ug', 'ur', 'xh', 'yue', 'zh', 'zu'], '7': ['ar', 'ckb', 'en-ae', 'en-sd', 'fa', 'kab', 'lrc', 'mzn', 'ps'] };
    const minDaysInFirstWeek = { '4': ['ast', 'bg', 'br', 'ca', 'ce', 'cs', 'cy', 'da', 'de', 'dsb', 'el', 'en-at', 'en-be', 'en-ch', 'en-de', 'en-dk', 'en-fi', 'en-fj', 'en-gb', 'en-gg', 'en-gi', 'en-ie', 'en-im', 'en-je', 'en-nl', 'en-se', 'es', 'et', 'eu', 'fi', 'fo', 'fr', 'fur', 'fy', 'ga', 'gd', 'gl', 'gsw', 'gv', 'hsb', 'hu', 'is', 'it', 'ksh', 'kw', 'lb', 'lt', 'nb', 'nds', 'nl', 'nn', 'os-ru', 'pl', 'pt-ch', 'pt-lu', 'pt-pt', 'rm', 'ru', 'sah', 'se', 'sk', 'smn', 'sv', 'tt', 'wae'] };

    /**
     * Get the formatting type from the component token length.
     * @param {number} length The component token length.
     * @return {string} The formatting type.
     */
    function getType(length) {
        switch (length) {
            case 5:
                return 'narrow';
            case 4:
                return 'long';
            default:
                return 'short';
        }
    }
    /**
     * Get the minimum days.
     * @param {string} locale The locale.
     * @return {number} The minimum days.
     */
    function minimumDays(locale) {
        return getData(
            `minimumDays.${locale}`,
            (_) => {
                let minDays = 1;
                const localeTest = locale.toLowerCase().split('-');
                while (minDays === 1 && localeTest.length) {
                    for (const days in minDaysInFirstWeek) {
                        if (!{}.hasOwnProperty.call(minDaysInFirstWeek, days)) {
                            continue;
                        }

                        const locales = minDaysInFirstWeek[days];

                        if (locales.includes(localeTest.join('-'))) {
                            minDays = parseInt(days);
                            break;
                        }
                    }

                    localeTest.pop();
                }

                return minDays;
            },
        );
    }
    /**
     * Get the week start offset for a locale.
     * @param {string} [locale] The locale to load.
     * @return {number} The week start offset.
     */
    function weekStartOffset(locale) {
        return getData(
            `weekStartOffset.${locale}`,
            (_) => {
                let weekStarted;
                const localeTest = locale.toLowerCase().split('-');
                while (!weekStarted && localeTest.length) {
                    for (const start in weekStart) {
                        if (!{}.hasOwnProperty.call(weekStart, start)) {
                            continue;
                        }

                        const locales = weekStart[start];

                        if (locales.includes(localeTest.join('-'))) {
                            weekStarted = parseInt(start);
                            break;
                        }
                    }

                    localeTest.pop();
                }

                return weekStarted ?
                    weekStarted - 2 :
                    0;
            },
        );
    }
    /**
     * Convert a day of the week to a local format.
     * @param {string} locale The locale.
     * @param {number} day The day of the week.
     * @return {number} The local day of the week.
     */
    function weekDay(locale, day) {
        return (7 + parseInt(day) - weekStartOffset(locale)) % 7 || 7;
    }

    /**
     * Parse a day from a locale string.
     * @param {string} locale The locale.
     * @param {string} value The value to parse.
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the value is standalone.
     * @return {number} The day number (0-6).
     */
    function parseDay(locale, value, type = 'long', standalone = true) {
        const day = getDays(locale, type, standalone).indexOf(value) || 7;
        return weekDay(locale, day);
    }
    /**
     * Parse a day period from a locale string.
     * @param {string} locale The locale.
     * @param {string} value The value to parse.
     * @param {string} [type=long] The formatting type.
     * @return {number} The day period (0-1).
     */
    function parseDayPeriod(locale, value, type = 'long') {
        return getDayPeriods(locale, type).indexOf(value);
    }
    /**
     * Parse an era from a locale string.
     * @param {string} locale The locale.
     * @param {string} value The value to parse.
     * @param {string} [type=long] The formatting type.
     * @return {number} The era (0-1).
     */
    function parseEra(locale, value, type = 'long') {
        return getEras(locale, type).indexOf(value);
    }
    /**
     * Parse a month from a locale string.
     * @param {string} locale The locale.
     * @param {string} value The value to parse.
     * @param {string} [type=long] The formatting type.
     * @param {Boolean} [standalone=true] Whether the value is standalone.
     * @return {number} The month number (1-12).
     */
    function parseMonth(locale, value, type = 'long', standalone = true) {
        return getMonths(locale, type, standalone).indexOf(value) + 1;
    }
    /**
     * Parse a number from a locale number string.
     * @param {string} locale The locale.
     * @param {string} value The value to parse.
     * @return {number} The parsed number.
     */
    function parseNumber(locale, value) {
        const numbers = getNumbers(locale);
        return parseInt(
            `${value}`.replace(/./g, (match) => numbers.indexOf(match)),
        );
    }

    /**
     * DateFormatter Format Data
     */

    var tokens = {

        /* ERA */

        G: {
            key: 'era',
            maxLength: 5,
            regex: (locale, length) => {
                const type = getType(length);
                return getEras(locale, type).join('|');
            },
            input: (locale, value, length) => {
                const type = getType(length);
                return parseEra(locale, value, type);
            },
            output: (datetime, length) => {
                const type = getType(length);
                return datetime.era(type);
            },
        },

        /* YEAR */

        // year
        y: {
            key: 'year',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value, length) => {
                value = parseNumber(locale, value);

                if (length !== 2 || `${value}`.length !== 2) {
                    return value;
                }

                return value > 40 ?
                    1900 + value :
                    2000 + value;
            },
            output: (datetime, length) => {
                let year = datetime.getYear();
                if (length === 2) {
                    year = `${year}`.slice(-2);
                }
                return formatNumber(
                    datetime.getLocale(),
                    Math.abs(year),
                    length,
                );
            },
        },

        // week year
        Y: {
            key: 'weekYear',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value, length) => {
                value = parseNumber(locale, value);

                if (length !== 2 || `${value}`.length !== 2) {
                    return value;
                }

                return value > 40 ?
                    1900 + value :
                    2000 + value;
            },
            output: (datetime, length) => {
                let year = datetime.getWeekYear();
                if (length === 2) {
                    year = `${year}`.slice(-2);
                }
                return formatNumber(
                    datetime.getLocale(),
                    Math.abs(year),
                    length,
                );
            },
        },

        /* QUARTER */

        // quarter
        Q: {
            key: 'quarter',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getQuarter(),
                    length,
                ),
        },

        // quarter (standalone)
        q: {
            key: 'quarter',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getQuarter(),
                    length,
                ),
        },

        /* MONTH */

        // month
        M: {
            key: 'month',
            regex: (locale, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = getType(length);
                        return getMonths(locale, type, false).join('|');
                    default:
                        return numberRegExp(locale);
                }
            },
            input: (locale, value, length) => {
                switch (length) {
                    case 5:
                        return null;
                    case 4:
                    case 3:
                        const type = getType(length);
                        return parseMonth(locale, value, type, false);
                    default:
                        return parseNumber(locale, value);
                }
            },
            output: (datetime, length) => {
                const locale = datetime.getLocale();
                const month = datetime.getMonth();
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = getType(length);
                        return formatMonth(locale, month, type, false);
                    default:
                        return formatNumber(locale, month, length);
                }
            },
        },

        // month (standalone)
        L: {
            key: 'month',
            regex: (locale, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = getType(length);
                        return getMonths(locale, type).join('|');
                    default:
                        return numberRegExp(locale);
                }
            },
            input: (locale, value, length) => {
                switch (length) {
                    case 5:
                        return null;
                    case 4:
                    case 3:
                        const type = getType(length);
                        return parseMonth(locale, value, type);
                    default:
                        return parseNumber(locale, value);
                }
            },
            output: (datetime, length) => {
                const locale = datetime.getLocale();
                const month = datetime.getMonth();
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = getType(length);
                        return formatMonth(locale, month, type);
                    default:
                        return formatNumber(locale, month, length);
                }
            },
        },

        /* WEEK */

        // local week
        w: {
            key: 'week',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getWeek(),
                    length,
                ),
        },

        // local week of month
        W: {
            key: 'weekOfMonth',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getWeekOfMonth(),
                ),
        },

        /* DAY */

        // day of month
        d: {
            key: 'date',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getDate(),
                    length,
                ),
        },

        // day of year
        D: {
            key: 'dayOfYear',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getDayOfYear(),
                    length,
                ),
        },

        // day of week in month
        F: {
            key: 'weekDayInMonth',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getWeekDayInMonth(),
                ),
        },

        // week day name
        E: {
            key: 'weekDay',
            regex: (locale, length) => {
                const type = getType(length);
                return getDays(locale, type, false).join('|');
            },
            input: (locale, value, length) => {
                if (length === 5) {
                    return null;
                }

                const type = getType(length);
                return parseDay(locale, value, type, false);
            },
            output: (datetime, length) => {
                const type = getType(length);
                const locale = datetime.getLocale();
                const day = datetime.getDay();
                return formatDay(locale, day, type, false);
            },
        },

        // week day
        e: {
            key: 'weekDay',
            maxLength: 5,
            regex: (locale, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = getType(length);
                        return getDays(locale, type, false).join('|');
                    default:
                        return numberRegExp(locale);
                }
            },
            input: (locale, value, length) => {
                switch (length) {
                    case 5:
                        return null;
                    case 4:
                    case 3:
                        const type = getType(length);
                        return parseDay(locale, value, type, false);
                    default:
                        return parseNumber(locale, value);
                }
            },
            output: (datetime, length) => {
                const locale = datetime.getLocale();
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = getType(length);
                        const day = datetime.getDay();
                        return formatDay(locale, day, type, false);
                    default:
                        const weekDay = datetime.getWeekDay();
                        return formatNumber(locale, weekDay, length);
                }
            },
        },

        // week day (standalone)
        c: {
            key: 'weekDay',
            maxLength: 5,
            regex: (locale, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = getType(length);
                        return getDays(locale, type).join('|');
                    default:
                        return numberRegExp(locale);
                }
            },
            input: (locale, value, length) => {
                switch (length) {
                    case 5:
                        return null;
                    case 4:
                    case 3:
                        const type = getType(length);
                        return parseDay(locale, value, type);
                    default:
                        return parseNumber(locale, value);
                }
            },
            output: (datetime, length) => {
                const locale = datetime.getLocale();
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = getType(length);
                        const day = datetime.getDay();
                        return formatDay(locale, day, type);
                    default:
                        const weekDay = datetime.getWeekDay();
                        return formatNumber(locale, weekDay);
                }
            },
        },

        /* PERIOD */

        a: {
            key: 'dayPeriod',
            regex: (locale, length) => {
                const type = getType(length);
                return getDayPeriods(locale, type).join('|');
            },
            input: (locale, value, length) => {
                const type = getType(length);
                return parseDayPeriod(locale, value, type);
            },
            output: (datetime, length) => {
                const type = getType(length);
                return datetime.dayPeriod(type);
            },
        },

        /* HOUR */

        h: {
            key: 'hours12',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => {
                value = parseNumber(locale, value);
                if (value === 12) {
                    value = 0;
                }
                return value;
            },
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getHours() % 12 || 12,
                    length,
                ),
        },

        H: {
            key: 'hours24',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getHours(),
                    length,
                ),
        },

        K: {
            key: 'hours12',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getHours() % 12,
                    length,
                ),
        },

        k: {
            key: 'hours24',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => {
                value = parseNumber(locale, value);
                if (value === 24) {
                    value = 0;
                }
                return value;
            },
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getHours() || 24,
                    length,
                ),
        },

        /* MINUTE */

        m: {
            key: 'minutes',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getMinutes(),
                    length,
                ),
        },

        /* SECOND */

        s: {
            key: 'seconds',
            regex: (locale) => numberRegExp(locale),
            input: (locale, value) => parseNumber(locale, value),
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    datetime.getSeconds(),
                    length,
                ),
        },

        /* FRACTIONAL */

        S: {
            key: 'milliseconds',
            regex: (locale) => numberRegExp(locale),
            input: (_) => 0,
            output: (datetime, length) =>
                formatNumber(
                    datetime.getLocale(),
                    `${Math.floor(
                    datetime.getMilliseconds() *
                    1000,
                )}`.padEnd(length, '0').slice(0, length),
                ),
        },

        /* TIMEZONE/OFFSET */

        z: {
            output: (datetime, length) => {
                if (length === 5) {
                    length = 1;
                }
                const type = getType(length);
                return datetime.timeZoneName(type);
            },
        },

        Z: {
            key: 'timeZone',
            regex: (_, length) => {
                switch (length) {
                    case 5:
                        return `[\\+\\-]\\d{2}\\:\\d{2}|Z`;
                    case 4:
                        return `GMT[\\+\\-]\\d{2}\\:\\d{2}|GMT`;
                    default:
                        return `[\\+\\-]\\d{4}`;
                }
            },
            input: (_, value) => value,
            output: (datetime, length) => {
                const offset = datetime.getTimeZoneOffset();

                let useColon = true;
                let prefix = '';
                switch (length) {
                    case 5:
                        if (!offset) {
                            return 'Z';
                        }
                        break;
                    case 4:
                        prefix = 'GMT';

                        if (!offset) {
                            return prefix;
                        }

                        break;
                    default:
                        useColon = false;
                        break;
                }

                return prefix + formatOffset(offset, useColon);
            },
        },

        O: {
            key: 'timeZone',
            regex: (_, length) => {
                switch (length) {
                    case 4:
                        return `GMT[\\+\\-]\\d{2}\\:\\d{2}|GMT`;
                    default:
                        return `GMT[\\+\\-]\\d{2}|GMT`;
                }
            },
            input: (_, value) => value,
            output: (datetime, length) => {
                const offset = datetime.getTimeZoneOffset();
                const prefix = 'GMT';

                if (!offset) {
                    return prefix;
                }

                let optionalMinutes = false;
                switch (length) {
                    case 4:
                        break;
                    default:
                        optionalMinutes = true;
                }

                return prefix + formatOffset(offset, true, optionalMinutes);
            },
        },

        V: {
            key: 'timeZone',
            regex: (_) => '([a-zA-Z_\/]+)',
            input: (_, value) => value,
            output: (datetime) => datetime.getTimeZone(),
        },

        X: {
            key: 'timeZone',
            regex: (_, length) => {
                switch (length) {
                    case 5:
                    case 3:
                        return `[\\+\\-]\\d{2}\\:\\d{2}|Z`;
                    case 4:
                    case 2:
                        return `[\\+\\-]\\d{4}|Z`;
                    default:
                        return `[\\+\\-]\\d{2}(?:\\d{2})?|Z`;
                }
            },
            input: (_, value) => value,
            output: (datetime, length) => {
                const offset = datetime.getTimeZoneOffset();

                if (!offset) {
                    return 'Z';
                }

                let useColon;
                switch (length) {
                    case 5:
                    case 3:
                        useColon = true;
                        break;
                    default:
                        useColon = false;
                        break;
                }

                return formatOffset(offset, useColon, length === 1);
            },
        },

        x: {
            key: 'timeZone',
            regex: (_, length) => {
                switch (length) {
                    case 5:
                    case 3:
                        return `[\\+\\-]\\d{2}\\:\\d{2}`;
                    case 4:
                    case 2:
                        return `[\\+\\-]\\d{4}`;
                    default:
                        return `[\\+\\-]\\d{2}(?:\\d{2})?`;
                }
            },
            input: (_, value) => value,
            output: (datetime, length) => {
                let useColon;
                switch (length) {
                    case 5:
                    case 3:
                        useColon = true;
                        break;
                    default:
                        useColon = false;
                        break;
                }

                return formatOffset(datetime.getTimeZoneOffset(), useColon, length === 1);
            },
        },

    };

    /**
     * DateTime (Static) Creation
     */

    /**
     * Create a new DateTime from an array.
     * @param {number[]} dateArray The date to parse.
     * @param {object} [options] Options for the new DateTime.
     * @param {string} [options.timeZone] The timeZone to use.
     * @param {string} [options.locale] The locale to use.
     * @return {DateTime} A new DateTime object.
     */
    function fromArray(dateArray, options = {}) {
        const dateValues = dateArray.slice(0, 3);
        const timeValues = dateArray.slice(3);

        if (dateValues.length < 3) {
            dateValues.push(...new Array(3 - dateValues.length).fill(1));
        }

        if (timeValues.length < 4) {
            timeValues.push(...new Array(4 - timeValues.length).fill(0));
        }

        return new DateTime(null, options)
            .setTimestamp(0)
            .setYear(...dateValues)
            .setHours(...timeValues);
    }
    /**
     * Create a new DateTime from a Date.
     * @param {Date} date The date.
     * @param {object} [options] Options for the new DateTime.
     * @param {string} [options.timeZone] The timeZone to use.
     * @param {string} [options.locale] The locale to use.
     * @return {DateTime} A new DateTime object.
     */
    function fromDate(date, options = {}) {
        return new DateTime(date.getTime(), options);
    }
    /**
     * Create a new DateTime from a format string.
     * @param {string} formatString The format string.
     * @param {string} dateString The date string.
     * @param {object} [options] Options for the new DateTime.
     * @param {string} [options.timeZone] The timeZone to use.
     * @param {string} [options.locale] The locale to use.
     * @return {DateTime} A new DateTime object.
     */
    function fromFormat(formatString, dateString, options = {}) {
        if (!('locale' in options)) {
            options.locale = config.defaultLocale;
        }

        const values = [];

        let match;
        while (formatString && (match = formatString.match(formatTokenRegExp))) {
            const token = match[1];
            const position = match.index;
            const length = match[0].length;

            if (position) {
                const formatTest = formatString.substring(0, position);
                parseCompare(formatTest, dateString);
            }

            formatString = formatString.substring(position + length);
            dateString = dateString.substring(position);

            if (!token) {
                const literal = match[0].slice(1, -1);
                parseCompare(literal || `'`, dateString);
                dateString = dateString.substring(literal.length);
                continue;
            }

            if (!(token in tokens)) {
                throw new Error(`Invalid token in DateTime format: ${token}`);
            }

            const regExp = tokens[token].regex(options.locale, length);
            const matchedValue = dateString.match(new RegExp(`^${regExp}`));

            if (!matchedValue) {
                throw new Error(`Unmatched token in DateTime string: ${token}`);
            }

            const literal = matchedValue[0];
            const value = tokens[token].input(options.locale, literal, length);

            if (value !== null) {
                const key = tokens[token].key;
                values.push({ key, value, literal, token, length });
            }

            dateString = dateString.substring(literal.length);
        }

        if (formatString) {
            parseCompare(formatString, dateString);
        }

        if (!('timeZone' in options)) {
            options.timeZone = config.defaultTimeZone;
        }

        let timeZone = options.timeZone;
        for (const { key, value } of values) {
            if (key !== 'timeZone') {
                continue;
            }

            timeZone = value;
        }

        let datetime = this.fromTimestamp(0, {
            locale: options.locale,
        }).setYear(1).setTimeZone(timeZone);

        const methods = parseFactory();

        const testValues = [];

        for (const subKeys of parseOrderKeys) {
            for (const subKey of subKeys) {
                if (subKey === 'era' && !values.find((data) => data.key === 'year')) {
                    continue;
                }

                for (const data of values) {
                    const { key, value, literal, token, length } = data;

                    if (key !== subKey) {
                        continue;
                    }

                    // skip narrow month and day names if output already matches
                    if (length === 5 && ['M', 'L', 'E', 'e', 'c'].includes(token)) {
                        const fullToken = token.repeat(length);
                        if (datetime.format(fullToken) === literal) {
                            continue;
                        }
                    }

                    datetime = methods[key].set(datetime, value);
                    testValues.push(data);
                }
            }
        }

        let isValid = true;
        for (const { key, value } of testValues) {
            if (key in methods && methods[key].get(datetime) !== value) {
                isValid = false;
                break;
            }
        }

        if (options.timeZone !== timeZone) {
            datetime = datetime.setTimeZone(options.timeZone);
        }

        datetime.isValid = isValid;

        return datetime;
    }
    /**
     * Create a new DateTime from an ISO format string.
     * @param {string} dateString The date string.
     * @param {object} [options] Options for the new DateTime.
     * @param {string} [options.timeZone] The timeZone to use.
     * @param {string} [options.locale] The locale to use.
     * @return {DateTime} A new DateTime object.
     */
    function fromISOString(dateString, options = {}) {
        let date = this.fromFormat(formats.rfc3339_extended, dateString, {
            locale: 'en',
        });

        if ('timeZone' in options) {
            date = date.setTimeZone(options.timeZone);
        }

        if ('locale' in options) {
            date = date.setLocale(options.locale);
        }

        return date;
    }
    /**
     * Create a new DateTime from a timestamp.
     * @param {number} timestamp The timestamp.
     * @param {object} [options] Options for the new DateTime.
     * @param {string} [options.timeZone] The timeZone to use.
     * @param {string} [options.locale] The locale to use.
     * @return {DateTime} A new DateTime object.
     */
    function fromTimestamp(timestamp, options = {}) {
        return new DateTime(null, options)
            .setTimestamp(timestamp);
    }
    /**
     * Create a new DateTime for the current time.
     * @param {object} [options] Options for the new DateTime.
     * @param {string} [options.timeZone] The timeZone to use.
     * @param {string} [options.locale] The locale to use.
     * @return {DateTime} A new DateTime object.
     */
    function now(options = {}) {
        return new DateTime(null, options);
    }

    /**
     * DateTime (Static) Utility
     */

    /**
     * Get the day of the year for a year, month and date.
     * @param {number} year The year.
     * @param {number} month The month. (1, 12)
     * @param {number} date The date.
     * @return {number} The day of the year. (1, 366)
     */
    function dayOfYear(year, month, date) {
        return new Array(month - 1)
            .fill()
            .reduce(
                (d, _, i) =>
                    d + daysInMonth$1(year, i + 1),
                date,
            );
    }
    /**
     * Get the number of days in a month, from a year and month.
     * @param {number} year The year.
     * @param {number} month The month. (1, 12)
     * @return {number} The number of days in the month.
     */
    function daysInMonth$1(year, month) {
        const date = new Date(Date.UTC(year, month - 1));
        month = date.getUTCMonth();

        return monthDays[month] +
            (
                month == 1 && isLeapYear$1(
                    date.getUTCFullYear(),
                ) ?
                    1 :
                    0
            );
    }
    /**
     * Get the number of days in a year.
     * @param {number} year The year.
     * @return {number} The number of days in the year.
     */
    function daysInYear$1(year) {
        return !isLeapYear$1(year) ?
            365 :
            366;
    }
    /**
     * Get the default locale.
     * @return {string} The locale.
     */
    function getDefaultLocale() {
        return config.defaultLocale;
    }
    /**
     * Get the default timeZone.
     * @return {string} The name of the timeZone.
     */
    function getDefaultTimeZone() {
        return config.defaultTimeZone;
    }
    /**
     * Return true if a year is a leap year.
     * @param {number} year The year.
     * @return {Boolean} TRUE if the year is a leap year, otherwise FALSE.
     */
    function isLeapYear$1(year) {
        return new Date(year, 1, 29)
            .getDate() === 29;
    }
    /**
     * Set whether dates will be clamped when changing months.
     * @param {Boolean} clampDates Whether to clamp dates.
     */
    function setDateClamping(clampDates) {
        config.clampDates = clampDates;
    }
    /**
     * Set the default locale.
     * @param {string} locale The locale.
     */
    function setDefaultLocale(locale) {
        config.defaultLocale = locale;
    }
    /**
     * Set the default timeZone.
     * @param {string} timeZone The name of the timeZone.
     */
    function setDefaultTimeZone(timeZone) {
        config.defaultTimeZone = timeZone;
    }

    /**
     * DateTime Attributes (Get)
     */

    /**
     * Get the date of the month in current timeZone.
     * @return {number} The date of the month.
     */
    function getDate() {
        return new Date(getOffsetTime(this)).getUTCDate();
    }
    /**
     * Get the day of the week in current timeZone.
     * @return {number} The day of the week. (0 - Sunday, 6 - Saturday)
     */
    function getDay() {
        return new Date(getOffsetTime(this)).getUTCDay();
    }
    /**
     * Get the day of the year in current timeZone.
     * @return {number} The day of the year. (1, 366)
     */
    function getDayOfYear() {
        return dayOfYear(
            this.getYear(),
            this.getMonth(),
            this.getDate(),
        );
    }
    /**
     * Get the hours of the day in current timeZone.
     * @return {number} The hours of the day. (0, 23)
     */
    function getHours() {
        return new Date(getOffsetTime(this)).getUTCHours();
    }
    /**
     * Get the milliseconds in current timeZone.
     * @return {number} The milliseconds.
     */
    function getMilliseconds() {
        return new Date(getOffsetTime(this)).getUTCMilliseconds();
    }
    /**
     * Get the minutes in current timeZone.
     * @return {number} The minutes. (0, 59)
     */
    function getMinutes() {
        return new Date(getOffsetTime(this)).getUTCMinutes();
    }
    /**
     * Get the month in current timeZone.
     * @return {number} The month. (1, 12)
     */
    function getMonth() {
        return new Date(getOffsetTime(this)).getUTCMonth() + 1;
    }
    /**
     * Get the quarter of the year in current timeZone.
     * @return {number} The quarter of the year. (1, 4)
     */
    function getQuarter() {
        return Math.ceil(this.getMonth() / 3);
    }
    /**
     * Get the seconds in current timeZone.
     * @return {number} The seconds. (0, 59)
     */
    function getSeconds() {
        return new Date(getOffsetTime(this)).getUTCSeconds();
    }
    /**
     * Get the number of seconds since the UNIX epoch.
     * @return {number} The number of seconds since the UNIX epoch.
     */
    function getTimestamp() {
        return Math.floor(this.getTime() / 1000);
    }
    /**
     * Get the local week in current timeZone.
     * @return {number} The local week. (1, 53)
     */
    function getWeek() {
        const thisWeek = this.startOf('day').setWeekDay(1);
        const firstWeek = thisWeek.setWeek(1, 1);

        return 1 +
            (
                (
                    (thisWeek - firstWeek) /
                    604800000
                ) | 0
            );
    }
    /**
     * Get the local day of the week in current timeZone.
     * @return {number} The local day of the week. (1 - 7)
     */
    function getWeekDay() {
        return weekDay(
            this.getLocale(),
            this.getDay(),
        );
    }
    /**
     * Get the week day in month in current timeZone.
     * @return {number} The week day in month.
     */
    function getWeekDayInMonth() {
        const thisWeek = this.getWeek();
        const first = this.setDate(1);
        const firstWeek = first.getWeek();
        const offset = first.getWeekDay() > this.getWeekDay() ?
            0 : 1;
        return firstWeek > thisWeek ?
            thisWeek + offset :
            thisWeek - firstWeek + offset;
    }
    /**
     * Get the week of month in current timeZone.
     * @return {number} The week of month.
     */
    function getWeekOfMonth() {
        const thisWeek = this.getWeek();
        const firstWeek = this.setDate(1).getWeek();
        return firstWeek > thisWeek ?
            thisWeek + 1 :
            thisWeek - firstWeek + 1;
    }
    /**
     * Get the week year in current timeZone.
     * @return {number} The week year.
     */
    function getWeekYear() {
        const minDays = minimumDays(this.getLocale());
        return this.setWeekDay(7 - minDays + 1).getYear();
    }
    /**
     * Get the year in current timeZone.
     * @return {number} The year.
     */
    function getYear() {
        return new Date(getOffsetTime(this)).getUTCFullYear();
    }

    /**
     * DateTime Attributes (Set)
     */

    /**
     * Set the date of the month in current timeZone.
     * @param {number} date The date of the month.
     * @return {DateTime} The DateTime object.
     */
    function setDate(date) {
        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCDate(date),
        );
    }
    /**
     * Set the day of the week in current timeZone.
     * @param {number} day The day of the week. (0 - Sunday, 6 - Saturday)
     * @return {DateTime} The DateTime object.
     */
    function setDay(day) {
        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCDate(
                this.getDate() -
                this.getDay() +
                parseInt(day),
            ),
        );
    }
    /**
     * Set the day of the year in current timeZone.
     * @param {number} day The day of the year. (1, 366)
     * @return {DateTime} The DateTime object.
     */
    function setDayOfYear(day) {
        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCMonth(
                0,
                day,
            ),
        );
    }
    /**
     * Set the hours in current timeZone (and optionally, minutes, seconds and milliseconds).
     * @param {number} hours The hours. (0, 23)
     * @param {number} [minutes] The minutes. (0, 59)
     * @param {number} [seconds] The seconds. (0, 59)
     * @param {number} [milliseconds] The milliseconds.
     * @return {DateTime} The DateTime object.
     */
    function setHours(...args) {
        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCHours(...args),
        );
    }
    /**
     * Set the milliseconds in current timeZone.
     * @param {number} milliseconds The milliseconds.
     * @return {DateTime} The DateTime object.
     */
    function setMilliseconds(milliseconds) {
        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCMilliseconds(milliseconds),
        );
    }
    /**
     * Set the minutes in current timeZone (and optionally, seconds and milliseconds).
     * @param {number} minutes The minutes. (0, 59)
     * @param {number} [seconds] The seconds. (0, 59)
     * @param {number} [milliseconds] The milliseconds.
     * @return {DateTime} The DateTime object.
     */
    function setMinutes(...args) {
        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCMinutes(...args),
        );
    }
    /**
     * Set the month in current timeZone (and optionally, date).
     * @param {number} month The month. (1, 12)
     * @param {number|null} [date] The date of the month.
     * @return {DateTime} The DateTime object.
     */
    function setMonth(month, date = null) {
        if (date === null) {
            date = this.getDate();

            if (config.clampDates) {
                date = Math.min(
                    date,
                    daysInMonth$1(
                        this.getYear(),
                        month,
                    ),
                );
            }
        }

        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCMonth(
                month - 1,
                date,
            ),
        );
    }
    /**
     * Set the quarter of the year in current timeZone.
     * @param {number} quarter The quarter of the year. (1, 4)
     * @return {DateTime} The DateTime object.
     */
    function setQuarter(quarter) {
        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCMonth(
                quarter * 3 -
                3,
            ),
        );
    }
    /**
     * Set the seconds in current timeZone (and optionally, milliseconds).
     * @param {number} seconds The seconds. (0, 59)
     * @param {number} [milliseconds] The milliseconds.
     * @return {DateTime} The DateTime object.
     */
    function setSeconds(...args) {
        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCSeconds(...args),
        );
    }
    /**
     * Set the number of seconds since the UNIX epoch.
     * @param {number} timestamp The number of seconds since the UNIX epoch.
     * @return {DateTime} The DateTime object.
     */
    function setTimestamp(timestamp) {
        return this.setTime(timestamp * 1000);
    }
    /**
     * Set the local day of the week in current timeZone (and optionally, day of the week).
     * @param {number} week The local week.
     * @param {number|null} [day] The local day of the week. (1 - 7)
     * @return {DateTime} The DateTime object.
     */
    function setWeek(week, day = null) {
        if (day === null) {
            day = this.getWeekDay();
        }

        const minDays = minimumDays(this.getLocale());
        return this.setYear(this.getWeekYear(), 1, minDays + ((week - 1) * 7)).setWeekDay(day);
    }
    /**
     * Set the local day of the week in current timeZone.
     * @param {number} day The local day of the week. (1 - 7)
     * @return {DateTime} The DateTime object.
     */
    function setWeekDay(day) {
        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCDate(
                this.getDate() -
                this.getWeekDay() +
                parseInt(day),
            ),
        );
    }
    /**
     * Set the week day in month in current timeZone.
     * @param {number} week The week day in month.
     * @return {DateTime} The DateTime object.
     */
    function setWeekDayInMonth(week) {
        return this.setDate(
            this.getDate() +
            (
                week -
                this.getWeekDayInMonth()
            ) * 7,
        );
    }
    /**
     * Set the week of month in current timeZone.
     * @param {number} week The week of month.
     * @return {DateTime} The DateTime object.
     */
    function setWeekOfMonth(week) {
        return this.setDate(
            this.getDate() +
            (
                week -
                this.getWeekOfMonth()
            ) * 7,
        );
    }
    /**
     * Set the local day of the week in current timeZone (and optionally, week and day of the week).
     * @param {number} year The local year.
     * @param {number|null} [week] The local week.
     * @param {number|null} [day] The local day of the week. (1 - 7)
     * @return {DateTime} The DateTime object.
     */
    function setWeekYear(year, week = null, day = null) {
        const minDays = minimumDays(this.getLocale());

        if (week === null) {
            week = Math.min(
                this.getWeek(),
                DateTime.fromArray([year, 1, minDays]).weeksInYear(),
            );
        }

        if (day === null) {
            day = this.getWeekDay();
        }

        return this.setYear(year, 1, minDays + ((week - 1) * 7)).setWeekDay(day);
    }
    /**
     * Set the year in current timeZone (and optionally, month and date).
     * @param {number} year The year.
     * @param {number|null} [month] The month. (1, 12)
     * @param {number|null} [date] The date of the month.
     * @return {DateTime} The DateTime object.
     */
    function setYear(year, month = null, date = null) {
        if (month === null) {
            month = this.getMonth();
        }

        if (date === null) {
            date = this.getDate();

            if (config.clampDates) {
                date = Math.min(
                    date,
                    daysInMonth$1(
                        this.getYear(),
                        month,
                    ),
                );
            }
        }

        return setOffsetTime(
            this,
            new Date(getOffsetTime(this)).setUTCFullYear(
                year,
                month - 1,
                date,
            ),
        );
    }

    /**
     * DateTime Manipulation
     */

    /**
     * Add a duration to the date.
     * @param {number} amount The amount to modify the date by.
     * @param {string} timeUnit The unit of time.
     * @return {DateTime} The DateTime object.
     */
    function add(amount, timeUnit) {
        return modify(this, amount, timeUnit);
    }
    /**
     * Modify the DateTime by setting it to the end of a unit of time.
     * @param {string} timeUnit The unit of time.
     * @return {DateTime} The DateTime object.
     */
    function endOf(timeUnit) {
        timeUnit = timeUnit.toLowerCase();

        switch (timeUnit) {
            case 'second':
                return this.setMilliseconds(999);
            case 'minute':
                return this.setSeconds(59, 999);
            case 'hour':
                return this.setMinutes(59, 59, 999);
            case 'day':
                return this.setHours(23, 59, 59, 999);
            case 'week':
                return this.setWeekDay(7)
                    .setHours(23, 59, 59, 999);
            case 'month':
                return this.setDate(this.daysInMonth())
                    .setHours(23, 59, 59, 999);
            case 'quarter':
                const month = this.getQuarter() * 3;
                return this.setMonth(month, daysInMonth$1(this.getYear(), month))
                    .setHours(23, 59, 59, 999);
            case 'year':
                return this.setMonth(12, 31)
                    .setHours(23, 59, 59, 999);
            default:
                throw new Error('Invalid time unit supplied');
        }
    }
    /**
     * Modify the DateTime by setting it to the start of a unit of time.
     * @param {string} timeUnit The unit of time.
     * @return {DateTime} The DateTime object.
     */
    function startOf(timeUnit) {
        timeUnit = timeUnit.toLowerCase();

        switch (timeUnit) {
            case 'second':
                return this.setMilliseconds(0);
            case 'minute':
                return this.setSeconds(0, 0);
            case 'hour':
                return this.setMinutes(0, 0, 0);
            case 'day':
                return this.setHours(0, 0, 0, 0);
            case 'week':
                return this.setWeekDay(1)
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
    }
    /**
     * Subtract a duration from the date.
     * @param {number} amount The amount to modify the date by.
     * @param {string} timeUnit The unit of time.
     * @return {DateTime} The DateTime object.
     */
    function sub(amount, timeUnit) {
        return modify(this, -amount, timeUnit);
    }

    /**
     * DateTime Output
     */

    /**
     * Format the current date using a format string.
     * @param {string} formatString The format string.
     * @return {string} The formatted date string.
     */
    function format(formatString) {
        let match;
        let output = '';

        while (formatString && (match = formatString.match(formatTokenRegExp))) {
            const token = match[1];
            const position = match.index;
            const length = match[0].length;

            if (position) {
                output += formatString.substring(0, position);
            }

            formatString = formatString.substring(position + length);

            if (!token) {
                output += match[0].slice(1, -1);
                continue;
            }

            if (!(token in tokens)) {
                throw new Error(`Invalid token in DateTime format: ${token}`);
            }

            output += tokens[token].output(this, length);
        }

        output += formatString;

        return output;
    }
    /**
     * Format the current date using "eee MMM dd yyyy".
     * @return {string} The formatted date string.
     */
    function toDateString() {
        return this.format(formats.date);
    }
    /**
     * Format the current date using "yyyy-MM-dd'THH:mm:ss.SSSSSSxxx".
     * @return {string} The formatted date string.
     */
    function toISOString() {
        return this
            .setLocale('en')
            .setTimeZone('UTC')
            .format(formats.rfc3339_extended);
    }
    /**
     * Format the current date using "eee MMM dd yyyy HH:mm:ss xx (VV)".
     * @return {string} The formatted date string.
     */
    function toString() {
        return this.format(formats.string);
    }
    /**
     * Format the current date using "HH:mm:ss xx (VV)".
     * @return {string} The formatted date string.
     */
    function toTimeString() {
        return this.format(formats.time);
    }
    /**
     * Format the current date in UTC timeZone using "eee MMM dd yyyy HH:mm:ss xx (VV)".
     * @return {string} The formatted date string.
     */
    function toUTCString() {
        return this
            .setLocale('en')
            .setTimeZone('UTC')
            .toString();
    }

    /**
     * DateTime Utility
     */

    /**
     * Get the name of the day of the week in current timeZone.
     * @param {string} [type=long] The type of day name to return.
     * @return {string} The name of the day of the week.
     */
    function dayName(type = 'long') {
        return formatDay(this.getLocale(), this.getDay(), type);
    }
    /**
     * Get the day period in current timeZone.
     * @param {string} [type=long] The type of day period to return.
     * @return {string} The day period.
     */
    function dayPeriod(type = 'long') {
        return formatDayPeriod(
            this.getLocale(),
            this.getHours() < 12 ?
                0 :
                1,
            type,
        );
    }
    /**
     * Get the number of days in the current month.
     * @return {number} The number of days in the current month.
     */
    function daysInMonth() {
        return daysInMonth$1(
            this.getYear(),
            this.getMonth(),
        );
    }
    /**
     * Get the number of days in the current year.
     * @return {number} The number of days in the current year.
     */
    function daysInYear() {
        return daysInYear$1(
            this.getYear(),
        );
    }
    /**
     * Get the difference between this and another Date.
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [timeUnit] The unit of time.
     * @param {Boolean} [relative=true] Whether to use the relative difference.
     * @return {number} The difference.
     */
    function diff(other, timeUnit, relative = true) {
        if (!other) {
            other = new this.constructor;
        }

        if (!timeUnit) {
            return this - other;
        }

        if (timeUnit) {
            timeUnit = timeUnit.toLowerCase();
        }

        other = other.setTimeZone(this.getTimeZone());

        switch (timeUnit) {
            case 'year':
            case 'years':
                const yearDiff = this.getYear() - other.getYear();
                return compensateDiff(
                    this,
                    other.setYear(
                        this.getYear(),
                    ),
                    yearDiff,
                    !relative,
                    -1,
                );
            case 'month':
            case 'months':
                const monthDiff = (this.getYear() - other.getYear()) *
                    12 +
                    this.getMonth() -
                    other.getMonth();
                return compensateDiff(
                    this,
                    other.setYear(
                        this.getYear(),
                        this.getMonth(),
                    ),
                    monthDiff,
                    !relative,
                    -1,
                );
            case 'week':
            case 'weeks':
                const weekDiff = (this - other) / 604800000;
                return compensateDiff(
                    this,
                    other.setWeekYear(
                        this.getWeekYear(),
                        this.getWeek(),
                    ),
                    weekDiff,
                    relative,
                );
            case 'day':
            case 'days':
                const dayDiff = (this - other) / 86400000;
                return compensateDiff(
                    this,
                    other.setYear(
                        this.getYear(),
                        this.getMonth(),
                        this.getDate(),
                    ),
                    dayDiff,
                    relative,
                );
            case 'hour':
            case 'hours':
                const hourDiff = (this - other) / 3600000;
                return compensateDiff(
                    this,
                    other.setYear(
                        this.getYear(),
                        this.getMonth(),
                        this.getDate(),
                    ).setHours(
                        this.getHours(),
                    ),
                    hourDiff,
                    relative,
                );
            case 'minute':
            case 'minutes':
                const minuteDiff = (this - other) / 60000;
                return compensateDiff(
                    this,
                    other.setYear(
                        this.getYear(),
                        this.getMonth(),
                        this.getDate(),
                    ).setHours(
                        this.getHours(),
                        this.getMinutes(),
                    ),
                    minuteDiff,
                    relative,
                );
            case 'second':
            case 'seconds':
                const secondDiff = (this - other) / 1000;
                return compensateDiff(
                    this,
                    other.setYear(
                        this.getYear(),
                        this.getMonth(),
                        this.getDate(),
                    ).setHours(
                        this.getHours(),
                        this.getMinutes(),
                        this.getSeconds(),
                    ),
                    secondDiff,
                    relative,
                );
            default:
                throw new Error('Invalid time unit supplied');
        }
    }
    /**
     * Get the era in current timeZone.
     * @param {string} [type=long] The type of era to return.
     * @return {string} The era.
     */
    function era(type = 'long') {
        return formatEra(
            this.getLocale(),
            this.getYear() < 0 ?
                0 :
                1,
            type,
        );
    }
    /**
     * Get the difference between this and another Date in human readable form.
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [timeUnit] The unit of time.
     * @return {string} The difference in human readable form.
     */
    function humanDiff(other, timeUnit) {
        const relativeFormatter = getRelativeFormatter(this.getLocale());

        if (!relativeFormatter) {
            throw new Error('RelativeTimeFormat not supported');
        }

        if (!other) {
            other = new this.constructor;
        }

        let amount;
        if (timeUnit) {
            amount = this.diff(other, timeUnit);
        } else {
            [amount, timeUnit] = getBiggestDiff(this, other);
        }

        return relativeFormatter.format(amount, timeUnit);
    }
    /**
     * Determine whether this DateTime is after another date (optionally to a granularity).
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @return {Boolean} TRUE if this DateTime is after the other date, otherwise FALSE.
     */
    function isAfter(other, granularity) {
        return this.diff(other, granularity) > 0;
    }
    /**
     * Determine whether this DateTime is before another date (optionally to a granularity).
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @return {Boolean} TRUE if this DateTime is before the other date, otherwise FALSE.
     */
    function isBefore(other, granularity) {
        return this.diff(other, granularity) < 0;
    }
    /**
     * Determine whether this DateTime is between two other dates (optionally to a granularity).
     * @param {DateTime} [start] The first date to compare to.
     * @param {DateTime} [end] The second date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @return {Boolean} TRUE if this DateTime is between the other dates, otherwise FALSE.
     */
    function isBetween(start, end, granularity) {
        return this.diff(start, granularity) > 0 && this.diff(end, granularity) < 0;
    }
    /**
     * Return true if the DateTime is in daylight savings.
     * @return {Boolean} TRUE if the current time is in daylight savings, otherwise FALSE.
     */
    function isDST() {
        if (!this._dynamicTz) {
            return false;
        }

        const year = this.getYear();
        const dateA = DateTime.fromArray([year, 1, 1], {
            timeZone: this.getTimeZone(),
        });
        const dateB = DateTime.fromArray([year, 6, 1], {
            timeZone: this.getTimeZone(),
        });

        return this.getTimeZoneOffset() < Math.max(dateA.getTimeZoneOffset(), dateB.getTimeZoneOffset());
    }
    /**
     * Return true if the year is a leap year.
     * @return {Boolean} TRUE if the current year is a leap year, otherwise FALSE.
     */
    function isLeapYear() {
        return isLeapYear$1(
            this.getYear(),
        );
    }
    /**
     * Determine whether this DateTime is the same as another date (optionally to a granularity).
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @return {Boolean} TRUE if this DateTime is the same as the other date, otherwise FALSE.
     */
    function isSame(other, granularity) {
        return this.diff(other, granularity) === 0;
    }
    /**
     * Determine whether this DateTime is the same or after another date (optionally to a granularity).
     * @param {DateTime} [other] The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @return {Boolean} TRUE if this DateTime is the same or after the other date, otherwise FALSE.
     */
    function isSameOrAfter(other, granularity) {
        return this.diff(other, granularity) >= 0;
    }
    /**
     * Determine whether this DateTime is the same or before another date.
     * @param {DateTime} other The date to compare to.
     * @param {string} [granularity] The level of granularity to use for comparison.
     * @return {Boolean} TRUE if this DateTime is the same or before the other date, otherwise FALSE.
     */
    function isSameOrBefore(other, granularity) {
        return this.diff(other, granularity) <= 0;
    }
    /**
     * Get the name of the month in current timeZone.
     * @param {string} [type=long] The type of month name to return.
     * @return {string} The name of the month.
     */
    function monthName(type = 'long') {
        return formatMonth(this.getLocale(), this.getMonth(), type);
    }
    /**
     * Get the name of the current timeZone.
     * @param {string} [type=long] The formatting type.
     * @return {string} The name of the time zone.
     */
    function timeZoneName(type = 'long') {
        return this._dynamicTz ?
            formatTimeZoneName(this.getLocale(), this.getTime(), this.getTimeZone(), type) :
            'GMT' + formatOffset(this.getTimeZoneOffset(), true, type === 'short');
    }
    /**
     * Get the number of weeks in the current year.
     * @return {number} The number of weeks in the current year.
     */
    function weeksInYear() {
        const minDays = minimumDays(this.getLocale());
        return this.setMonth(12, 24 + minDays).getWeek();
    }

    DateTime.dayOfYear = dayOfYear;
    DateTime.daysInMonth = daysInMonth$1;
    DateTime.daysInYear = daysInYear$1;
    DateTime.fromArray = fromArray;
    DateTime.fromDate = fromDate;
    DateTime.fromFormat = fromFormat;
    DateTime.fromISOString = fromISOString;
    DateTime.fromTimestamp = fromTimestamp;
    DateTime.getDefaultLocale = getDefaultLocale;
    DateTime.getDefaultTimeZone = getDefaultTimeZone;
    DateTime.isLeapYear = isLeapYear$1;
    DateTime.now = now;
    DateTime.setDateClamping = setDateClamping;
    DateTime.setDefaultLocale = setDefaultLocale;
    DateTime.setDefaultTimeZone = setDefaultTimeZone;

    const proto = DateTime.prototype;

    proto.add = add;
    proto.dayName = dayName;
    proto.dayPeriod = dayPeriod;
    proto.daysInMonth = daysInMonth;
    proto.daysInYear = daysInYear;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.era = era;
    proto.format = format;
    proto.getDate = getDate;
    proto.getDay = getDay;
    proto.getDayOfYear = getDayOfYear;
    proto.getHours = getHours;
    proto.getMilliseconds = getMilliseconds;
    proto.getMinutes = getMinutes;
    proto.getMonth = getMonth;
    proto.getQuarter = getQuarter;
    proto.getSeconds = getSeconds;
    proto.getTimestamp = getTimestamp;
    proto.getWeek = getWeek;
    proto.getWeekDay = getWeekDay;
    proto.getWeekDayInMonth = getWeekDayInMonth;
    proto.getWeekOfMonth = getWeekOfMonth;
    proto.getWeekYear = getWeekYear;
    proto.getYear = getYear;
    proto.humanDiff = humanDiff;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isDST = isDST;
    proto.isLeapYear = isLeapYear;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.monthName = monthName;
    proto.setDate = setDate;
    proto.setDay = setDay;
    proto.setDayOfYear = setDayOfYear;
    proto.setHours = setHours;
    proto.setMilliseconds = setMilliseconds;
    proto.setMinutes = setMinutes;
    proto.setMonth = setMonth;
    proto.setQuarter = setQuarter;
    proto.setSeconds = setSeconds;
    proto.setTimestamp = setTimestamp;
    proto.setWeek = setWeek;
    proto.setWeekDay = setWeekDay;
    proto.setWeekDayInMonth = setWeekDayInMonth;
    proto.setWeekOfMonth = setWeekOfMonth;
    proto.setWeekYear = setWeekYear;
    proto.setYear = setYear;
    proto.startOf = startOf;
    proto.sub = sub;
    proto.timeZoneName = timeZoneName;
    proto.toDateString = toDateString;
    proto.toISOString = toISOString;
    proto.toString = toString;
    proto.toTimeString = toTimeString;
    proto.toUTCString = toUTCString;
    proto.weeksInYear = weeksInYear;

    return DateTime;

}));
//# sourceMappingURL=frost-datetime.js.map

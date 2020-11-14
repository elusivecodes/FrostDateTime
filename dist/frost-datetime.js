/**
 * FrostDateTime v3.0.0
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
     * DateFormatter class
     * @class
     */
    class DateFormatter {

        /**
         * New DateFormatter constructor.
         * @param {string} [locale] The locale to load.
         * @returns {DateFormatter} A new DateFormatter object.
         */
        constructor(locale) {
            this.locale = locale;
            this._weekStartOffset = this.constructor.getWeekStartOffset(this.locale);
            this._data = {};
        }

        /**
         * Format a day as a locale string.
         * @param {number} number The day to format (0-6).
         * @param {string} [type=long] The formatting type.
         * @param {Boolean} [standalone=true] Whether the value is standalone.
         * @returns {string} The formatted string.
         */
        formatDay(day, type = 'long', standalone = true) {
            return this.getDays(type, standalone)[day];
        }

        /**
         * Format a day period as a locale string.
         * @param {number} number The period to format (0-1).
         * @param {string} [type=long] The formatting type.
         * @returns {string} The formatted string.
         */
        formatDayPeriod(period, type = 'long') {
            return this.getDayPeriods(type)[period];
        }

        /**
         * Format an era as a locale string.
         * @param {number} number The period to format (0-1).
         * @param {string} [type=long] The formatting type.
         * @returns {string} The formatted string.
         */
        formatEra(era, type = 'long') {
            return this.getEras(type)[era];
        }

        /**
         * Format a month as a locale string.
         * @param {number} number The month to format (1-12).
         * @param {string} [type=long] The formatting type.
         * @param {Boolean} [standalone=true] Whether the value is standalone.
         * @returns {string} The formatted string.
         */
        formatMonth(month, type = 'long', standalone = true) {
            return this.getMonths(type, standalone)[month - 1];
        }

        /**
         * Format a number as a locale number string.
         * @param {number} number The number to format.
         * @returns {string} The formatted string.
         */
        formatNumber(number, padding = 0) {
            const numbers = this.getNumbers();
            return `${number}`
                .padStart(padding, 0)
                .replace(/\d/g, match => numbers[match])
        }

        /**
         * Format a time zone as a locale string.
         * @param {Date} date The date to use.
         * @param {string} timeZone The time zone to format.
         * @param {string} [type=long] The formatting type.
         * @returns {string} The formatted string.
         */
        formatTimeZoneName(date, timeZone, type = 'long') {
            return this._makeFormatter({ second: 'numeric', timeZone, timeZoneName: type })
                .formatToParts(date)
                .find(part => part.type === 'timeZoneName')
                .value;
        }

        /**
         * Parse a day from a locale string.
         * @param {string} value The value to parse.
         * @param {string} [type=long] The formatting type.
         * @param {Boolean} [standalone=true] Whether the value is standalone.
         * @returns {number} The day number (0-6).
         */
        parseDay(value, type = 'long', standalone = true) {
            const day = this.getDays(type, standalone).indexOf(value) || 7;
            return this.weekDay(day);
        }

        /**
         * Parse a day period from a locale string.
         * @param {string} value The value to parse.
         * @param {string} [type=long] The formatting type.
         * @returns {number} The day period (0-1).
         */
        parseDayPeriod(value, type = 'long') {
            return this.getDayPeriods(type).indexOf(value);
        }

        /**
         * Parse an era from a locale string.
         * @param {string} value The value to parse.
         * @param {string} [type=long] The formatting type.
         * @returns {number} The era (0-1).
         */
        parseEra(value, type = 'long') {
            return this.getEras(type).indexOf(value);
        }

        /**
         * Parse a month from a locale string.
         * @param {string} value The value to parse.
         * @param {string} [type=long] The formatting type.
         * @param {Boolean} [standalone=true] Whether the value is standalone.
         * @returns {number} The month number (1-12).
         */
        parseMonth(value, type = 'long', standalone = true) {
            return this.getMonths(type, standalone).indexOf(value) + 1;
        }

        /**
         * Parse a number from a locale number string.
         * @param {string} value The value to parse.
         * @returns {number} The parsed number.
         */
        parseNumber(value) {
            const numbers = this.getNumbers();
            return parseInt(
                `${value}`.replace(/./g, match => numbers.indexOf(match))
            );
        }

        /**
         * Convert a day of the week to a local format.
         * @param {number} day The day of the week.
         * @returns {number} The local day of the week.
         */
        weekDay(day) {
            return (7 + parseInt(day) - this._weekStartOffset) % 7 || 7;
        }

        /**
         * Format a number to an offset string.
         * @param {number} offset The offset to format.
         * @param {Boolean} [useColon=true] Whether to use a colon seperator.
         * @param {Boolean} [optionalMinutes=false] Whether minutes are optional.
         * @returns {string} The formatted offset string.
         */
        static formatOffset(offset, useColon = true, optionalMinutes = false) {
            const hours = Math.abs(
                (offset / 60) | 0
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
         * Get the formatting type from the component token length.
         * @param {number} length The component token length.
         * @returns {string} The formatting type.
         */
        static getType(length) {
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
         * Get the week start offset for a locale.
         * @param {string} [locale] The locale to load.
         * @returns {number} The week start offset.
         */
        static getWeekStartOffset(locale) {
            let weekStart;
            const localeTest = locale.toLowerCase().split('-');
            while (!weekStart && localeTest.length) {
                for (const start in this._weekStart) {
                    const locales = this._weekStart[start];

                    if (locales.includes(localeTest.join('-'))) {
                        weekStart = start;
                        break;
                    }
                }

                localeTest.pop();
            }

            return weekStart ?
                weekStart - 2 :
                0;
        }

        /**
         * Load a (cached) DateFormatter for a locale.
         * @param {string} [locale] The locale to load.
         * @returns {DateFormatter} The cached DateFormatter object.
         */
        static load(locale) {
            if (!locale) {
                locale = this.defaultLocale;
            }

            if (!(locale in this._formatters)) {
                this._formatters[locale] = new this(locale);
            }

            return this._formatters[locale];
        }

        /**
         * Load a (cached) Intl.RelativeTimeFormat for a locale.
         * @param {string} [locale] The locale to load.
         * @returns {DateFormatter} The cached Intl.RelativeTimeFormat object.
         */
        static loadRelative(locale) {
            if (!locale) {
                locale = this.defaultLocale;
            }

            if (!(locale in this._relativeFormatters)) {
                this._relativeFormatters[locale] = new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style: 'long' });
            }

            return this._relativeFormatters[locale];
        }

    }

    DateFormatter.defaultLocale = Intl.DateTimeFormat().resolvedOptions().locale;

    // Cached formatters
    DateFormatter._formatters = {};
    DateFormatter._relativeFormatters = {};

    /**
     * DateFormatter Format Data
     */

    DateFormatter._formatDate = {

        /* ERA */

        G: {
            key: 'era',
            maxLength: 5,
            regex: (formatter, length) => {
                const type = DateFormatter.getType(length);
                return formatter.getEras(type).join('|');
            },
            input: (formatter, value, length) => {
                const type = DateFormatter.getType(length);
                return formatter.parseEra(value, type);
            },
            output: (datetime, length) => {
                const type = DateFormatter.getType(length);
                return datetime.era(type);
            }
        },

        /* YEAR */

        // year
        y: {
            key: 'year',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value, length) => {
                value = formatter.parseNumber(value);

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
                return datetime.formatter.formatNumber(year, length);
            }
        },

        // week year
        Y: {
            key: 'weekYear',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value, length) => {
                value = formatter.parseNumber(value);

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
                return datetime.formatter.formatNumber(year, length);
            }
        },

        /* QUARTER */

        // quarter
        Q: {
            key: 'quarter',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getQuarter(),
                    length
                )
        },

        // quarter (standalone)
        q: {
            key: 'quarter',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getQuarter(),
                    length
                )
        },

        /* MONTH */

        // month
        M: {
            key: 'month',
            regex: (formatter, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return formatter.getMonths(type, false).join('|');
                    default:
                        return formatter.numberRegExp();
                }
            },
            input: (formatter, value, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return formatter.parseMonth(value, type, false);
                    default:
                        return formatter.parseNumber(value);
                }
            },
            output: (datetime, length) => {
                const month = datetime.getMonth();
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return datetime.formatter.formatMonth(month, type, false);
                    default:
                        return datetime.formatter.formatNumber(month, length);
                }
            }
        },

        // month (standalone)
        L: {
            key: 'month',
            regex: (formatter, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return formatter.getMonths(type).join('|');
                    default:
                        return formatter.numberRegExp();
                }
            },
            input: (formatter, value, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return formatter.parseMonth(value, type);
                    default:
                        return formatter.parseNumber(value);
                }
            },
            output: (datetime, length) => {
                const month = datetime.getMonth();
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return datetime.formatter.formatMonth(month, type);
                    default:
                        return datetime.formatter.formatNumber(month, length);
                }
            }
        },

        /* WEEK */

        // iso week
        w: {
            key: 'week',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getWeek(),
                    length
                )
        },

        // iso week of month
        W: {
            key: 'weekOfMonth',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: datetime =>
                datetime.formatter.formatNumber(
                    datetime.getWeekOfMonth()
                )
        },

        /* DAY */

        // day of month
        d: {
            key: 'date',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getDate(),
                    length
                )
        },

        // day of year
        D: {
            key: 'dayOfYear',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getDayOfYear(),
                    length
                )
        },

        // day of week in month
        F: {
            key: 'weekDayInMonth',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: datetime =>
                datetime.formatter.formatNumber(
                    datetime.getWeekDayInMonth()
                )
        },

        // week day name
        E: {
            key: 'weekDay',
            regex: (formatter, length) => {
                const type = DateFormatter.getType(length);
                return formatter.getDays(type, false).join('|');
            },
            input: (formatter, value, length) => {
                const type = DateFormatter.getType(length);
                return formatter.parseDay(value, type, false);
            },
            output: (datetime, length) => {
                const type = DateFormatter.getType(length);
                const day = datetime.getDay();
                return datetime.formatter.formatDay(day, type, false);
            }
        },

        // week day
        e: {
            key: 'weekDay',
            maxLength: 5,
            regex: (formatter, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return formatter.getDays(type, false).join('|');
                    default:
                        return formatter.numberRegExp()
                }
            },
            input: (formatter, value, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return formatter.parseDay(value, type, false);
                    default:
                        return formatter.parseNumber(value);
                }
            },
            output: (datetime, length) => {
                const day = datetime.getDay();
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return datetime.formatter.formatDay(day, type, false);
                    default:
                        return datetime.formatter.formatNumber(day, length);
                }
            }
        },

        // week day (standalone)
        c: {
            key: 'weekDay',
            maxLength: 5,
            regex: (formatter, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return formatter.getDays(type).join('|');
                    default:
                        return formatter.numberRegExp()
                }
            },
            input: (formatter, value, length) => {
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return formatter.parseDay(value, type);
                    default:
                        return formatter.parseNumber(value);
                }
            },
            output: (datetime, length) => {
                const day = datetime.getDay();
                switch (length) {
                    case 5:
                    case 4:
                    case 3:
                        const type = DateFormatter.getType(length);
                        return datetime.formatter.formatDay(day, type);
                    default:
                        return datetime.formatter.formatNumber(day, length);
                }
            }
        },

        /* PERIOD */

        a: {
            key: 'dayPeriod',
            regex: (formatter, length) => {
                const type = DateFormatter.getType(length);
                return formatter.getDayPeriods(type).join('|');
            },
            input: (formatter, value, length) => {
                const type = DateFormatter.getType(length);
                return formatter.parseDayPeriod(value, type);
            },
            output: (datetime, length) => {
                const type = DateFormatter.getType(length);
                return datetime.dayPeriod(type);
            }
        },

        /* HOUR */

        h: {
            key: 'hours12',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => {
                value = formatter.parseNumber(value);
                if (value === 12) {
                    value = 0;
                }
                return value;
            },
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getHours() % 12 || 12,
                    length
                )
        },

        H: {
            key: 'hours24',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getHours(),
                    length
                )
        },

        K: {
            key: 'hours12',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getHours() % 12,
                    length
                )
        },

        k: {
            key: 'hours24',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => {
                value = formatter.parseNumber(value);
                if (value === 24) {
                    value = 0;
                }
                return value;
            },
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getHours() || 24,
                    length
                )
        },

        /* MINUTE */

        m: {
            key: 'minutes',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getMinutes(),
                    length
                )
        },

        /* SECOND */

        s: {
            key: 'seconds',
            regex: formatter => formatter.numberRegExp(),
            input: (formatter, value) => formatter.parseNumber(value),
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    datetime.getSeconds(),
                    length
                )
        },

        /* FRACTIONAL */

        S: {
            key: 'milliseconds',
            regex: formatter => formatter.numberRegExp(),
            input: _ => 0,
            output: (datetime, length) =>
                datetime.formatter.formatNumber(
                    `${Math.floor(
                        (
                            datetime.getMilliseconds()
                            + datetime._fraction
                        )
                        * 1000
                    )}`.padEnd(length, '0').slice(0, length)
                )
        },

        /* TIMEZONE/OFFSET */

        z: {
            output: (datetime, length) => {
                if (length === 5) {
                    length = 1;
                }
                const type = DateFormatter.getType(length);
                return datetime.timeZoneName(type);
            }
        },

        Z: {
            key: 'timeZone',
            regex: (_, length) => {
                switch (length) {
                    case 5:
                        return `[\\+\\-]\\d{2}\\:\\d{2}`;
                    case 4:
                        return `GMT[\\+\\-]\\d{2}\\:\\d{2}`;
                    default:
                        return `[\\+\\-]\\d{4}`;
                }
            },
            input: (_, value) => value,
            output: (datetime, length) => {
                let useColon = true;
                let prefix = '';
                switch (length) {
                    case 5:
                        break;
                    case 4:
                        prefix = 'GMT';
                        break;
                    default:
                        useColon = false;
                        break;
                }

                return prefix + DateFormatter.formatOffset(datetime.getTimeZoneOffset(), useColon);
            }
        },

        O: {
            key: 'timeZone',
            regex: (_, length) => {
                switch (length) {
                    case 4:
                        return `GMT[\\+\\-]\\d{2}\\:\\d{2}`;
                    default:
                        return `GMT[\\+\\-]\\d{2}`;
                }
            },
            input: (_, value) => value,
            output: (datetime, length) => {
                let optionalMinutes = false;
                switch (length) {
                    case 4:
                        break;
                    default:
                        optionalMinutes = true;
                }

                return 'GMT' + DateFormatter.formatOffset(datetime.getTimeZoneOffset(), true, optionalMinutes);
            }
        },

        V: {
            key: 'timeZone',
            regex: _ => '([a-zA-Z_\/]+)',
            input: (_, value) => value,
            output: datetime => datetime.getTimeZone()
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

                return DateFormatter.formatOffset(offset, useColon, length === 1);
            }
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

                return DateFormatter.formatOffset(datetime.getTimeZoneOffset(), useColon, length === 1);
            }
        }

    };

    DateFormatter._weekStart = {"1":["af","am","ar-il","ar-sa","ar-ye","as","bn","bo","brx","ccp","ceb","chr","dav","dz","ebu","en","es","fil","fr-ca","gu","guz","haw","he","hi","id","ii","ja","jv","kam","ki","kln","km","kn","ko","kok","ks","lkt","lo","luo","luy","mas","mer","mgh","ml","mr","ms","mt","my","nd","ne","om","or","pa","ps-pk","pt","qu","saq","sd","seh","sn","so-et","so-ke","sw","ta","te","teo","th","ti","ug","ur","xh","yue","zh","zu"],"2":["af-na","ar-001","ar-eh","ar-er","ar-km","ar-lb","ar-ma","ar-mr","ar-ps","ar-so","ar-ss","ar-td","ar-tn","en-001","en-150","en-ai","en-at","en-bb","en-be","en-bi","en-bm","en-cc","en-ch","en-ck","en-cm","en-cx","en-cy","en-de","en-dg","en-dk","en-er","en-fi","en-fj","en-fk","en-fm","en-gb","en-gd","en-gg","en-gh","en-gi","en-gm","en-gy","en-ie","en-im","en-io","en-je","en-ki","en-kn","en-ky","en-lc","en-lr","en-ls","en-mg","en-mp","en-ms","en-mu","en-mw","en-my","en-na","en-nf","en-ng","en-nl","en-nr","en-nu","en-nz","en-pg","en-pn","en-pw","en-rw","en-sb","en-sc","en-se","en-sh","en-si","en-sl","en-ss","en-sx","en-sz","en-tc","en-tk","en-to","en-tv","en-tz","en-ug","en-vc","en-vg","en-vu","en-zm","ko-kp","mas-tz","pt-ao","pt-ch","pt-cv","pt-gq","pt-gw","pt-lu","pt-st","pt-tl","qu-bo","qu-ec","ta-lk","ta-my","ti-er"],"7":["ar","ckb","en-ae","en-sd","fa","fr-dj","fr-dz","fr-sy","kab","lrc","mzn","ps","so-dj","uz"]}
    /**
     * DateFormatter Helpers
     */

    Object.assign(DateFormatter.prototype, {

        /**
         * Get values from cache (or generate if they don't exist).
         * @param {string} key The key for the values.
         * @param {function} callback The callback to generate the values.
         * @returns {array} The cached values.
         */
        _getData(key, callback) {
            if (!(key in this._data)) {
                this._data[key] = callback();
            }

            return this._data[key];
        },

        /**
         * Create a new UTC formatter for the current locale.
         * @param {object} options The options for the formatter.
         * @returns {Intl.DateTimeFormat} A new DateTimeFormat object.
         */
        _makeFormatter(options) {
            return new Intl.DateTimeFormat(this.locale, {
                timeZone: 'UTC',
                ...options
            });
        }

    });

    /**
     * DateFormatter Values
     */

    Object.assign(DateFormatter.prototype, {

        /**
         * Get cached day period values.
         * @param {string} [type=long] The formatting type.
         * @returns {array} The cached values.
         */
        getDayPeriods(type = 'long') {
            return this._getData(
                `periods[${type}]`,
                _ => {
                    const dayPeriodFormatter = this._makeFormatter({ hour: 'numeric', hourCycle: 'h11', dayPeriod: type })
                    return new Array(2)
                        .fill()
                        .map((_, index) =>
                            dayPeriodFormatter.formatToParts(Date.UTC(2018, 0, 1, index * 12))
                                .find(part => part.type === 'dayPeriod')
                                .value
                        );
                }
            );
        },

        /**
         * Get cached day values.
         * @param {string} [type=long] The formatting type.
         * @param {Boolean} [standalone=true] Whether the values are standalone.
         * @returns {array} The cached values.
         */
        getDays(type = 'long', standalone = true) {
            return this._getData(
                `days[${standalone}][${type}]`,
                _ => {
                    if (standalone) {
                        const dayFormatter = this._makeFormatter({ weekday: type });
                        return new Array(7)
                            .fill()
                            .map((_, index) =>
                                dayFormatter.format(Date.UTC(2018, 0, index))
                            );
                    }

                    const dayFormatter = this._makeFormatter({ year: 'numeric', month: 'numeric', day: 'numeric', weekday: type });
                    return new Array(7)
                        .fill()
                        .map((_, index) =>
                            dayFormatter.formatToParts(Date.UTC(2018, 0, index))
                                .find(part => part.type === 'weekday')
                                .value
                        );
                }
            );
        },

        /**
         * Get cached era values.
         * @param {string} [type=long] The formatting type.
         * @returns {array} The cached values.
         */
        getEras(type = 'long') {
            return this._getData(
                `eras[${type}]`,
                _ => {
                    const eraFormatter = this._makeFormatter({ era: type });
                    return new Array(2)
                        .fill()
                        .map((_, index) =>
                            eraFormatter.formatToParts(Date.UTC(index - 1, 0, 1))
                                .find(part => part.type === 'era')
                                .value
                        );
                }
            );
        },

        /**
         * Get cached month values.
         * @param {string} [type=long] The formatting type.
         * @param {Boolean} [standalone=true] Whether the values are standalone.
         * @returns {array} The cached values.
         */
        getMonths(type = 'long', standalone = true) {
            return this._getData(
                `months[${standalone}][${type}]`,
                _ => {
                    if (standalone) {
                        const monthFormatter = this._makeFormatter({ month: type });
                        return new Array(12)
                            .fill()
                            .map((_, index) =>
                                monthFormatter.format(Date.UTC(2018, index, 1))
                            );
                    }

                    const monthFormatter = this._makeFormatter({ year: 'numeric', month: type, day: 'numeric' });
                    return new Array(12)
                        .fill()
                        .map((_, index) =>
                            monthFormatter.formatToParts(Date.UTC(2018, index, 1))
                                .find(part => part.type === 'month')
                                .value
                        );
                }
            );
        },

        /**
         * Get cached number values.
         * @returns {array} The cached values.
         */
        getNumbers() {
            return this._getData(
                'numbers',
                _ => {
                    const numberFormatter = this._makeFormatter({ minute: 'numeric' });
                    return new Array(10)
                        .fill()
                        .map((_, index) =>
                            numberFormatter.format(Date.UTC(2018, 0, 1, 0, index))
                        );
                }
            );
        },

        /**
         * Get the RegExp for the number values.
         * @returns {string} The number values RegExp.
         */
        numberRegExp() {
            const numbers = this.getNumbers().join('|');
            return `(?:${numbers})+`;
        }

    });

    /**
     * DateTime class
     * @class
     */
    class DateTime {

        /**
         * New DateTime constructor.
         * @param {null|string} [dateString] The date to parse.
         * @param {object} [options] Options for the new DateTime.
         * @param {string} [options.locale] The locale to use.
         * @param {string} [options.timeZone] The timeZone to use.
         * @returns {DateTime} A new DateTime object.
         */
        constructor(dateString = null, options = {}) {

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

            let timeZone = options.timeZone;

            if (!timeZone) {
                timeZone = this.constructor.defaultTimeZone;
            }

            if (['Z', 'GMT'].includes(timeZone)) {
                timeZone = 'UTC';
            }

            const match = timeZone.match(this.constructor._offsetRegExp);
            if (match) {
                this._offset = match[2] * 60 + parseInt(match[4] || 0);
                if (this._offset && match[1] === '+') {
                    this._offset *= -1;
                }

                if (this._offset) {
                    this._timeZone = DateFormatter.formatOffset(this._offset);
                } else {
                    this._dynamicTz = true;
                    this._timeZone = 'UTC';
                }
            } else {
                this._dynamicTz = true;
                this._timeZone = timeZone;
            }

            if (this._dynamicTz) {
                this._makeFormatter();
                this._checkOffset();
            }

            if (adjustOffset) {
                this._adjustOffset();
            }

            this.formatter = DateFormatter.load(options.locale);
            this.relativeFormatter = DateFormatter.loadRelative(options.locale);
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
         * Set the current locale.
         * @param {string} locale The name of the timeZone.
         * @returns {DateTimeImmutable} A new DateTimeImmutable object.
         */
        setLocale(locale) {
            return this.constructor.fromDate(this._utcDate, {
                locale,
                timeZone: this.getTimeZone()
            });
        }

        /**
         * Set the number of milliseconds since the UNIX epoch.
         * @param {number} time The number of milliseconds since the UNIX epoch.
         * @returns {DateTimeImmutable} A new DateTimeImmutable object.
         */
        setTime(time) {
            const date = new this.constructor(null, {
                locale: this.getLocale(),
                timeZone: this.getTimeZone()
            });

            date._utcDate.setTime(time);

            if (date._dynamicTz) {
                date._checkOffset();
            }

            return date;
        }

        /**
         * Set the current timeZone.
         * @param {string} timeZone The name of the timeZone.
         * @returns {DateTimeImmutable} A new DateTimeImmutable object.
         */
        setTimeZone(timeZone) {
            return this.constructor.fromDate(this._utcDate, {
                locale: this.getLocale(),
                timeZone
            });
        }

        /**
         * Set the current UTC offset.
         * @param {number} offset The UTC offset (in minutes).
         * @returns {DateTimeImmutable} The DateTime object.
         */
        setTimeZoneOffset(offset) {
            return this.constructor.fromDate(this._utcDate, {
                locale: this.getLocale(),
                timeZone: DateFormatter.formatOffset(offset)
            });
        }

    }

    /**
     * DateTime Attributes (Get)
     */

    Object.assign(DateTime.prototype, {

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
         * Get the name of the current locale.
         * @returns {string} The name of the current locale.
         */
        getLocale() {
            return this.formatter.locale;
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
        },

        /**
         * Get the local week in current timeZone.
         * @returns {number} The local week. (1, 53)
         */
        getWeek() {
            const week = this.clone().startOf('day').setWeekDay(4);
            const firstWeek = week.clone().setMonth(1, 4).setWeekDay(4);

            return 1
                + (
                    (
                        (week - firstWeek)
                        / 604800000
                    ) | 0
                );
        },

        /**
         * Get the local day of the week in current timeZone.
         * @returns {number} The local day of the week. (1 - 7)
         */
        getWeekDay() {
            return this.formatter.weekDay(
                this.getDay()
            );
        },

        /**
         * Get the week day in month in current timeZone.
         * @returns {number} The week day in month.
         */
        getWeekDayInMonth() {
            const thisWeek = this.getWeek();
            const first = this.clone().setDate(1);
            const firstWeek = first.getWeek();
            const offset = first.getWeekDay() > this.getWeekDay() ?
                0 : 1;
            return firstWeek > thisWeek ?
                thisWeek + offset :
                thisWeek - firstWeek + offset;
        },

        /**
         * Get the week of month in current timeZone.
         * @returns {number} The week of month.
         */
        getWeekOfMonth() {
            const thisWeek = this.getWeek();
            let firstWeek = this.clone().setDate(1).getWeek();
            return firstWeek > thisWeek ?
                thisWeek + 1 :
                thisWeek - firstWeek + 1;
        },

        /**
         * Get the ISO year in current timeZone.
         * @returns {number} The ISO year.
         */
        getWeekYear() {
            return this.clone().setWeekDay(4).getYear();
        }

    });

    /**
     * DateTime Attributes (Set)
     */

    Object.assign(DateTime.prototype, {

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
         * Set the current locale.
         * @param {string} locale The name of the timeZone.
         * @returns {DateTime} The DateTime object.
         */
        setLocale(locale) {
            this.formatter = DateFormatter.load(locale);
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

            if (this._dynamicTz) {
                this._checkOffset();
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
         * @param {Boolean} [adjust=false] Whether to adjust the timestamp.
         * @returns {DateTime} The DateTime object.
         */
        setTimeZone(timeZone, adjust = false) {
            if (['Z', 'GMT'].includes(timeZone)) {
                timeZone = 'UTC';
            }

            this._dynamicTz = false;

            const offset = this._offset;

            const match = timeZone.match(this.constructor._offsetRegExp);
            if (match) {
                this._offset = match[2] * 60 + parseInt(match[4] || 0);
                if (this._offset && match[1] === '+') {
                    this._offset *= -1;
                }

                if (this._offset) {
                    this._timeZone = DateFormatter.formatOffset(this._offset);
                } else {
                    this._dynamicTz = true;
                    this._timeZone = 'UTC';
                }
            } else {
                this._dynamicTz = true;
                this._timeZone = timeZone;
            }

            if (this._dynamicTz) {
                this._makeFormatter();
                this._checkOffset();
            }

            // compensate for DST transitions
            if (adjust && offset !== this._offset) {
                this._utcDate.setTime(
                    this._utcDate.getTime()
                    - (offset - this._offset) * 60000
                );
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
            this._timeZone = DateFormatter.formatOffset(this._offset);
            this._formatter = null;

            return this;
        },

        /**
         * Set the local day of the week in current timeZone (and optionally, day of the week).
         * @param {number} week The local week.
         * @param {null|number} [day] The local day of the week. (1 - 7)
         * @returns {DateTime} The DateTime object.
         */
        setWeek(week, day = null) {
            if (day === null) {
                day = this.getWeekDay();
            }

            return this.setYear(this.getWeekYear(), 1, 4 + ((week - 1) * 7)).setWeekDay(day);
        },

        /**
         * Set the local day of the week in current timeZone.
         * @param {number} day The local day of the week. (1 - 7)
         * @returns {DateTime} The DateTime object.
         */
        setWeekDay(day) {
            return this._setOffsetTime(
                new Date(this._getOffsetTime()).setUTCDate(
                    this.getDate()
                    - this.getWeekDay()
                    + parseInt(day)
                )
            );
        },

        /**
         * Set the week day in month in current timeZone.
         * @param {number} week The week day in month.
         * @returns {DateTime} The DateTime object.
         */
        setWeekDayInMonth(week) {
            return this.setDate(
                this.getDate()
                + (
                    week -
                    this.getWeekDayInMonth()
                ) * 7
            )
        },

        /**
         * Set the week of month in current timeZone.
         * @param {number} week The week of month.
         * @returns {DateTime} The DateTime object.
         */
        setWeekOfMonth(week) {
            return this.setDate(
                this.getDate()
                + (
                    week -
                    this.getWeekOfMonth()
                ) * 7
            )
        },

        /**
         * Set the local day of the week in current timeZone (and optionally, week and day of the week).
         * @param {number} year The local year.
         * @param {null|number} [week] The local week.
         * @param {null|number} [day] The local day of the week. (1 - 7)
         * @returns {DateTime} The DateTime object.
         */
        setWeekYear(year, week = null, day = null) {
            if (week === null) {
                week = Math.min(
                    this.getWeek(),
                    DateTime.fromArray([year, 1, 4]).weeksInYear()
                );
            }

            if (day === null) {
                day = this.getWeekDay();
            }

            return this.setYear(year, 1, 4 + ((week - 1) * 7)).setWeekDay(day);
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

        /**
         * Adjust the timestamp by the current offset.
         */
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
         * Get the biggest difference between this and another Date.
         * @param {DateTime} [other] The date to compare to.
         * @return {array} The biggest difference (amount and time unit).
         */
        _getBiggestDiff(other) {
            for (const timeUnit of ['year', 'month', 'day', 'hour', 'minute', 'second']) {
                const amount = this.diff(other, timeUnit);

                if (amount) {
                    return [amount, timeUnit];
                }
            }

            return [0, 'second'];
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
         * Update the formatter for current timeZone.
         */
        _makeFormatter() {
            this._formatter = new Intl.DateTimeFormat(this.constructor._formatterLocale, {
                ...this.constructor._formatterOptions,
                timeZone: this.getTimeZone()
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
                    return this.setWeekDay(7)
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
        },

        /**
         * Subtract a duration from the date.
         * @param {number} amount The amount to modify the date by.
         * @param {string} timeUnit The unit of time.
         * @returns {DateTime} The DateTime object.
         */
        sub(amount, timeUnit) {
            return this._modify(-amount, timeUnit);
        }

    });

    /**
     * DateTime Output
     */

    Object.assign(DateTime.prototype, {

        /**
         * Format the current date using a format string.
         * @param {string} formatString The format string.
         * @returns {string} The formatted date string.
         */
        format(formatString) {
            let match,
                output = '';

            while (formatString && (match = formatString.match(this.constructor._formatTokenRegExp))) {
                const token = match[1],
                    position = match.index,
                    length = match[0].length;

                if (position) {
                    output += formatString.substring(0, position);
                }
    
                formatString = formatString.substring(position + length);

                if (!token) {
                    output += match[0].slice(1, -1);
                    continue;
                }

                if (!(token in DateFormatter._formatDate)) {
                    throw new Error(`Invalid token in DateTime format: ${token}`);
                }

                output += DateFormatter._formatDate[token].output(this, length);
            }

            output += formatString;

            return output;
        },

        /**
         * Format the current date using "eee MMM dd yyyy".
         * @returns {string} The formatted date string.
         */
        toDateString() {
            return this.format(this.constructor.formats.date)
        },

        /**
         * Format the current date using "yyyy-MM-dd'THH:mm:ss.SSSSSSxxx".
         * @returns {string} The formatted date string.
         */
        toISOString() {
            return this.constructor.fromDate(this._utcDate, {
                locale: 'en-US',
                timeZone: 'UTC'
            }).format(this.constructor.formats.rfc3339_extended);
        },

        /**
         * Format the current date using "eee MMM dd yyyy HH:mm:ss xx (VV)".
         * @returns {string} The formatted date string.
         */
        toString() {
            return this.format(this.constructor.formats.string);
        },

        /**
         * Format the current date using "HH:mm:ss xx (VV)".
         * @returns {string} The formatted date string.
         */
        toTimeString() {
            return this.format(this.constructor.formats.time);
        },

        /**
         * Format the current date in UTC timeZone using "eee MMM dd yyyy HH:mm:ss xx (VV)".
         * @returns {string} The formatted date string.
         */
        toUTCString() {
            return this.constructor.fromDate(this._utcDate, {
                locale: this.getLocale(),
                timeZone: 'UTC'
            }).toString();
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
            return this.constructor.fromTimestamp(this.getTimestamp(), {
                locale: this.getLocale(),
                timeZone: this.getTimeZone()
            });
        },

        /**
         * Get the name of the day of the week in current timeZone.
         * @param {string} [type=long] The type of day name to return.
         * @returns {string} The name of the day of the week.
         */
        dayName(type = 'long') {
            return this.formatter.formatDay(this.getDay(), type);
        },

        /**
         * Get the day period in current timeZone.
         * @param {string} [type=long] The type of day period to return.
         * @returns {string} The day period.
         */
        dayPeriod(type = 'long') {
            return this.formatter.formatDayPeriod(
                this.getHours() < 12 ?
                    0 :
                    1,
                type
            );
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
         * Get the difference between this and another Date.
         * @param {DateTime} [other] The date to compare to.
         * @param {string} [timeUnit] The unit of time.
         * @returns {number} The difference.
         */
        diff(other, timeUnit) {
            if (!other) {
                other = new this.constructor;
            }

            if (timeUnit) {
                timeUnit = timeUnit.toLowerCase();
            }

            let divisor;
            switch (timeUnit) {
                case 'year':
                case 'years':
                    return this.getYear() - other.getYear();
                case 'month':
                case 'months':
                    return this.diff(other, 'year') * 12
                        + this.getMonth()
                        - other.getMonth();
                case 'day':
                case 'days':
                    divisor = 86400000;
                    break;
                case 'hour':
                case 'hours':
                    divisor = 3600000;
                    break;
                case 'minute':
                case 'minutes':
                    divisor = 60000;
                    break;
                case 'second':
                case 'seconds':
                    divisor = 1000;
                    break;
                default:
                    divisor = 1;
            }

            const diff = (this - other) / divisor;

            return diff > 0 ?
                Math.floor(diff) :
                Math.ceil(diff);
        },

        /**
         * Get the era in current timeZone.
         * @param {string} [type=long] The type of era to return.
         * @returns {string} The era.
         */
        era(type = 'long') {
            return this.formatter.formatEra(
                this.getYear() < 0 ?
                    0 :
                    1,
                type
            );
        },

        /**
         * Get the difference between this and another Date in human readable form.
         * @param {DateTime} [other] The date to compare to.
         * @param {string} [timeUnit] The unit of time.
         * @returns {string} The difference in human readable form.
         */
        humanDiff(other, timeUnit) {
            if (!other) {
                other = new this.constructor;
            }

            let amount;
            if (timeUnit) {
                amount = this.diff(other, timeUnit);
            } else {
                [amount, timeUnit] = this._getBiggestDiff(other);
            }

            return this.relativeFormatter.format(amount, timeUnit);
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
            if (!this._dynamicTz) {
                return false;
            }

            const year = this.getYear(),
                dateA = DateTime.fromArray([year, 1, 1], {
                    timeZone: this.getTimeZone()
                }),
                dateB = DateTime.fromArray([year, 6, 1], {
                    timeZone: this.getTimeZone()
                });

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
         * @param {string} [type=long] The type of month name to return.
         * @returns {string} The name of the month.
         */
        monthName(type = 'long') {
            return this.formatter.formatMonth(this.getMonth(), type);
        },

        /**
         * Get the name of the current timeZone.
         * @param {string} [type=long] The formatting type.
         * @returns {string} The name of the time zone.
         */
        timeZoneName(type = 'long') {
            return this._dynamicTz ?
                this.formatter.formatTimeZoneName(this._utcDate, this.getTimeZone(), type) :
                DateFormatter.formatOffset(this.getTimeZoneOffset(), true, type === 'short');
        },

        /**
         * Get the number of weeks in the current ISO year.
         * @returns {number} The number of weeks in the current ISO year.
         */
        weeksInYear() {
            return this.clone().setMonth(12, 28).getWeek();
        }

    });

    /**
     * DateTime (Static) Creation
     */

    Object.assign(DateTime, {

        /**
         * Create a new DateTime from an array.
         * @param {number[]} date The date to parse.
         * @param {object} [options] Options for the new DateTime.
         * @param {string} [options.locale] The locale to use.
         * @param {string} [options.timeZone] The timeZone to use.
         * @returns {DateTime} A new DateTime object.
         */
        fromArray(dateArray, options = {}) {
            const dateValues = dateArray.slice(0, 3);
            const timeValues = dateArray.slice(3);

            if (dateValues.length < 3) {
                dateValues.push(...new Array(3 - dateValues.length).fill(1));
            }

            if (timeValues.length < 4) {
                timeValues.push(...new Array(4 - timeValues.length).fill(0));
            }

            return new this(null, options)
                .setTimestamp(0)
                .setYear(...dateValues)
                .setHours(...timeValues);
        },

        /**
         * Create a new DateTime from a Date.
         * @param {Date} date The date.
         * @param {object} [options] Options for the new DateTime.
         * @param {string} [options.locale] The locale to use.
         * @param {string} [options.timeZone] The timeZone to use.
         * @returns {DateTime} A new DateTime object.
         */
        fromDate(date, options = {}) {
            return new this(null, options)
                .setTime(date.getTime());
        },

        /**
         * Create a new DateTime from a format string.
         * @param {string} formatString The format string.
         * @param {string} dateString The date string.
         * @param {object} [options] Options for the new DateTime.
         * @param {string} [options.locale] The locale to use.
         * @param {string} [options.timeZone] The timeZone to use.
         * @returns {DateTime} A new DateTime object.
         */
        fromFormat(formatString, dateString, options = {}) {
            const formatter = DateFormatter.load(options.locale),
                originalFormat = formatString,
                originalString = dateString,
                values = [];

            let match;
            while (formatString && (match = formatString.match(this._formatTokenRegExp))) {
                const token = match[1],
                    position = match.index,
                    length = match[0].length;

                if (position) {
                    const formatTest = formatString.substring(0, position);
                    this._parseCompare(formatTest, dateString);
                }

                formatString = formatString.substring(position + length);
                dateString = dateString.substring(position);

                if (!token) {
                    const literal = match[0].slice(1, -1);
                    this._parseCompare(literal || `'`, dateString);
                    dateString = dateString.substring(literal.length);
                    continue;
                }

                if (!(token in DateFormatter._formatDate)) {
                    throw new Error(`Invalid token in DateTime format: ${token}`);
                }

                const regExp = DateFormatter._formatDate[token].regex(formatter, length),
                    matchedValue = dateString.match(new RegExp(`^${regExp}`));

                if (!matchedValue) {
                    throw new Error(`Unmatched token in DateTime string: ${token}`);
                }

                const key = DateFormatter._formatDate[token].key,
                    value = DateFormatter._formatDate[token].input(formatter, matchedValue[0], length);

                values.push({ key, value });

                dateString = dateString.substring(matchedValue[0].length);
            }

            if (formatString) {
                this._parseCompare(formatString, dateString);
            }

            if (!('timeZone' in options)) {
                options.timeZone = this.defaultTimeZone;
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
                timeZone
            });

            const methods = this._parseFactory();

            for (const subKeys of this._parseOrderKeys) {
                for (const subKey of subKeys) {
                    for (const { key, value } of values) {
                        if (key !== subKey) {
                            continue;
                        }

                        datetime = methods[key](datetime, value);
                    }
                }
            }

            if (options.timeZone !== timeZone) {
                datetime = datetime.setTimeZone(options.timeZone);
            }

            datetime.isValid = datetime.format(originalFormat) === originalString;

            return datetime;
        },

        /**
         * Create a new DateTime from an ISO format string.
         * @param {string} dateString The date string.
         * @param {object} [options] Options for the new DateTime.
         * @param {string} [options.locale] The locale to use.
         * @param {string} [options.timeZone] The timeZone to use.
         * @returns {DateTime} A new DateTime object.
         */
        fromISOString(dateString, options = {}) {
            return this.fromFormat(this.constructor.formats.rfc3339_extended, dateString, {
                locale: 'en-US',
                ...options
            });
        },

        /**
         * Create a new DateTime from a timestamp.
         * @param {number} timestamp The timestamp.
         * @param {object} [options] Options for the new DateTime.
         * @param {string} [options.locale] The locale to use.
         * @param {string} [options.timeZone] The timeZone to use.
         * @returns {DateTime} A new DateTime object.
         */
        fromTimestamp(timestamp, options = {}) {
            return new this(null, options)
                .setTimestamp(timestamp);
        },

        /**
         * Create a new DateTime for the current time.
         * @param {object} [options] Options for the new DateTime.
         * @param {string} [options.locale] The locale to use.
         * @param {string} [options.timeZone] The timeZone to use.
         * @returns {DateTime} A new DateTime object.
         */
        now(options = {}) {
            return new this(null, options);
        }

    });

    /**
     * DateTime (Static) Helpers
     */

    Object.assign(DateTime, {

        /**
         * Compare a literal format string with a date string.
         * @param {string} formatString The literal format string.
         * @param {string} dateString The date string.
         */
        _parseCompare(formatString, dateString) {
            let i = 0;
            for (const char of formatString) {
                if (char !== dateString[i]) {
                    throw new Error(`Unmatched character in DateTime string: ${char}`);
                }

                i++;
            }
        },

        /**
         * Generate methods for parsing a date.
         * @returns {object} An object containing date parsing methods.
         */
        _parseFactory() {
            let isPM = false,
                lastAM = true;
            return {
                date: (datetime, value) => datetime.setDate(value),
                dayPeriod: (datetime, value) => {
                    isPM = value;
                    let hours = value ? 12 : 0;
                    if (lastAM) {
                        hours += datetime.getHours();
                    }
                    return datetime.setHours(hours);
                },
                dayOfYear: (datetime, value) => datetime.setDayOfYear(value),
                era: (datetime, value) => {
                    const offset = value ? 1 : -1;
                    return datetime.setYear(
                        datetime.getYear() * offset
                    );
                },
                hours12: (datetime, value) => {
                    if (isPM) {
                        value += 12;
                    }
                    lastAM = true;
                    return datetime.setHours(value);
                },
                hours24: (datetime, value) => {
                    lastAM = false;
                    return datetime.setHours(value);
                },
                milliseconds: (datetime, value) => datetime.setMilliseconds(value),
                minutes: (datetime, value) => datetime.setMinutes(value),
                month: (datetime, value) => datetime.setMonth(value),
                quarter: (datetime, value) => datetime.setQuarter(value),
                seconds: (datetime, value) => datetime.setSeconds(value),
                week: (datetime, value) => datetime.setWeek(value),
                weekDay: (datetime, value) => datetime.setWeekDay(value),
                weekDayInMonth: (datetime, value) => datetime.setWeekDayInMonth(value),
                weekOfMonth: (datetime, value) => datetime.setWeekOfMonth(value),
                weekYear: (datetime, value) => datetime.setWeekYear(value),
                year: (datetime, value) => datetime.setYear(value)
            };
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
        }

    });

    /**
     * DateTime (Static) Properties
     */

    Object.assign(DateTime, {

        // Whether to clamp current date when adjusting month
        clampDates: true,

        // Default timeZone
        defaultTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

        // Formats
        formats: {
            atom: `yyyy-MM-dd'T'HH:mm:ssxxx`,
            cookie: 'eeee, dd-MMM-yyyy HH:mm:ss ZZZZ',
            date: 'eee MMM dd yyyy',
            iso8601: `yyyy-MM-dd'T'HH:mm:ssxx`,
            rfc822: 'eee, dd MMM yy HH:mm:ss xx',
            rfc850: 'eeee dd-MMM-yy HH:mm:ss ZZZZ',
            rfc1036: 'eee, dd MMM yy HH:mm:ss xx',
            rfc1123: 'eee, dd MMM yyyy HH:mm:ss xx',
            rfc2822: 'eee, dd MMM yyyy HH:mm:ss xx',
            rfc3339: `yyyy-MM-dd'T'HH:mm:ssxxx`,
            rfc3339_extended: `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`,
            rss: 'eee, dd MMM yyyy HH:mm:ss xx',
            string: 'eee MMM dd yyyy HH:mm:ss xx (VV)',
            time: 'HH:mm:ss xx (VV)',
            w3c: `yyyy-MM-dd'T'HH:mm:ssxxx`
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

        // Formatter locale
        _formatterLocale: 'en-US',

        // Formatter options
        _formatterOptions: {
            timeZone: 'UTC',
            hourCycle: 'h23',
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
        _dateStringTimeZoneRegExp: /\s(?:UTC|GMT|Z|[\+\-]\d)|\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}[\+\-]\d{2}\:\d{2}/i,

        // Format token RegExp
        _formatTokenRegExp: /([a-z])\1*|'[^']*'/i,

        // Offset RegExp
        _offsetRegExp: /(?:GMT)?([\+\-])(\d{2})(\:?)(\d{2})?/,

        // Parsing key order
        _parseOrderKeys: [
            ['year', 'weekYear'],
            ['era'],
            ['quarter', 'month', 'week', 'dayOfYear'],
            ['weekOfMonth'],
            ['date', 'weekDay'],
            ['weekDayInMonth'],
            ['hours24', 'hours12', 'dayPeriod'],
            ['minutes', 'seconds', 'milliseconds']
        ]

    });

    // UTC formatter
    DateTime._utcFormatter = new Intl.DateTimeFormat(DateTime._formatterLocale, DateTime._formatterOptions);

    return {
        DateFormatter,
        DateTime,
        DateTimeImmutable
    };

});
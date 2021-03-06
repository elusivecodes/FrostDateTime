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
            return datetime.formatter.formatNumber(
                Math.abs(year),
                length
            );
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
            return datetime.formatter.formatNumber(
                Math.abs(year),
                length
            );
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
                    return null;
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
                    return null;
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

    // local week
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

    // local week of month
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
            if (length === 5) {
                return null;
            }

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
                    return null;
                case 4:
                case 3:
                    const type = DateFormatter.getType(length);
                    return formatter.parseDay(value, type, false);
                default:
                    return formatter.parseNumber(value);
            }
        },
        output: (datetime, length) => {
            switch (length) {
                case 5:
                case 4:
                case 3:
                    const type = DateFormatter.getType(length);
                    const day = datetime.getDay();
                    return datetime.formatter.formatDay(day, type, false);
                default:
                    const weekDay = datetime.getWeekDay();
                    return datetime.formatter.formatNumber(weekDay, length);
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
                    return null;
                case 4:
                case 3:
                    const type = DateFormatter.getType(length);
                    return formatter.parseDay(value, type);
                default:
                    return formatter.parseNumber(value);
            }
        },
        output: (datetime, length) => {
            switch (length) {
                case 5:
                case 4:
                case 3:
                    const type = DateFormatter.getType(length);
                    const day = datetime.getDay();
                    return datetime.formatter.formatDay(day, type);
                default:
                    const weekDay = datetime.getWeekDay();
                    return datetime.formatter.formatNumber(weekDay);
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

            return prefix + DateFormatter.formatOffset(offset, useColon);
        }
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

            return prefix + DateFormatter.formatOffset(offset, true, optionalMinutes);
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

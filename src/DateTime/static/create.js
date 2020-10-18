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
            .setYear(...dateValues)
            .setHours(...timeValues);
    },

    /**
     * Create a new DateTime from a Date.
     * @param {Date} date The date.
     * @param {null|string} [timeZone] The timeZone.
     * @returns {DateTime} A new DateTime object.
     */
    fromDate(date, options = {}) {
        return new this(null, options)
            .setTime(date.getTime());
    },

    fromFormat(formatString, dateString, options = {}) {

        const compareStrings = (a, b) => {
            let i = 0;
            let escaped = false;
            for (const char of a) {
                if (char === "'" && !escaped) {
                    escaped = true;
                    continue;
                }

                if (char !== b[i]) {
                    throw new Error(`Unmatched character in DateTime string: ${char}`);
                }

                escaped = false;
                i++;
            }
        };

        const formatter = DateFormatter.load(options.locale);
        const originalFormat = formatString;
        const originalString = dateString;
        const values = [];

        let match;
        while (formatString && (match = formatString.match(/(?<!\')([a-z])\1*/i))) {
            const token = match[1];
            if (!(token in DateFormatter._formatDate)) {
                throw new Error(`Invalid token in DateTime format: ${token}`);
            }

            const position = match.index;
            if (position) {
                const formatTest = formatString.substring(0, position);
                compareStrings(formatTest, dateString);
            }

            formatString = formatString.substring(position);
            dateString = dateString.substring(position);

            const length = match[0].length;
            const regExp = DateFormatter._formatDate[token].regex(formatter, length);
            const matchedValue = dateString.match(new RegExp(`^${regExp}`));
            if (!matchedValue) {
                throw new Error(`Unmatched token in DateTime string: ${token}`);
            }

            const key = DateFormatter._formatDate[token].key;
            const value = DateFormatter._formatDate[token].input(formatter, matchedValue[0], length);

            values.push({ key, value });

            formatString = formatString.substring(length);
            dateString = dateString.substring(matchedValue[0].length);
        }

        if (formatString) {
            compareStrings(formatString, dateString);
        }

        let timeZone = options.timeZone;
        for (const {key, value} of values) {
            if (key !== 'timeZone') {
                continue;
            }

            timeZone = value;
        }

        let datetime = this.fromArray([1970], {
            locale: options.locale,
            timeZone
        });

        let isPM = false;
        let lastAM = true;
        const methods = {
            date: value => datetime.setDate(value),
            dayPeriod: value => {
                isPM = value;
                let hours = value ? 12 : 0;
                if (lastAM) {
                    hours += datetime.getHours();
                }
                return datetime.setHours(hours);
            },
            dayOfWeek: value => datetime.setDayOfWeek(value),
            dayOfWeekInMonth: value => datetime.setDayOfWeekInMonth(value),
            dayOfYear: value => datetime.setDayOfYear(value),
            era: value => {
                const offset = value ? 1 : -1;
                return datetime.setYear(
                    datetime.getYear() * offset
                );
            },
            hours12: value => {
                if (isPM) {
                    value += 12;
                }
                lastAM = true;
                return datetime.setHours(value);
            },
            hours24: value => {
                lastAM = false;
                return datetime.setHours(value);
            },
            milliseconds: value => datetime.setMilliseconds(value),
            minutes: value => datetime.setMinutes(value),
            month: value => datetime.setMonth(value),
            quarter: value => datetime.setQuarter(value),
            seconds: value => datetime.setSeconds(value),
            week: value => datetime.setWeek(value),
            weekOfMonth: value => datetime.setWeekOfMonth(value),
            weekYear: value => datetime.setWeekYear(value),
            year: value => datetime.setYear(value)
        };

        const parseKeys = [
            ['year', 'weekYear'],
            ['era'],
            ['quarter', 'month', 'week', 'dayOfYear'],
            ['weekOfMonth'],
            ['date', 'dayOfWeek'],
            ['dayOfWeekInMonth'],
            ['hours24', 'hours12', 'dayPeriod'],
            ['minutes', 'seconds', 'milliseconds']
        ];

        for (const subKeys of parseKeys) {
            for (const subKey of subKeys) {
                for (const {key, value} of values) {
                    if (key !== subKey) {
                        continue;
                    }

                    datetime = methods[key](value);
                }
            }
        }

        if ('timeZone' in options && options.timeZone !== timeZone) {
            datetime.setTimeZone(options.timeZone);
        }

        datetime.isValid = datetime.format(originalFormat) === originalString;

        return datetime;
    },

    /**
     * Create a new DateTime from a timestamp.
     * @param {number} timestamp The timestamp.
     * @param {null|string} [timeZone] The timeZone.
     * @returns {DateTime} A new DateTime object.
     */
    fromTimestamp(timestamp, options = {}) {
        return new this(null, options)
            .setTimestamp(timestamp);
    },

    /**
     * Create a new DateTime for the current time.
     * @param {null|string} [timeZone] The timezone.
     */
    now(options = {}) {
        return new this(null, options);
    }

});

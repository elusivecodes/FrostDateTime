/**
 * DateTime (Static) Helpers
 */

Object.assign(DateTime, {

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
     * Compare a literal format string with a date string.
     * @param {string} formatString The literal format string.
     * @param {string} dateString The date string.
     */
    _parseCompare(formatString, dateString) {
        let i = 0,
            escaped = false;
        for (const char of formatString) {
            if (char === "'" && !escaped) {
                escaped = true;
                continue;
            }

            if (char !== dateString[i]) {
                throw new Error(`Unmatched character in DateTime string: ${char}`);
            }

            escaped = false;
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
            dayOfWeek: (datetime, value) => datetime.setDayOfWeek(value),
            dayOfWeekInMonth: (datetime, value) => datetime.setDayOfWeekInMonth(value),
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
            weekOfMonth: (datetime, value) => datetime.setWeekOfMonth(value),
            weekYear: (datetime, value) => datetime.setWeekYear(value),
            year: (datetime, value) => datetime.setYear(value)
        };
    },

    /**
     * Get unescaped characters from a literal format string.
     * @param {string} formatString The literal format string.
     * @returns {string} The unescaped characters.
     */
    _unescapeOutput(formatString) {
        let output = '',
            escaped = false;
        for (const char of formatString) {
            if (char === "'" && !escaped) {
                escaped = true;
                continue;
            }

            escaped = false;
            output += char;
        }
        return output;
    }

});

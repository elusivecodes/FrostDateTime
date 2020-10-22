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
            weekDay: (datetime, value) => datetime.setWeekDay(value),
            weekOfMonth: (datetime, value) => datetime.setWeekOfMonth(value),
            weekYear: (datetime, value) => datetime.setWeekYear(value),
            year: (datetime, value) => datetime.setYear(value)
        };
    }

});

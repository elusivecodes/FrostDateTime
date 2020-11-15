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
            date: {
                get: datetime => datetime.getDate(),
                set: (datetime, value) => datetime.setDate(value)
            },
            dayPeriod: {
                get: datetime => datetime.getHours() < 12 ? 0 : 1,
                set: (datetime, value) => {
                    isPM = value;
                    let hours = value ? 12 : 0;
                    if (lastAM) {
                        hours += datetime.getHours();
                    }
                    return datetime.setHours(hours);
                }
            },
            dayOfYear: {
                get: datetime => datetime.getDayOfYear(),
                set: (datetime, value) => datetime.setDayOfYear(value)
            },
            era: {
                get: datetime => datetime.getYear() < 1 ? 0 : 1,
                set: (datetime, value) => {
                    const offset = value ? 1 : -1;
                    return datetime.setYear(
                        datetime.getYear() * offset
                    );
                }
            },
            hours12: {
                get: datetime => datetime.getHours() % 12,
                set: (datetime, value) => {
                    if (isPM) {
                        value += 12;
                    }
                    lastAM = true;
                    return datetime.setHours(value);
                }
            },
            hours24: {
                get: datetime => datetime.getHours(),
                set: (datetime, value) => {
                    lastAM = false;
                    return datetime.setHours(value);
                }
            },
            milliseconds: {
                get: datetime => datetime.getMilliseconds(),
                set: (datetime, value) => datetime.setMilliseconds(value)
            },
            minutes: {
                get: datetime => datetime.getMinutes(),
                set: (datetime, value) => datetime.setMinutes(value)
            },
            month: {
                get: datetime => datetime.getMonth(),
                set: (datetime, value) => datetime.setMonth(value)
            },
            quarter: {
                get: datetime => datetime.getQuarter(),
                set: (datetime, value) => datetime.setQuarter(value)
            },
            seconds: {
                get: datetime => datetime.getSeconds(),
                set: (datetime, value) => datetime.setSeconds(value)
            },
            week: {
                get: datetime => datetime.getWeek(),
                set: (datetime, value) => datetime.setWeek(value)
            },
            weekDay: {
                get: datetime => datetime.getWeekDay(),
                set: (datetime, value) => datetime.setWeekDay(value)
            },
            weekDayInMonth: {
                get: datetime => datetime.getWeekDayInMonth(),
                set: (datetime, value) => datetime.setWeekDayInMonth(value)
            },
            weekOfMonth: {
                get: datetime => datetime.getWeekOfMonth(),
                set: (datetime, value) => datetime.setWeekOfMonth(value)
            },
            weekYear: {
                get: datetime => datetime.getWeekYear(),
                set: (datetime, value) => datetime.setWeekYear(value)
            },
            year: {
                get: datetime => datetime.getYear(),
                set: (datetime, value) => datetime.setYear(value)
            }
        };
    }

});

/**
 * DateTime (Static) Creation
 */

Object.assign(DateTime, {

    /**
     * Create a new DateTime from a date string and format string.
     * @param {string} formatString The PHP date format string.
     * @param {string} dateString The date string to parse.
     * @param {string} [timeZone] The timeZone to use for the new DateTime.
     * @returns {DateTime} A new DateTime object.
     */
    fromFormat(formatString, dateString, timeZone) {
        const originalDateString = dateString,
            data = [...formatString].reduce(
                (acc, char) => {
                    if (this._seperators.includes(char)) {
                        dateString = dateString.substring(1);
                        return acc;
                    }

                    if (!this._formatData[char] || !this._formatData[char].regex) {
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

                    if (['!', '|'].includes(char)) {
                        const epoch = {
                            year: 1970,
                            month: 0,
                            date: 1,
                            hours: 0,
                            pm: 0,
                            minutes: 0,
                            seconds: 0,
                            milliseconds: 0
                        };

                        return Object.assign(
                            acc,
                            char === '!' ?
                                epoch :
                                {
                                    ...epoch,
                                    ...data
                                }
                        );
                    }

                    if (this._formatData[char].input) {
                        const value = this._formatData[char].value;
                        acc[value] = this._formatData[char].input(dateMatch[1]);
                    }

                    return acc;
                },
                {}
            ),
            date = this.fromObject(data);

        date.isValid = date.format(formatString) === originalDateString;

        if (timeZone && timeZone !== date.getTimeZone()) {
            date.setTimeZone(timeZone, true);
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
     * @param {string} [dateObject.timeZone] The timeZone.
     * @param {string} [dateObject.timeZoneAbbr] The timeZone abbreviation.
     * @param {number} [dateObject.offset] The timeZone offset.
     * @param {string} [timeZone] The timeZone to use for the new DateTime.
     * @returns {DateTime} A new DateTime object.
     */
    fromObject(dateObject, timeZone) {

        let currentDate,
            currentDay,
            currentTimeZone,
            currentOffset;

        if (dateObject.timestamp) {
            currentDate = dateObject.timestamp * 1000;
        } else {
            if ('dayOfYear' in dateObject &&
                !('month' in dateObject || 'date' in dateObject)) {
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

            if ('day' in dateObject && !('date' in dateObject)) {
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

            if (!('date' in dateObject) && ('month' in dateObject || 'year' in dateObject)) {
                const days = this.daysInMonth(newDate.year, newDate.month);
                newDate.date = Math.min(days, newDate.date);
            }

            currentDate = [
                newDate.year,
                newDate.month,
                newDate.date,
                newDate.hours,
                newDate.minutes,
                newDate.seconds,
                newDate.milliseconds
            ];
        }

        if ('timeZone' in dateObject) {
            currentTimeZone = dateObject.timeZone;
            currentOffset = dateObject.offset;
        } else if ('offset' in dateObject || 'timeZoneAbbr' in dateObject) {
            [currentTimeZone, currentOffset] = this._timeZoneFromAbbrOffset(
                currentDate,
                'timeZoneAbbr' in dateObject ?
                    dateObject.timeZoneAbbr :
                    null,
                'offset' in dateObject ?
                    dateObject.offset :
                    null
            );
            dateObject.offset = currentOffset;
        }

        let date = new this(currentDate, currentTimeZone || timeZone);

        if (currentDay) {
            date = date.setDay(currentDay);
        }

        // compensate for DST transitions
        if (currentOffset) {
            const offset = date.getTimeZoneOffset();
            if (offset !== currentOffset) {
                date.setTime(date.getTime() - (offset - currentOffset) * 60000);
            }
        }

        if (timeZone && currentTimeZone) {
            date = date.setTimeZone(timeZone);
        }

        return date;
    }

});

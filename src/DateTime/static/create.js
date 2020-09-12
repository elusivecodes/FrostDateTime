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
        const date = new this(null, timeZone);
        return date.setTimestamp(timestamp);
    },

    /**
     * Create a new DateTime for the current time.
     * @param {null|string} [timeZone] The timezone.
     */
    now(timeZone) {
        return new this(null, timeZone);
    }

});

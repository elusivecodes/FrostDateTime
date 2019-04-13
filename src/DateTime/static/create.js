Object.assign(DateTime, {

    /**
     * Create a new DateTime from a date string and format string.
     * @param {string} dateString The date string to parse.
     * @param {string} formatString The PHP date format string.
     * @param {string} [timezone] The timezone to use for the new DateTime.
     * @returns {DateTime} A new DateTime object.
     */
    fromFormat(dateString, formatString, timezone) {
        const data = {};

        for (const char of [...formatString]) {
            if (this._seperators.includes(char)) {
                dateString = dateString.substring(1);
                return;
            }

            if (!this.formatData[char] || !this.formatData[char].regex) {
                throw new Error(`Invalid char in DateTime format: ${char}`);
            }

            const regex = this.formatData[char].regex,
                regexp = (typeof regex === 'function' ?
                    regex(char) :
                    regex
                ),
                dateMatch = dateString.match(new RegExp('^' + regexp));

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

                Object.assign(
                    data,
                    char === '!' ?
                        epoch :
                        {
                            ...epoch,
                            ...data
                        }
                );
            } else {
                if (!this.formatData[char].input) {
                    continue;
                }

                const value = this.formatData[char].value;
                data[value] = this.formatData[char].input(dateMatch[1]);
            }
        }

        return this.fromObject(data, timezone);
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
     * @param {string} [dateObject.timezone] The timezone.
     * @param {string} [dateObject.timezoneAbbr] The timezone abbreviation.
     * @param {number} [dateObject.offset] The timezone offset.
     * @param {string} [timezone] The timezone to use for the new DateTime.
     * @returns {DateTime} A new DateTime object.
     */
    fromObject(dateObject, timezone) {

        let currentDate,
            currentDay,
            currentTimezone;

        if (dateObject.timestamp) {
            currentDate = dateObject.timestamp * 1000;
        } else {
            if (dateObject.hasOwnProperty('dayOfYear') &&
                !(dateObject.hasOwnProperty('month') || dateObject.hasOwnProperty('date'))) {
                dateObject.month = 0;
                dateObject.date = dateObject.dayOfYear;
            }

            if (dateObject.hasOwnProperty('hours') && dateObject.hasOwnProperty('pm')) {
                dateObject.hours = (dateObject.hours % 12) + (dateObject.pm ? 12 : 0);
            }

            if (dateObject.hasOwnProperty('day') && !dateObject.hasOwnProperty('date')) {
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

        if (dateObject.hasOwnProperty('timezone')) {
            currentTimezone = dateObject.timezone;
        } else if (dateObject.hasOwnProperty('offset') || dateObject.hasOwnProperty('timezoneAbbr')) {
            currentTimezone = this.timezoneFromAbbrOffset(
                currentDate,
                dateObject.hasOwnProperty('timezoneAbbr') ?
                    dateObject.timezoneAbbr :
                    null,
                dateObject.hasOwnProperty('offset') ?
                    dateObject.offset :
                    null
            );
        }

        let date = new this(currentDate, currentTimezone || timezone);

        if (currentDay) {
            date = date.setDay(currentDay);
        }

        if (timezone && currentTimezone) {
            date = date.setTimezone(timezone);
        }

        return date;
    }

});

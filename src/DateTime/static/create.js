Object.assign(DateTime, {

    /**
     * Create a new DateTime from a date string and format string
     * @param {string} dateString The date string
     * @param {string} formatString The string the date is formatted in
     * @returns {DateTime} The new DateTime object
     */
    fromFormat(dateString, formatString)
    {
        const data = {};

        formatString.split('').forEach(token =>
        {
            if (this.seperators.includes(token)) {
                dateString = dateString.substring(1);
                return;
            }

            if (!this.formatData[token] || !this.formatData[token].regex) {
                throw new Error(`Invalid token in DateTime format: ${token}`);
            }

            const regex = this.formatData[token].regex;
            const regexp = typeof regex === 'function' ?
                regex(token) :
                regex;
            const dateMatch = dateString.match(new RegExp('^' + regexp));

            if (!dateMatch) {
                throw new Error(`Unmatched token in DateTime string: ${token}`);
            }

            dateString = dateString.substring(dateMatch[1].length);

            if (['!', '|'].includes(token)) {
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
                    token === '!' ?
                        epoch :
                        {
                            ...epoch,
                            ...data
                        }
                );
            } else {
                if (!this.formatData[token].input) {
                    return;
                }

                const value = this.formatData[token].value;
                data[value] = this.formatData[token].input(dateMatch[1]);
            }
        });

        return this.fromObject(data);
    },

    /**
     * Create a new DateTime from an object containing date properties
     * @param {object} dateObject The object containing date properties
     * @returns {DateTime} The new DateTime object
     */
    fromObject(dateObject)
    {
        let date;
        if (dateObject.timestamp) {
            date = dateObject.timestamp * 1000;
        } else {
            const now = new Date;

            if (dateObject.hasOwnProperty('dayOfYear') &&
                !(dateObject.hasOwnProperty('month') || dateObject.hasOwnProperty('date'))) {
                dateObject.month = 0;
                dateObject.date = dateObject.dayOfYear;
            }

            if (dateObject.hasOwnProperty('hours') && dateObject.hasOwnProperty('pm')) {
                dateObject.hours = (dateObject.hours % 12) + (dateObject.pm ? 12 : 0);
            }

            const newDate = {
                year: now.getFullYear(),
                month: now.getMonth(),
                date: now.getDate(),
                hours: now.getHours(),
                minutes: now.getMinues(),
                seconds: now.getSeconds(),
                milliseconds: now.getMilliseconds(),
                ...DateObject
            };

            date = [
                newDate.year,
                newDate.month,
                newDate.date,
                newDate.hours,
                newDate.minutes,
                newDate.seconds,
                newDate.milliseconds
            ];
        }

        let timezone = null;
        if (dateObject.hasOwnProperty('timezone')) {
            timezone = dateObject.timezone;
        } else if (dateObject.hasOwnProperty('offset') || dateObject.hasOwnProperty('timezoneAbbr')) {
            timezone = this.timezoneFromAbbrOffset(
                date,
                dateObject.hasOwnProperty('timezoneAbbr') ?
                    dateObject.timezoneAbbr :
                    null,
                dateObject.hasOwnProperty('offset') ?
                    dateObject.offset :
                    null
            );
        }

        return new this(date, timezone);
    }

});
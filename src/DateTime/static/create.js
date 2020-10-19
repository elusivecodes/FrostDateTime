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

            if (!(token in DateFormatter._formatDate)) {
                throw new Error(`Invalid token in DateTime format: ${token}`);
            }

            if (position) {
                const formatTest = formatString.substring(0, position);
                this._parseCompare(formatTest, dateString);
            }

            formatString = formatString.substring(position);
            dateString = dateString.substring(position);

            const regExp = DateFormatter._formatDate[token].regex(formatter, length),
                matchedValue = dateString.match(new RegExp(`^${regExp}`));

            if (!matchedValue) {
                throw new Error(`Unmatched token in DateTime string: ${token}`);
            }

            const key = DateFormatter._formatDate[token].key,
                value = DateFormatter._formatDate[token].input(formatter, matchedValue[0], length);

            values.push({ key, value });

            formatString = formatString.substring(length);
            dateString = dateString.substring(matchedValue[0].length);
        }

        if (formatString) {
            this._parseCompare(formatString, dateString);
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

        const methods = this._parseFactory();

        for (const subKeys of this._parseOrderKeys) {
            for (const subKey of subKeys) {
                for (const {key, value} of values) {
                    if (key !== subKey) {
                        continue;
                    }

                    datetime = methods[key](datetime, value);
                }
            }
        }

        if ('timeZone' in options && options.timeZone !== timeZone) {
            datetime = datetime.setTimeZone(options.timeZone);
        }

        datetime.isValid = datetime.format(originalFormat) === originalString;

        return datetime;
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

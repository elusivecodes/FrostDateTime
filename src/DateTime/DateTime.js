/**
 * DateTime class
 * @class
 */
class DateTime {

    /**
     * New DateTime constructor.
     * @param {null|string} [dateString] The date to parse.
     * @param {null|string} [timeZone] The timeZone.
     * @returns {DateTime} A new DateTime object.
     */
    constructor(dateString = null, timeZone = null) {

        let timestamp,
            adjustOffset = false;

        if (dateString === null) {
            timestamp = Date.now();
        } else if (dateString === `${dateString}`) {
            timestamp = Date.parse(dateString);

            if (isNaN(timestamp)) {
                throw new Error('Invalid date string supplied');
            }

            if (!dateString.match(this.constructor._dateStringTimeZoneRegExp)) {
                timestamp -= new Date()
                    .getTimezoneOffset()
                    * 60000;
            }

            adjustOffset = true;
        } else {
            throw new Error('Invalid date supplied');
        }

        this._utcDate = new Date(timestamp);
        this._fraction = 0;
        this._dynamicTz = false;
        this.isValid = true;

        if (!timeZone) {
            timeZone = this.constructor.defaultTimeZone;
        }

        const match = timeZone.match(this.constructor._offsetRegExp);
        if (match) {
            this._offset = match[2] * 60 + parseInt(match[4]);
            if (this._offset && match[1] === '+') {
                this._offset *= -1;
            }
            this._timeZone = this.constructor._formatOffset(this._offset);
        } else if (timeZone in this.constructor._abbreviations) {
            this._offset = this.constructor._abbreviations[timeZone];
            this._timeZone = timeZone;
        } else if (timeZone in this.constructor._timeZones) {
            this._dynamicTz = true;
            this._timeZone = timeZone;

            this._makeFormatter();
            this._checkOffset();
        } else {
            throw new Error('Invalid timeZone supplied');
        }

        if (adjustOffset) {
            this._adjustOffset();
        }

        if (this._dynamicTz) {
            this._getTransition();
        }
    }

    /**
     * Get an object representation of the date/time.
     * @returns {object} An object representation of the date/time.
     */
    toObject() {
        return {
            year: this.getYear(),
            month: this.getMonth(),
            date: this.getDate(),
            hours: this.getHours(),
            minutes: this.getMinutes(),
            seconds: this.getSeconds(),
            milliseconds: this.getMilliseconds(),
            timeZone: this.getTimeZone()
        };
    }

    /**
     * Get the number of milliseconds since the UNIX epoch.
     * @returns {number} The number of milliseconds since the UNIX epoch.
     */
    valueOf() {
        return this.getTime();
    }

    /**
     * Return a primitive value of the DateTime.
     * @returns {string|number}
     */
    [Symbol.toPrimitive](hint) {
        return hint === 'number' ?
            this.valueOf() :
            this.toString();
    }

}

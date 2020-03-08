/**
 * DateTime class
 * @class
 */
class DateTime {

    /**
     * New DateTime constructor.
     * @param {null|number|number[]|string|Date|DateTime} [date] The date to parse.
     * @param {null|string} [timeZone] The timeZone.
     * @returns {DateTime} A new DateTime object.
     */
    constructor(date = null, timeZone = null) {

        let timestamp,
            adjustOffset = false;

        if (date === null) {
            timestamp = Date.now();
        } else if (Array.isArray(date)) {
            timestamp = Date.UTC(...date);
            adjustOffset = true;
        } else if (
            !isNaN(
                parseFloat(date)
            ) &&
            isFinite(date)
        ) {
            timestamp = date;
        } else if (date === `${date}`) {
            timestamp = Date.parse(date);

            if (isNaN(timestamp)) {
                throw new Error('Invalid date string supplied');
            }

            if (!date.match(this.constructor._dateStringTimeZoneRegExp)) {
                timestamp -= new Date()
                    .getTimezoneOffset()
                    * 60000;
            }

            adjustOffset = true;
        } else if (
            date instanceof Date ||
            date instanceof DateTime
        ) {
            timestamp = date.getTime();
        } else {
            throw new Error('Invalid date supplied');
        }

        this._utcDate = new Date(timestamp);
        this._fraction = 0;
        this._dynamicTz = false;
        this.isValid = true;

        if (!timeZone) {
            if (date instanceof DateTime) {
                timeZone = date.getTimeZone();
            } else {
                timeZone = this.constructor.defaultTimeZone;
            }
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

        if (this._offset && adjustOffset) {
            const oldOffset = this._offset;
            this._utcDate.setTime(
                this.getTime()
                + this._offset * 60000
            );

            if (this._dynamicTz) {
                this._checkOffset();

                // compensate for DST transitions
                if (oldOffset !== this._offset) {
                    this._utcDate.setTime(
                        this._utcDate.getTime()
                        - (oldOffset - this._offset) * 60000
                    );
                }
            }
        }

        if (this._dynamicTz) {
            this._getTransition();
        }
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

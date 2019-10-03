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
        } else if (!isNaN(parseFloat(date)) && isFinite(date)) {
            timestamp = date;
        } else if (date === `${date}`) {
            timestamp = Date.parse(date);
            timestamp -= new Date().getTimeZoneOffset() * 60000;
            adjustOffset = true;
        } else if (date instanceof Date || date instanceof DateTime) {
            timestamp = date.getTime();
        } else {
            throw new Error('Invalid date supplied');
        }

        if (!timeZone) {
            if (date instanceof DateTime) {
                timeZone = date.getTimeZone();
            } else {
                timeZone = DateTime.defaultTimeZone;
            }
        } else if (!(timeZone in DateTime._timeZones)) {
            throw new Error('Invalid timeZone supplied');
        }

        this._utcDate = new Date(timestamp);
        this._timeZone = timeZone;
        this.isValid = true;

        this._makeFormatter();
        this._checkOffset();

        if (this._offset && adjustOffset) {
            const offset = this._offset;
            this._utcDate.setTime(this.getTime() + this._offset * 60000);
            this._checkOffset();

            // compensate for DST transitions
            if (offset !== this._offset) {
                this._utcDate.setTime(this._utcDate.getTime() - (offset - this._offset) * 60000);
            }
        }

        this._getTransition();
        this._offsetDate = new Date(this._getOffsetTime());
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

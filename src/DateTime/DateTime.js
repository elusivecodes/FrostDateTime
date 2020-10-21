/**
 * DateTime class
 * @class
 */
class DateTime {

    /**
     * New DateTime constructor.
     * @param {null|string} [dateString] The date to parse.
     * @param {object} [options] Options for the new DateTime.
     * @param {string} [options.locale] The locale to use.
     * @param {string} [options.timeZone] The timeZone to use.
     * @returns {DateTime} A new DateTime object.
     */
    constructor(dateString = null, options = {}) {

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

        let timeZone = options.timeZone;

        if (!timeZone) {
            timeZone = this.constructor.defaultTimeZone;
        }

        const match = timeZone.match(this.constructor._offsetRegExp);
        if (match) {
            this._offset = match[2] * 60 + parseInt(match[4]);
            if (this._offset && match[1] === '+') {
                this._offset *= -1;
            }
            this._timeZone = DateFormatter.formatOffset(this._offset);
        } else {
            if (['Z', 'GMT'].includes(timeZone)) {
                timeZone = 'UTC';
            }

            this._dynamicTz = true;
            this._timeZone = timeZone;

            this._makeFormatter();
            this._checkOffset();
        }

        if (adjustOffset) {
            this._adjustOffset();
        }

        this.formatter = DateFormatter.load(options.locale);
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

class DateTime
{

    /**
     * New DateTime constructor
     * @param {null|int|string|array|Date|DateTime} [date] The date to use for the new DateTime
     * @param {?string} [timezone] The timezone to use for the new DateTime
     * @returns {DateTime} The new DateTime object
     */
    constructor(date = null, timezone = null)
    {

        let timestamp;
        if (date === null) {
            timestamp = Date.now();
        } else if (Array.isArray(date)) {
            timestamp = Date.UTC(...date);
        } else if (isNumeric(date)) {
            timestamp = date;
        } else if (date === '' + date) {
            timestamp = Date.parse(date);
        } else if (date instanceof Date || date instanceof DateTime) {
            timestamp = date.getTime();
        } else {
            throw new Error('Invalid date supplied');
        }

        if (!timezone) {
            if (date instanceof DateTime) {
                timezone = date.getTimezone();
            } else {
                timezone = DateTime.defaultTimezone;
            }
        } else if (!DateTime.timezones[timezone]) {
            throw new Error('Invalid timezone supplied');
        }

        this.utcDate = new Date(timestamp);
        this.timezone = timezone;

        this._makeFormatter();
        this._checkOffset();

        if (this.offset && Array.isArray(date)) {
            this.utcDate.setTime(this.getTime() + this.offset * 60000);
        }

        this._checkOffset();
        this._getTransition();
    }

    valueOf()
    {
        return this.getTime();
    }

    [Symbol.toPrimitive](hint)
    {
        return hint === 'number' ?
            this.valueOf() :
            this.toString();
    }

}
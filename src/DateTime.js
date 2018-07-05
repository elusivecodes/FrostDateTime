class DateTime {
    constructor(date = null, timezone = null, offset = null) {

        let timestamp;
        if (date === null) {
            timestamp = Date.now();
        } else if (frost.isArray(date)) {
            timestamp = Date.UTC(...date);
        } else if (frost.isNumeric(date)) {
            timestamp = date;
        } else if (frost.isString(date)) {
            timestamp = Date.parse(date);
        } else if (date instanceof Date || date instanceof DateTime) {
            timestamp = date.getTime();
        } else {
            console.error('Invalid date supplied');
            return false;
        }

        if ( ! timezone) {
            if (offset !== null) {
                timezone = DateTime.timezoneFromOffset(timestamp + offset * 60000, offset);
            } else if (date instanceof DateTime) {
                timezone = date.getTimezone();
            }
        }

        this._timezone = timezone || DateTime.defaultTimezone;
        this._offset = DateTime.calculateTimezoneOffset(this._timezone, timestamp);

        if (this._offset && frost.isArray(date)) {
            timestamp += this._offset * 60000;
        }

        this._date = new Date(timestamp);
        this._checkOffset();
    }

    getLocalTime() {
        return this._date.getTime() - (this._offset * 60000);
    }

    getLocalTimestamp() {
        return (this._date.getTime() - (this._offset * 60000)) / 1000;
    }

    getTime() {
        return this._date.getTime();
    }

    getTimestamp() {
        return this._date.getTime() / 1000;
    }

    getTimezone() {
        return this._timezone;
    }

    getTimezoneOffset() {
        return this._offset;
    }

    setLocalTime(time) {
        this._date.setTime(time + (this._offset * 60000));
        return this._checkOffset();
    }

    setLocalTimestamp(timestamp) {
        this._date.setTime((timestamp + (this._offset * 60000)) * 1000);
        return this._checkOffset();
    }

    setTime(time) {
        this._date.setTime(time);
        return this._checkOffset();
    }

    setTimestamp(timestamp) {
        this._date.setTime(timestamp * 1000);
        return this._checkOffset();
    }

    setTimezone(timezone) {
        this._timezone = timezone;
        return this._checkOffset();
    }

    setTimezoneOffset(offset) {
        const timezone = DateTime.timezoneFromOffset(this.getTime(), offset);
        if (timezone) {
            this.setTimezone(timezone);
        }
        return this;
    }

    toDateString() {
        return this.format(DateTime.formats.string)
    }

    toLocaleDateString() {
        return this._date.toLocaleDateString();
    }

    toLocaleString() {
        return this._date.toLocaleString();
    }

    toLocaleTimeString() {
        return this._date.toLocaleTimeString();
    }

    toISOString() {
        return this.format(DateTime.formats.rfc3339_extended)
    }

    toString() {
        return this.format(DateTime.formats.string);
    }

    toTimeString() {
        return this.format(DateTime.formats.time);
    }

    toUTCString() {
        return this._date.toUTCString();
    }

    valueOf() {
        return this.getTime();
    }

    [Symbol.toPrimitive](hint) {
        return this._date[Symbol.toPrimitive](hint);
    }

}

frost.DateTime = DateTime;
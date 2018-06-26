class DateTime {
    constructor() {
        this._date = new Date(...arguments);

        this._offset = 0;
        this._timezone = 'UTC';

        const offset = this._date.getTimezoneOffset();
        this.offset(offset);

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.timezone(timezone);
    }

    toDateString() {
        return this.format(DateTime.formats.date);
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

    valueOf() {
        return this.time();
    }

    [Symbol.toPrimitive](hint) {
        return hint === 'number' ?
            this.valueOf() :
            this.toString();
    }

}
class DateTimeImmutable extends DateTime {
    constructor() {
        super(...arguments);
    }

    setLocalTime(time) {
        return new DateTimeImmutable(time + (this._offset * 60000), this._timezone);
    }

    setTime(time) {
        return new DateTimeImmutable(time, this._timezone);
    }

    setTimezone(timezone) {
        return new DateTimeImmutable(this._date.getTime(), timezone);
    }

    setTimezoneOffset(offset) {
        const timestamp = this._date.getTime();
        const timezone = DateTime.timezoneFromOffset(timestamp, offset);
        return new DateTimeImmutable(timestamp, timezone || this._timezone);
    }
}
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
        return new DateTimeImmutable(this._date.getTime(), this._timezone, offset);
    }
}

Frost.DateTimeImmutable = DateTimeImmutable;
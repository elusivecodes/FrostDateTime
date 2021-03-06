/**
 * DateTimeImmutable class
 * @class
 */
class DateTimeImmutable extends DateTime {

    /**
     * Set the current locale.
     * @param {string} locale The name of the timeZone.
     * @returns {DateTimeImmutable} A new DateTimeImmutable object.
     */
    setLocale(locale) {
        return this.constructor.fromDate(this._utcDate, {
            locale,
            timeZone: this.getTimeZone()
        });
    }

    /**
     * Set the number of milliseconds since the UNIX epoch.
     * @param {number} time The number of milliseconds since the UNIX epoch.
     * @returns {DateTimeImmutable} A new DateTimeImmutable object.
     */
    setTime(time) {
        const date = new this.constructor(null, {
            locale: this.getLocale(),
            timeZone: this.getTimeZone()
        });

        date._utcDate.setTime(time);

        if (date._dynamicTz) {
            date._checkOffset();
        }

        return date;
    }

    /**
     * Set the current timeZone.
     * @param {string} timeZone The name of the timeZone.
     * @returns {DateTimeImmutable} A new DateTimeImmutable object.
     */
    setTimeZone(timeZone) {
        return this.constructor.fromDate(this._utcDate, {
            locale: this.getLocale(),
            timeZone
        });
    }

    /**
     * Set the current UTC offset.
     * @param {number} offset The UTC offset (in minutes).
     * @returns {DateTimeImmutable} The DateTime object.
     */
    setTimeZoneOffset(offset) {
        return this.constructor.fromDate(this._utcDate, {
            locale: this.getLocale(),
            timeZone: DateFormatter.formatOffset(offset)
        });
    }

}

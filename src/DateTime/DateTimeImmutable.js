/**
 * DateTimeImmutable class
 * @class
 */
class DateTimeImmutable extends DateTime {

    /**
     * Set the number of milliseconds since the UNIX epoch.
     * @param {number} time The number of milliseconds since the UNIX epoch.
     * @returns {DateTimeImmutable} A new DateTimeImmutable object.
     */
    setTime(time) {
        return new DateTimeImmutable(time, this._timezone);
    }

    /**
     * Set the current timezone.
     * @param {string} timezone The name of the timezone.
     * @returns {DateTimeImmutable} A new DateTimeImmutable object.
     */
    setTimezone(timezone) {
        return new DateTimeImmutable(this, timezone);
    }

}

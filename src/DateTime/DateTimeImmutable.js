/**
 * DateTimeImmutable class
 * @class
 */
class DateTimeImmutable extends DateTime {

    /**
     * Create a new DateTimeImmutable using the current date and timeZone.
     * @returns {DateTimeImmutable} A new DateTimeImmutable object.
     */
    clone() {
        return new DateTimeImmutable(this);
    }

    /**
     * Set the number of milliseconds since the UNIX epoch.
     * @param {number} time The number of milliseconds since the UNIX epoch.
     * @returns {DateTimeImmutable} A new DateTimeImmutable object.
     */
    setTime(time) {
        return new DateTimeImmutable(time, this._timeZone);
    }

    /**
     * Set the current timeZone.
     * @param {string} timeZone The name of the timeZone.
     * @returns {DateTimeImmutable} A new DateTimeImmutable object.
     */
    setTimeZone(timeZone) {
        return new DateTimeImmutable(this, timeZone);
    }

}

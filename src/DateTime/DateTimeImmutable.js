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
        const tempDate = new DateTimeImmutable(null, {
            locale: this._formatter.locale,
            timeZone: this.getTimeZone()
        });
        tempDate._utcDate = new Date(time);

        if (tempDate._dynamicTz) {
            tempDate._checkOffset();
        }

        return tempDate;
    }

    /**
     * Set the current timeZone.
     * @param {string} timeZone The name of the timeZone.
     * @returns {DateTimeImmutable} A new DateTimeImmutable object.
     */
    setTimeZone(timeZone) {
        const tempDate = new DateTimeImmutable(null, {
            locale: this._formatter.locale,
            timeZone
        });
        return tempDate.setTime(this.getTime());
    }

    /**
     * Set the current UTC offset.
     * @param {number} offset The UTC offset (in minutes).
     * @returns {DateTimeImmutable} The DateTime object.
     */
    setTimeZoneOffset(offset) {
        const tempDate = this.clone();

        tempDate._dynamicTz = false;
        tempDate._offset = offset || 0;
        tempDate._timeZone = this.constructor._formatOffset(tempDate._offset);
        tempDate._formatter = null;

        return tempDate;
    }

}

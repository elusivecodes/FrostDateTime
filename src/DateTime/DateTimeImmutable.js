class DateTimeImmutable extends DateTime
{

    /**
     * Set the number of milliseconds since the UNIX epoch
     * @param {int} time The number of milliseconds since the UNIX epoch to set
     * @returns {DateTimeImmutable}
     */
    setTime(time)
    {
        return new DateTimeImmutable(time, this.timezone);
    }

    /**
     * Set the current timezone
     * @param {string} timezone The name of the timezone to set
     * @returns {DateTimeImmutable}
     */
    setTimezone(timezone)
    {
        return new DateTimeImmutable(this, timezone);
    }

}
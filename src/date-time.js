import { getOffset } from './helpers.js';
import { config, dateStringTimeZoneRegExp, offsetRegExp } from './vars.js';
import { formatOffset } from './formatter/format.js';

/**
 * DateTime class
 * @class
 */
export default class DateTime {
    #date;
    #timeZone;
    #locale;
    #offset = 0;
    #dynamicTz;

    /**
     * New DateTime constructor.
     * @param {string|number|null} [date] The date or timestamp to parse.
     * @param {object} [options] Options for the new DateTime.
     * @param {string} [options.timeZone] The timeZone to use.
     * @param {string} [options.locale] The locale to use.
     */
    constructor(date = null, options = {}) {
        let timestamp;
        let adjustOffset = false;

        if (date === null) {
            timestamp = Date.now();
        } else if (!isNaN(parseInt(date)) && isFinite(date)) {
            timestamp = date;
        } else if (date === `${date}`) {
            timestamp = Date.parse(date);

            if (isNaN(timestamp)) {
                throw new Error('Invalid date string supplied');
            }

            if (!date.match(dateStringTimeZoneRegExp)) {
                timestamp -= new Date()
                    .getTimezoneOffset() *
                    60000;
            }

            adjustOffset = true;
        } else {
            throw new Error('Invalid date supplied');
        }

        this.#date = new Date(timestamp);
        this.#dynamicTz = false;
        this.isValid = true;

        let timeZone = options.timeZone;

        if (!timeZone) {
            timeZone = config.defaultTimeZone;
        }

        if (['Z', 'GMT'].includes(timeZone)) {
            timeZone = 'UTC';
        }

        const match = timeZone.match(offsetRegExp);
        if (match) {
            this.#offset = match[2] * 60 + parseInt(match[4] || 0);
            if (this.#offset && match[1] === '+') {
                this.#offset *= -1;
            }

            if (this.#offset) {
                this.#timeZone = formatOffset(this.#offset);
            } else {
                this.#dynamicTz = true;
                this.#timeZone = 'UTC';
            }
        } else {
            this.#dynamicTz = true;
            this.#timeZone = timeZone;
        }

        if (this.#dynamicTz) {
            this.#offset = getOffset(this);
        }

        if (adjustOffset && this.#offset) {
            const oldOffset = this.#offset;

            this.#date.setTime(this.getTime() + this.#offset * 60000);

            if (this.#dynamicTz) {
                this.#offset = getOffset(this);

                // compensate for DST transitions
                if (oldOffset !== this.#offset) {
                    this.#date.setTime(this.getTime() - ((oldOffset - offset) * 60000));
                }
            }
        }

        if (!('locale' in options)) {
            options.locale = config.defaultLocale;
        }

        this.#locale = options.locale;
    }

    /**
     * Get the name of the current locale.
     * @return {string} The name of the current locale.
     */
    getLocale() {
        return this.#locale;
    }

    /**
     * Get the number of milliseconds since the UNIX epoch.
     * @return {number} The number of milliseconds since the UNIX epoch.
     */
    getTime() {
        return this.#date.getTime();
    }

    /**
     * Get the name of the current timeZone.
     * @return {string} The name of the current timeZone.
     */
    getTimeZone() {
        return this.#timeZone;
    }

    /**
     * Get the UTC offset (in minutes) of the current timeZone.
     * @return {number} The UTC offset (in minutes) of the current timeZone.
     */
    getTimeZoneOffset() {
        return this.#offset;
    }

    /**
     * Determine if the timeZone is dynamic.
     * @return {Boolean} TRUE if the timeZone is dynamic, otherwise FALSE.
     */
    isDynamicTimeZone() {
        return this.#dynamicTz;
    }

    /**
     * Set the current locale.
     * @param {string} locale The name of the timeZone.
     * @return {DateTime} The DateTime object.
     */
    setLocale(locale) {
        return new DateTime(this.getTime(), {
            locale,
            timeZone: this.#timeZone,
        });
    }

    /**
     * Set the number of milliseconds since the UNIX epoch.
     * @param {number} time The number of milliseconds since the UNIX epoch.
     * @return {DateTime} The DateTime object.
     */
    setTime(time) {
        return new DateTime(time, {
            locale: this.#locale,
            timeZone: this.#timeZone,
        });
    }

    /**
     * Set the current timeZone.
     * @param {string} timeZone The name of the timeZone.
     * @return {DateTime} The DateTime object.
     */
    setTimeZone(timeZone) {
        return new DateTime(this.getTime(), {
            locale: this.#locale,
            timeZone,
        });
    }

    /**
     * Set the current UTC offset.
     * @param {number} offset The UTC offset (in minutes).
     * @return {DateTime} The DateTime object.
     */
    setTimeZoneOffset(offset) {
        return new DateTime(this.getTime(), {
            locale: this.#locale,
            timeZone: formatOffset(offset),
        });
    }

    /**
     * Get the number of milliseconds since the UNIX epoch.
     * @return {number} The number of milliseconds since the UNIX epoch.
     */
    valueOf() {
        return this.getTime();
    }

    /**
     * Return a primitive value of the DateTime.
     * @param {string} hint The type hint.
     * @return {string|number}
     */
    [Symbol.toPrimitive](hint) {
        return hint === 'number' ?
            this.valueOf() :
            this.toString();
    }
}

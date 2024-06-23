import { calculateDiff, getBiggestDiff } from './../helpers.js';
import { formatRelative } from './../formatter/format.js';

/**
 * DateTime Comparisons
 */

/**
 * Get the difference between this and another Date in milliseconds.
 * @param {DateTime} other The date to compare to.
 * @return {number} The difference.
 */
export function diff(other) {
    return this - other;
};

/**
 * Get the difference between this and another Date in days.
 * @param {DateTime} other The date to compare to.
 * @param {object} [options] The options for comparing the dates.
 * @param {Boolean} [options.relative=true] Whether to use the relative difference.
 * @return {number} The difference.
 */
export function diffInDays(other, { relative = true } = {}) {
    return calculateDiff(this, other, 'day', relative);
};

/**
 * Get the difference between this and another Date in hours.
 * @param {DateTime} other The date to compare to.
 * @param {object} [options] The options for comparing the dates.
 * @param {Boolean} [options.relative=true] Whether to use the relative difference.
 * @return {number} The difference.
 */
export function diffInHours(other, { relative = true } = {}) {
    return calculateDiff(this, other, 'hour', relative);
};

/**
 * Get the difference between this and another Date in minutes.
 * @param {DateTime} other The date to compare to.
 * @param {object} [options] The options for comparing the dates.
 * @param {Boolean} [options.relative=true] Whether to use the relative difference.
 * @return {number} The difference.
 */
export function diffInMinutes(other, { relative = true } = {}) {
    return calculateDiff(this, other, 'minute', relative);
};

/**
 * Get the difference between this and another Date in months.
 * @param {DateTime} other The date to compare to.
 * @param {object} [options] The options for comparing the dates.
 * @param {Boolean} [options.relative=true] Whether to use the relative difference.
 * @return {number} The difference.
 */
export function diffInMonths(other, { relative = true } = {}) {
    return calculateDiff(this, other, 'month', relative);
};

/**
 * Get the difference between this and another Date in seconds.
 * @param {DateTime} other The date to compare to.
 * @param {object} [options] The options for comparing the dates.
 * @param {Boolean} [options.relative=true] Whether to use the relative difference.
 * @return {number} The difference.
 */
export function diffInSeconds(other, { relative = true } = {}) {
    return calculateDiff(this, other, 'second', relative);
};

/**
 * Get the difference between this and another Date in weeks.
 * @param {DateTime} other The date to compare to.
 * @param {object} [options] The options for comparing the dates.
 * @param {Boolean} [options.relative=true] Whether to use the relative difference.
 * @return {number} The difference.
 */
export function diffInWeeks(other, { relative = true } = {}) {
    return calculateDiff(this, other, 'week', relative);
};

/**
 * Get the difference between this and another Date in years.
 * @param {DateTime} other The date to compare to.
 * @param {object} [options] The options for comparing the dates.
 * @param {Boolean} [options.relative=true] Whether to use the relative difference.
 * @return {number} The difference.
 */
export function diffInYears(other, { relative = true } = {}) {
    return calculateDiff(this, other, 'year', relative);
};

/**
 * Get the difference between this and another Date in human readable form.
 * @param {DateTime} other The date to compare to.
 * @return {string} The difference in human readable form.
 */
export function humanDiff(other) {
    const [amount, unit] = getBiggestDiff(this, other);
    return formatRelative(this.getLocale(), amount, unit);
};

/**
 * Get the difference between this and another Date in days in human readable form.
 * @param {DateTime} other The date to compare to.
 * @return {string} The difference in days in human readable form.
 */
export function humanDiffInDays(other) {
    return formatRelative(this.getLocale(), this.diffInDays(other), 'day');
};

/**
 * Get the difference between this and another Date in hours in human readable form.
 * @param {DateTime} other The date to compare to.
 * @return {string} The difference in hours in human readable form.
 */
export function humanDiffInHours(other) {
    return formatRelative(this.getLocale(), this.diffInHours(other), 'hour');
};

/**
 * Get the difference between this and another Date in minutes in human readable form.
 * @param {DateTime} other The date to compare to.
 * @return {string} The difference in minutes in human readable form.
 */
export function humanDiffInMinutes(other) {
    return formatRelative(this.getLocale(), this.diffInMinutes(other), 'minute');
};

/**
 * Get the difference between this and another Date in months in human readable form.
 * @param {DateTime} other The date to compare to.
 * @return {string} The difference in months in human readable form.
 */
export function humanDiffInMonths(other) {
    return formatRelative(this.getLocale(), this.diffInMonths(other), 'month');
};

/**
 * Get the difference between this and another Date in seconds in human readable form.
 * @param {DateTime} other The date to compare to.
 * @return {string} The difference in seconds in human readable form.
 */
export function humanDiffInSeconds(other) {
    return formatRelative(this.getLocale(), this.diffInSeconds(other), 'second');
};

/**
 * Get the difference between this and another Date in weeks in human readable form.
 * @param {DateTime} other The date to compare to.
 * @return {string} The difference in weeks in human readable form.
 */
export function humanDiffInWeeks(other) {
    return formatRelative(this.getLocale(), this.diffInWeeks(other), 'week');
};

/**
 * Get the difference between this and another Date in years in human readable form.
 * @param {DateTime} other The date to compare to.
 * @return {string} The difference in years in human readable form.
 */
export function humanDiffInYears(other) {
    return formatRelative(this.getLocale(), this.diffInYears(other), 'year');
};

/**
 * Determine whether this DateTime is after another date.
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is after the other date, otherwise FALSE.
 */
export function isAfter(other) {
    return this.diff(other) > 0;
}

/**
 * Determine whether this DateTime is after another date (comparing by day).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is after the other date (comparing by day), otherwise FALSE.
 */
export function isAfterDay(other) {
    return this.diffInDays(other) > 0;
}

/**
 * Determine whether this DateTime is after another date (comparing by hour).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is after the other date (comparing by hour), otherwise FALSE.
 */
export function isAfterHour(other) {
    return this.diffInHours(other) > 0;
}

/**
 * Determine whether this DateTime is after another date (comparing by minute).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is after the other date (comparing by minute), otherwise FALSE.
 */
export function isAfterMinute(other) {
    return this.diffInMinutes(other) > 0;
}

/**
 * Determine whether this DateTime is after another date (comparing by month).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is after the other date (comparing by month), otherwise FALSE.
 */
export function isAfterMonth(other) {
    return this.diffInMonths(other) > 0;
}

/**
 * Determine whether this DateTime is after another date (comparing by second).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is after the other date (comparing by second), otherwise FALSE.
 */
export function isAfterSecond(other) {
    return this.diffInSeconds(other) > 0;
}

/**
 * Determine whether this DateTime is after another date (comparing by week).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is after the other date (comparing by week), otherwise FALSE.
 */
export function isAfterWeek(other) {
    return this.diffInWeeks(other) > 0;
}

/**
 * Determine whether this DateTime is after another date (comparing by year).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is after the other date (comparing by year), otherwise FALSE.
 */
export function isAfterYear(other) {
    return this.diffInYears(other) > 0;
}

/**
 * Determine whether this DateTime is before another date.
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is before the other date, otherwise FALSE.
 */
export function isBefore(other) {
    return this.diff(other) < 0;
}

/**
 * Determine whether this DateTime is before another date (comparing by day).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is before the other date (comparing by day), otherwise FALSE.
 */
export function isBeforeDay(other) {
    return this.diffInDays(other) < 0;
}

/**
 * Determine whether this DateTime is before another date (comparing by hour).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is before the other date (comparing by hour), otherwise FALSE.
 */
export function isBeforeHour(other) {
    return this.diffInHours(other) < 0;
}

/**
 * Determine whether this DateTime is before another date (comparing by minute).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is before the other date (comparing by minute), otherwise FALSE.
 */
export function isBeforeMinute(other) {
    return this.diffInMinutes(other) < 0;
}

/**
 * Determine whether this DateTime is before another date (comparing by month).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is before the other date (comparing by month), otherwise FALSE.
 */
export function isBeforeMonth(other) {
    return this.diffInMonths(other) < 0;
}

/**
 * Determine whether this DateTime is before another date (comparing by second).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is before the other date (comparing by second), otherwise FALSE.
 */
export function isBeforeSecond(other) {
    return this.diffInSeconds(other) < 0;
}

/**
 * Determine whether this DateTime is before another date (comparing by week).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is before the other date (comparing by week), otherwise FALSE.
 */
export function isBeforeWeek(other) {
    return this.diffInWeeks(other) < 0;
}

/**
 * Determine whether this DateTime is before another date (comparing by year).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is before the other date (comparing by year), otherwise FALSE.
 */
export function isBeforeYear(other) {
    return this.diffInYears(other) < 0;
}

/**
 * Determine whether this DateTime is between two other dates.
 * @param {DateTime} start The first date to compare to.
 * @param {DateTime} end The second date to compare to.
 * @return {Boolean} TRUE if this DateTime is between two other dates, otherwise FALSE.
 */
export function isBetween(start, end) {
    return this.isAfter(start) && this.isBefore(end);
}

/**
 * Determine whether this DateTime is between two other dates (comparing by day).
 * @param {DateTime} start The first date to compare to.
 * @param {DateTime} end The second date to compare to.
 * @return {Boolean} TRUE if this DateTime is between two other dates (comparing by day), otherwise FALSE.
 */
export function isBetweenDay(start, end) {
    return this.isAfterDay(start) && this.isBeforeDay(end);
}

/**
 * Determine whether this DateTime is between two other dates (comparing by hour).
 * @param {DateTime} start The first date to compare to.
 * @param {DateTime} end The second date to compare to.
 * @return {Boolean} TRUE if this DateTime is between two other dates (comparing by hour), otherwise FALSE.
 */
export function isBetweenHour(start, end) {
    return this.isAfterHour(start) && this.isBeforeHour(end);
}

/**
 * Determine whether this DateTime is between two other dates (comparing by minute).
 * @param {DateTime} start The first date to compare to.
 * @param {DateTime} end The second date to compare to.
 * @return {Boolean} TRUE if this DateTime is between two other dates (comparing by minute), otherwise FALSE.
 */
export function isBetweenMinute(start, end) {
    return this.isAfterMinute(start) && this.isBeforeMinute(end);
}

/**
 * Determine whether this DateTime is between two other dates (comparing by month).
 * @param {DateTime} start The first date to compare to.
 * @param {DateTime} end The second date to compare to.
 * @return {Boolean} TRUE if this DateTime is between two other dates (comparing by month), otherwise FALSE.
 */
export function isBetweenMonth(start, end) {
    return this.isAfterMonth(start) && this.isBeforeMonth(end);
}

/**
 * Determine whether this DateTime is between two other dates (comparing by second).
 * @param {DateTime} start The first date to compare to.
 * @param {DateTime} end The second date to compare to.
 * @return {Boolean} TRUE if this DateTime is between two other dates (comparing by second), otherwise FALSE.
 */
export function isBetweenSecond(start, end) {
    return this.isAfterSecond(start) && this.isBeforeSecond(end);
}

/**
 * Determine whether this DateTime is between two other dates (comparing by week).
 * @param {DateTime} start The first date to compare to.
 * @param {DateTime} end The second date to compare to.
 * @return {Boolean} TRUE if this DateTime is between two other dates (comparing by week), otherwise FALSE.
 */
export function isBetweenWeek(start, end) {
    return this.isAfterWeek(start) && this.isBeforeWeek(end);
}

/**
 * Determine whether this DateTime is between two other dates (comparing by year).
 * @param {DateTime} start The first date to compare to.
 * @param {DateTime} end The second date to compare to.
 * @return {Boolean} TRUE if this DateTime is between two other dates (comparing by year), otherwise FALSE.
 */
export function isBetweenYear(start, end) {
    return this.isAfterYear(start) && this.isBeforeYear(end);
}

/**
 * Determine whether this DateTime is the same as another date.
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as the other date, otherwise FALSE.
 */
export function isSame(other) {
    return this.diff(other) === 0;
}

/**
 * Determine whether this DateTime is the same as another date (comparing by day).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as the other date (comparing by day), otherwise FALSE.
 */
export function isSameDay(other) {
    return this.diffInDays(other) === 0;
}

/**
 * Determine whether this DateTime is the same as another date (comparing by hour).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as the other date (comparing by hour), otherwise FALSE.
 */
export function isSameHour(other) {
    return this.diffInHours(other) === 0;
}

/**
 * Determine whether this DateTime is the same as another date (comparing by minute).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as the other date (comparing by minute), otherwise FALSE.
 */
export function isSameMinute(other) {
    return this.diffInMinutes(other) === 0;
}

/**
 * Determine whether this DateTime is the same as another date (comparing by month).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as the other date (comparing by month), otherwise FALSE.
 */
export function isSameMonth(other) {
    return this.diffInMonths(other) === 0;
}

/**
 * Determine whether this DateTime is the same as another date (comparing by second).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as the other date (comparing by second), otherwise FALSE.
 */
export function isSameSecond(other) {
    return this.diffInSeconds(other) === 0;
}

/**
 * Determine whether this DateTime is the same as another date (comparing by week).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as the other date (comparing by week), otherwise FALSE.
 */
export function isSameWeek(other) {
    return this.diffInWeeks(other) === 0;
}

/**
 * Determine whether this DateTime is the same as another date (comparing by year).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as the other date (comparing by year), otherwise FALSE.
 */
export function isSameYear(other) {
    return this.diffInYears(other) === 0;
}

/**
 * Determine whether this DateTime is the same as or after another date.
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or after the other date, otherwise FALSE.
 */
export function isSameOrAfter(other) {
    return this.diff(other) >= 0;
}

/**
 * Determine whether this DateTime is the same as or after another date (comparing by day).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or after the other date (comparing by day), otherwise FALSE.
 */
export function isSameOrAfterDay(other) {
    return this.diffInDays(other) >= 0;
}

/**
 * Determine whether this DateTime is the same as or after another date (comparing by hour).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or after the other date (comparing by hour), otherwise FALSE.
 */
export function isSameOrAfterHour(other) {
    return this.diffInHours(other) >= 0;
}

/**
 * Determine whether this DateTime is the same as or after another date (comparing by minute).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or after the other date (comparing by minute), otherwise FALSE.
 */
export function isSameOrAfterMinute(other) {
    return this.diffInMinutes(other) >= 0;
}

/**
 * Determine whether this DateTime is the same as or after another date (comparing by month).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or after the other date (comparing by month), otherwise FALSE.
 */
export function isSameOrAfterMonth(other) {
    return this.diffInMonths(other) >= 0;
}

/**
 * Determine whether this DateTime is the same as or after another date (comparing by second).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or after the other date (comparing by second), otherwise FALSE.
 */
export function isSameOrAfterSecond(other) {
    return this.diffInSeconds(other) >= 0;
}

/**
 * Determine whether this DateTime is the same as or after another date (comparing by week).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or after the other date (comparing by week), otherwise FALSE.
 */
export function isSameOrAfterWeek(other) {
    return this.diffInWeeks(other) >= 0;
}

/**
 * Determine whether this DateTime is the same as or after another date (comparing by year).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or after the other date (comparing by year), otherwise FALSE.
 */
export function isSameOrAfterYear(other) {
    return this.diffInYears(other) >= 0;
}

/**
 * Determine whether this DateTime is the same as or before another date.
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or before the other date, otherwise FALSE.
 */
export function isSameOrBefore(other) {
    return this.diff(other) <= 0;
}

/**
 * Determine whether this DateTime is the same as or before another date (comparing by day).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or before the other date (comparing by day), otherwise FALSE.
 */
export function isSameOrBeforeDay(other) {
    return this.diffInDays(other) <= 0;
}

/**
 * Determine whether this DateTime is the same as or before another date (comparing by hour).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or before the other date (comparing by hour), otherwise FALSE.
 */
export function isSameOrBeforeHour(other) {
    return this.diffInHours(other) <= 0;
}

/**
 * Determine whether this DateTime is the same as or before another date (comparing by minute).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or before the other date (comparing by minute), otherwise FALSE.
 */
export function isSameOrBeforeMinute(other) {
    return this.diffInMinutes(other) <= 0;
}

/**
 * Determine whether this DateTime is the same as or before another date (comparing by month).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or before the other date (comparing by month), otherwise FALSE.
 */
export function isSameOrBeforeMonth(other) {
    return this.diffInMonths(other) <= 0;
}

/**
 * Determine whether this DateTime is the same as or before another date (comparing by second).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or before the other date (comparing by second), otherwise FALSE.
 */
export function isSameOrBeforeSecond(other) {
    return this.diffInSeconds(other) <= 0;
}

/**
 * Determine whether this DateTime is the same as or before another date (comparing by week).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or before the other date (comparing by week), otherwise FALSE.
 */
export function isSameOrBeforeWeek(other) {
    return this.diffInWeeks(other) <= 0;
}

/**
 * Determine whether this DateTime is the same as or before another date (comparing by year).
 * @param {DateTime} other The date to compare to.
 * @return {Boolean} TRUE if this DateTime is the same as or before the other date (comparing by year), otherwise FALSE.
 */
export function isSameOrBeforeYear(other) {
    return this.diffInYears(other) <= 0;
}

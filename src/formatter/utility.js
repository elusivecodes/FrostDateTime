import { getData } from './../factory.js';
import { minDaysInFirstWeek, weekStart } from './locales.js';

/**
 * Gets the formatting type from the component token length.
 * @param {number} length The component token length.
 * @return {string} The formatting type.
 */
export function getType(length) {
    switch (length) {
        case 5:
            return 'narrow';
        case 4:
            return 'long';
        default:
            return 'short';
    }
};

/**
 * Gets the locale's minimum days in the first week of the year.
 * @param {string} locale The locale.
 * @return {number} The minimum day count.
 */
export function minimumDays(locale) {
    return getData(
        `minimumDays.${locale}`,
        () => {
            let minDays = 1;
            const localeTest = locale.toLowerCase().split('-');
            while (minDays === 1 && localeTest.length) {
                for (const days in minDaysInFirstWeek) {
                    if (!{}.hasOwnProperty.call(minDaysInFirstWeek, days)) {
                        continue;
                    }

                    const locales = minDaysInFirstWeek[days];

                    if (locales.includes(localeTest.join('-'))) {
                        minDays = parseInt(days, 10);
                        break;
                    }
                }

                localeTest.pop();
            }

            return minDays;
        },
    );
};

/**
 * Gets the week start offset for a locale.
 * @param {string} [locale] The locale to load.
 * @return {number} The week start offset.
 */
function weekStartOffset(locale) {
    return getData(
        `weekStartOffset.${locale}`,
        () => {
            let weekStarted;
            const localeTest = locale.toLowerCase().split('-');
            while (!weekStarted && localeTest.length) {
                for (const start in weekStart) {
                    if (!{}.hasOwnProperty.call(weekStart, start)) {
                        continue;
                    }

                    const locales = weekStart[start];

                    if (locales.includes(localeTest.join('-'))) {
                        weekStarted = parseInt(start, 10);
                        break;
                    }
                }

                localeTest.pop();
            }

            return weekStarted ?
                weekStarted - 2 :
                0;
        },
    );
};

/**
 * Converts a Sunday-based day-of-week value to the locale's week numbering.
 * @param {string} locale The locale.
 * @param {number} day The day of the week. (0 = Sunday, 6 = Saturday)
 * @return {number} The local day of the week.
 */
export function weekDay(locale, day) {
    return (7 + parseInt(day, 10) - weekStartOffset(locale)) % 7 || 7;
};

import { minDaysInFirstWeek, weekStart } from './locales.js';
import { getData } from './../factory.js';

/**
 * Get the formatting type from the component token length.
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
 * Get the minimum days.
 * @param {string} locale The locale.
 * @return {number} The minimum days.
 */
export function minimumDays(locale) {
    return getData(
        `minimumDays.${locale}`,
        (_) => {
            let minDays = 1;
            const localeTest = locale.toLowerCase().split('-');
            while (minDays === 1 && localeTest.length) {
                for (const days in minDaysInFirstWeek) {
                    if (!{}.hasOwnProperty.call(minDaysInFirstWeek, days)) {
                        continue;
                    }

                    const locales = minDaysInFirstWeek[days];

                    if (locales.includes(localeTest.join('-'))) {
                        minDays = parseInt(days);
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
 * Get the week start offset for a locale.
 * @param {string} [locale] The locale to load.
 * @return {number} The week start offset.
 */
function weekStartOffset(locale) {
    return getData(
        `weekStartOffset.${locale}`,
        (_) => {
            let weekStarted;
            const localeTest = locale.toLowerCase().split('-');
            while (!weekStarted && localeTest.length) {
                for (const start in weekStart) {
                    if (!{}.hasOwnProperty.call(weekStart, start)) {
                        continue;
                    }

                    const locales = weekStart[start];

                    if (locales.includes(localeTest.join('-'))) {
                        weekStarted = parseInt(start);
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
 * Convert a day of the week to a local format.
 * @param {string} locale The locale.
 * @param {number} day The day of the week.
 * @return {number} The local day of the week.
 */
export function weekDay(locale, day) {
    return (7 + parseInt(day) - weekStartOffset(locale)) % 7 || 7;
};

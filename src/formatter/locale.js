import { getData } from './../factory.js';
import { minDaysInFirstWeek, weekStart } from './locales.js';

/**
 * Gets a locale value from generated data.
 * @param {object} data The generated locale data.
 * @param {string[]} candidates The locale candidates.
 * @param {number} fallback The fallback value.
 * @return {number} The locale value.
 */
function generatedValue(data, candidates, fallback) {
    for (const candidate of candidates) {
        for (const [value, valueLocales] of Object.entries(data)) {
            if (valueLocales.includes(candidate)) {
                return parseInt(value, 10);
            }
        }
    }

    return fallback;
}

/**
 * Gets generated-data candidates for a locale.
 * @param {Intl.Locale} locale The locale.
 * @return {string[]} The locale candidates.
 */
function localeCandidates(locale) {
    const localeName = locale.toString().split('-x-', 1)[0];
    const regionOverride = localeName.match(
        /-u-(?:[a-z0-9]{2,8}-)*rg-([a-z]{2}|\d{3})zzzz(?:-|$)/i,
    );
    const region = regionOverride?.[1] || locale.region;

    return [
        [locale.language, locale.script, region],
        [locale.language, region],
        [locale.language, locale.script],
        [locale.language],
    ].map((parts) =>
        parts
            .filter((part) => !!part)
            .join('-')
            .toLowerCase(),
    );
}

/**
 * Gets week information for a locale.
 * @param {string} locale The locale.
 * @return {{firstDay: number, minimalDays: number}} The week information.
 */
export function getWeekInfo(locale) {
    return getData(
        `weekInfo.${locale}`,
        () => {
            const localeData = new Intl.Locale(locale);
            const runtimeInfo = localeData.getWeekInfo?.() || localeData.weekInfo || {};

            let { firstDay = null, minimalDays = null } = runtimeInfo;

            const candidates = firstDay && minimalDays ?
                [] :
                localeCandidates(localeData);

            if (!firstDay) {
                const phpFirstDay = generatedValue(weekStart, candidates, 2);

                // IntlCalendar numbers Sunday as 1; Intl.Locale numbers it as 7.
                firstDay = phpFirstDay === 1 ? 7 : phpFirstDay - 1;
            }

            if (!minimalDays) {
                minimalDays = generatedValue(minDaysInFirstWeek, candidates, 1);
            }

            return { firstDay, minimalDays };
        },
    );
};

<?php

$locales = ResourceBundle::getLocales('');
$prefixes = [];

foreach ($locales AS $locale) {
    $prefix = strtok($locale, '_');
    $prefixes[$prefix][] = $locale;
}

$firstDays = [];
$minDays = [];

foreach ($prefixes AS $prefix => $locales) {
    $cal = IntlCalendar::createInstance(null, $prefix);
    $prefixFirstDayOfWeek = $cal->getFirstDayOfWeek();
    $prefixMinimalDaysInFirstWeek = $cal->getMinimalDaysInFirstWeek();

    if ($prefixFirstDayOfWeek !== 2) {
        $firstDays[$prefixFirstDayOfWeek][] = $prefix;
    }

    if ($prefixMinimalDaysInFirstWeek !== 1) {
        $minDays[$prefixMinimalDaysInFirstWeek][] = $prefix;
    }

    foreach ($locales AS $locale) {
        if ($locale === $prefix) {
            continue;
        }

        $cal = IntlCalendar::createInstance(null, $locale);
        $firstDayOfWeek = $cal->getFirstDayOfWeek();
        $minimalDaysInFirstWeek = $cal->getMinimalDaysInFirstWeek();
        $localeKey = str_replace('_', '-', strtolower($locale));

        if ($firstDayOfWeek !== $prefixFirstDayOfWeek) {
            $firstDays[$firstDayOfWeek][] = $localeKey;
        }

        if ($minimalDaysInFirstWeek !== $prefixMinimalDaysInFirstWeek) {
            $minDays[$minimalDaysInFirstWeek][] = $localeKey;
        }
    }
}

echo 'export const weekStart = '.json_encode($firstDays, JSON_UNESCAPED_SLASHES).';';
echo "\n";
echo 'export const minDaysInFirstWeek = '.json_encode($minDays, JSON_UNESCAPED_SLASHES).';';

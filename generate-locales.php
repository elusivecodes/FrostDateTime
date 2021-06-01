<?php

$locales = ResourceBundle::getLocales('');
$prefixes = [];
$prefixTest = [];

foreach ($locales AS $locale) {
    $prefix = strtok($locale,'_');
    $prefixes[$prefix][] = $locale;
}

$firstDays = [];
$minimumDays = [];

foreach ($prefixes AS $prefix => $locales) {
    $cal = IntlCalendar::createInstance(null, $prefix);
    $prefixFirstDayOfWeek = $cal->getFirstDayOfWeek();
    $prefixMinimalDaysInFirstWeek = $cal->getMinimalDaysInFirstWeek();

    $firstDaysTemp = [];

    foreach ($locales AS $locale) {
        $cal = IntlCalendar::createInstance(null, $locale);
        $firstDayOfWeek = $cal->getFirstDayOfWeek();
        $minimalDaysInFirstWeek = $cal->getMinimalDaysInFirstWeek();
        $localeKey = str_replace('_', '-', strtolower($locale));

        if (
            ($locale === $prefix || $firstDayOfWeek !== $prefixFirstDayOfWeek) &&
            ($firstDayOfWeek !== 2 && $prefixFirstDayOfWeek !== 2)
        ) {
            $firstDaysTemp[$firstDayOfWeek][] = $localeKey;
        }

        if (
            ($locale === $prefix || $minimalDaysInFirstWeek !== $prefixMinimalDaysInFirstWeek) &&
            $minimalDaysInFirstWeek > 1
        ) {
            $minimumDays[$minimalDaysInFirstWeek][] = $localeKey;
        }
    }

    foreach ($firstDaysTemp AS $day => $locales) {
        $firstDays[$day] ??= [];

        if (count($firstDaysTemp) === 1) {
            if ($day != 2) {
                $firstDays[$day][] = $prefix;
            }
        } else {
            $firstDays[$day] = array_merge($firstDays[$day], $locales);
        }
    }
}

echo 'DateFormatter._weekStart = '.json_encode($firstDays, JSON_UNESCAPED_SLASHES).';';
echo "\n";
echo 'DateFormatter._minimumDays = '.json_encode($minimumDays, JSON_UNESCAPED_SLASHES).';';
<?php

$locales = ResourceBundle::getLocales('');
$prefixes = [];
$prefixTest = [];

foreach ($locales AS $locale) {
    $prefix = strtok($locale,'_');
    $prefixes[$prefix][] = $locale;
}

$results = [];

foreach ($prefixes AS $prefix => $locales) {
    $cal = IntlCalendar::createInstance(null, $prefix);
    $prefixFirstDayOfWeek = $cal->getFirstDayOfWeek();

    $test = [];
    foreach ($locales AS $locale) {
        $cal = IntlCalendar::createInstance(null, $locale);
        $firstDayOfWeek = $cal->getFirstDayOfWeek();
        if (
            ($locale !== $prefix && $firstDayOfWeek === $prefixFirstDayOfWeek) ||
            ($firstDayOfWeek == 2 && $prefixFirstDayOfWeek == 2)
        ) {
            continue;
        }
        $test[$firstDayOfWeek][] = str_replace('_', '-', strtolower($locale));
    }

    foreach ($test AS $day => $locales) {
        if (count($test) == 1) {
            if ($day != 2) {
                $results[$day][] = $prefix;
            }
        } else {
            $results[$day] = array_merge($results[$day] ?? [], $locales);
        }
    }
}

echo 'DateFormatter._weekStart = '.json_encode($results, JSON_UNESCAPED_SLASHES);

// day (0-6) to local (1-7)
// (d - (v - 2)) % 7 || 7

// local (1-7) to day (0-6)
// (l + (v - 2)) % 7

// 1 - sunday, -1
// 2 - monday, 0
// 6 - friday, 4
// 7 - saturday, 5

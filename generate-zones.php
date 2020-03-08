<?php

$allZones = [];

function convert($timestamp) {
    return ($timestamp < 0 ? '-' : ''). // Prepend minus to negative timestamp
        base_convert($timestamp, 10, 36);
}

// Loop through timezones
foreach (DateTimeZone::listIdentifiers() AS $identifier) {

    // Create timezone
	$timezone = new DateTimeZone($identifier);

	$abbreviations = [];
	$tzData = [];

    // Get transitions
	$transitions = $timezone->getTransitions();
    $transitionCount = count($transitions);

	$prevStandard = '';
	$prevDst = '';

    // Loop through transitions
	for ($i = 0; $i < $transitionCount; $i++) {

        // Get transition
		$transition =& $transitions[$i];

        // Get abbreviation & DST
		$abbr = $transition['abbr'];
        $dst = $transition['isdst'];

        // Get abbreviation index (or add it, if it doesn't exist)
		$index = array_search($abbr, $abbreviations);
		if ($index === false) {
			$index = count($abbreviations);
			$abbreviations[] = $abbr;
		}

        // Check for next transition
		$nextIndex = '';
		if ($i < $transitionCount - 1) {

            // Get next transition
			$nextTransition =& $transitions[$i + 1];

            // Is next transition a DST transition?
			if ($nextTransition['isdst'] != $dst) {

                // Get next abbreviation index (or add it, if it doesn't exist)
                $nextAbbr = $nextTransition['abbr'];

				$nextIndex = array_search($nextAbbr, $abbreviations);
				if ($nextIndex === false) {
					$nextIndex = count($abbreviations);
					$abbreviations[] = $nextAbbr;
				}

                // Skip next transition
				$i++;
			}
		}

        $offset = $transition['offset'];

        // Set standard index and DST index
		if ($dst) {
			$standardIndex = ! $nextIndex ? $prevStandard : $nextIndex;
			$dstIndex = $index;
		} else {
			$standardIndex = $index;
			$dstIndex = $nextIndex;
		}

        // Skip transitions where standard and DST indexes have not changed
        if (($standardIndex === $prevStandard && ($dstIndex === '' || $dstIndex === $prevDst)) ||
            ($dstIndex === $prevDst && $standardIndex === $prevStandard)) {
			continue;
		}

        // Create transition data
		$data = [
			'ts' => $transition['ts'],
            'index' => $standardIndex,
            'dst' => $dstIndex
		];

        // Add transition data to timezone data
        $tzData[] = $data;
 
        // Set previous standard and DST indexes
		$prevStandard = $standardIndex;
		$prevDst = $dstIndex;
    }

    $allZones[$identifier] = [
        'abbreviations' => $abbreviations,
        'data' => $tzData
    ];
}

$abbrList = [];

foreach ($allZones AS $identifier => $data) {
    foreach ($data['abbreviations'] AS $abbreviation) {
        if (!in_array($abbreviation, $abbrList)) {
            $abbrList[] = $abbreviation;
        }
    }
}

sort($abbrList);

$values = [];
$zones = [];

foreach ($allZones AS $identifier => $data) {

    // Create abbreviation string
    $tzString = implode(';', array_map(
        function($value) use ($abbrList) {
            return array_search($value, $abbrList);
        },
        $data['abbreviations']
    ));

    // Add transitions to end of string
	$tzString .= '|'.implode(';', array_map(
		function($value, $index) {
            return
                ($index ? // Ignore first transition timestamp
					convert($value['ts']) :
					''
                ).
                ','.$value['index']. // Add standard index
                ($value['dst'] ? ','.$value['dst'] : ''); // If we have a DST index, also add it
		},
		$data['data'],
		array_keys($data['data'])
	));

    // Get value index (or add it, if it doesn't exist)
	$valueIndex = array_search($tzString, $values);
	if ($valueIndex === false) {
		$valueIndex = count($values);
		$values[] = $tzString;
	}

    // Add timezone to zones
	$zones[$identifier] = $valueIndex;
}

$abbrOffsets = [];

foreach ($abbrList AS $abbr) {
    if (!preg_match('/[A-Z]{3,4}/', $abbr)) {
        continue;
    }

    $date = DateTime::createFromFormat('e', $abbr);

    if (!$date) {
        continue;
    }

    $offset = $date->getOffset();
    $convertedOffset = convert($offset);

    $abbrOffsets[$abbr] = $convertedOffset;
}

// Output zones and values
echo 'const abbrs = '.json_encode($abbrList, JSON_UNESCAPED_SLASHES).';';
echo 'const zones = '.json_encode($zones, JSON_UNESCAPED_SLASHES).';';
echo 'const values = '.json_encode($values, JSON_UNESCAPED_SLASHES).';';
echo 'const abbrOffsets = '.json_encode($abbrOffsets, JSON_UNESCAPED_SLASHES).';';
echo "\r\n";
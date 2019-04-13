<?php

$values = [];
$zones = [];

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

        // Set standard index and DST index
		if ($dst) {
			$standardIndex = ! $nextIndex ? $prevStandard : $nextIndex;
			$dstIndex = $index;
		} else {
			$standardIndex = $index;
			$dstIndex = $nextIndex;
		}

        // Skip transitions where standard abd DST indexes have not changed
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

    // Create abbreviation string
    $tzString = implode(';', array_map(
        function($value) {
            return $value === 'LMT' ?
                '' :
                $value;
        },
        $abbreviations
    ));

    // Add transitions to end of string
	$tzString .= '|'.implode(';', array_map(
		function($value, $index) {
            return
                ($index ? // Ignore first transition timestamp
					($value['ts'] < 0 ? '-' : ''). // Prepend minus to negative timestamp
					base_convert($value['ts'], 10, 36) : // Convert timestamp to base 36
					''
                ).
                ','.$value['index']. // Add standard index
				($value['dst'] ? ','.$value['dst'] : ''); // If we have a DST index, also add it
		},
		$tzData,
		array_keys($tzData)
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

// Output zones and values
echo 'const zones = '.json_encode($zones, JSON_UNESCAPED_SLASHES).';';
echo 'const values = '.json_encode($values, JSON_UNESCAPED_SLASHES).';';
echo "\r\n";
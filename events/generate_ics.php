<?php
// events/generate_ics.php

function escapeIcsText(string $text): string {
    // Strip CR/LF to prevent header or property injection and escape RFC 5545 special chars
    $clean = str_replace(["\r\n", "\r", "\n"], ' ', $text);
    $clean = addcslashes($clean, "\\;,");
    return trim($clean);
}

$title    = $_GET['title'] ?? 'School Event';
$desc     = $_GET['desc'] ?? 'St. Francis Day and Boarding Primary School Event';
$location = $_GET['location'] ?? 'St. Francis Primary School, Ntinda, Kampala';
$start    = $_GET['start'] ?? '';
$end      = $_GET['end'] ?? '';

if ($start === '' || $end === '') {
    http_response_code(400);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Missing start or end date parameters.';
    exit;
}

try {
    $tz = new DateTimeZone('Africa/Kampala');
    $startDT = new DateTime($start, $tz);
    $endDT   = new DateTime($end, $tz);
} catch (Exception $e) {
    http_response_code(400);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Invalid date format provided.';
    exit;
}

$dtStart = $startDT->format('Ymd\THis');
$dtEnd   = $endDT->format('Ymd\THis');
$dtStamp = gmdate('Ymd\THis\Z');
$uid     = uniqid('stfrancis-', true) . '@stfrancisntinda.sc.ug';

$safeTitle    = escapeIcsText($title);
$safeDesc     = escapeIcsText($desc);
$safeLocation = escapeIcsText($location);

header('Content-Type: text/calendar; charset=utf-8');
header('Content-Disposition: attachment; filename="stfrancis-event.ics"');

$lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//St. Francis Primary School Ntinda//School Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:' . $uid,
    'DTSTAMP:' . $dtStamp,
    'DTSTART;TZID=Africa/Kampala:' . $dtStart,
    'DTEND;TZID=Africa/Kampala:' . $dtEnd,
    'SUMMARY:' . $safeTitle,
    'DESCRIPTION:' . $safeDesc,
    'LOCATION:' . $safeLocation,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
];

echo implode("\r\n", $lines) . "\r\n";

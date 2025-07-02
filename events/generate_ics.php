<?php
// events/generate_ics.php

// Get event details from URL parameters (with defaults)
$title = $_GET['title'] ?? 'Annual Science Fair Exhibition';
$desc = $_GET['desc'] ?? 'Join us for the Annual Science Fair Exhibition at the Main Campus Auditorium.';
$location = $_GET['location'] ?? 'Main Campus Auditorium';
$start = $_GET['start'] ?? '2024-06-01T09:00'; // Format: 2024-06-01T09:00
$end = $_GET['end'] ?? '2024-06-01T16:00';     // Format: 2024-06-01T16:00

if (!$start || !$end) {
    die('Missing start or end date/time.');
}

// Convert to UTC format for iCalendar
function toCalTime($datetime) {
    $dt = new DateTime($datetime, new DateTimeZone('Africa/Kampala'));
    return $dt->setTimezone(new DateTimeZone('UTC'))->format('Ymd\THis\Z');
}

$ics = "BEGIN:VCALENDAR\n" .
    "VERSION:2.0\n" .
    "PRODID:-//St Francis Ntinda//Event Calendar//EN\n" .
    "BEGIN:VEVENT\n" .
    "UID:" . uniqid() . "@stfrancisntinda.sc.ug\n" .
    "DTSTAMP:" . toCalTime($start) . "\n" .
    "DTSTART:" . toCalTime($start) . "\n" .
    "DTEND:" . toCalTime($end) . "\n" .
    "SUMMARY:" . addslashes($title) . "\n" .
    "DESCRIPTION:" . addslashes($desc) . "\n" .
    "LOCATION:" . addslashes($location) . "\n" .
    "END:VEVENT\n" .
    "END:VCALENDAR";

header('Content-Type: text/calendar; charset=utf-8');
header('Content-Disposition: attachment; filename=event.ics');
echo $ics;
exit; 
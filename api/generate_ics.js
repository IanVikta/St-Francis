function escapeIcsText(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');
}

function formatIcsDate(dateStr) {
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'School Event';
  const description = searchParams.get('desc') || '';
  const location = searchParams.get('location') || 'St. Francis Day & Boarding Primary School, Ntinda';
  const startRaw = searchParams.get('start') || '';
  const endRaw = searchParams.get('end') || '';

  const dtStart = formatIcsDate(startRaw);
  const dtEnd = formatIcsDate(endRaw);

  if (!dtStart || !dtEnd) {
    return new Response('Invalid start or end date provided.', {
      status: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  const dtStamp = formatIcsDate(new Date().toISOString());
  const uid = `stfrancis-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@stfrancisntinda.sc.ug`;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'school-event';

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//St. Francis Day and Boarding Primary School Ntinda//Events Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
    ''
  ];

  return new Response(lines.join('\r\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.ics"`
    }
  });
}


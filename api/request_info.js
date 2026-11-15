const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const program = String(formData.get('program') || '').trim();

    if (!name || !email || !program) {
      return new Response('Please complete your name, email address, and class/program of interest.', {
        status: 400
      });
    }
    if (!EMAIL_REGEX.test(email)) {
      return new Response('Please provide a valid email address.', { status: 400 });
    }

    return new Response('OK', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  } catch {
    return new Response('Unable to submit your inquiry right now. Please try again.', { status: 400 });
  }
}


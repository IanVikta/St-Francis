const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !subject || !message) {
      return new Response('Please fill in all required fields.', { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return new Response('Please enter a valid email address.', { status: 400 });
    }

    return new Response('OK', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  } catch {
    return new Response('Unable to process your message. Please try again.', { status: 400 });
  }
}


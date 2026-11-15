const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = String(formData.get('email') || '').trim();

    if (!email || !EMAIL_REGEX.test(email)) {
      return Response.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      message: 'Thank you for subscribing to our school newsletter!'
    });
  } catch {
    return Response.json(
      { success: false, message: 'Could not process subscription. Please try again.' },
      { status: 400 }
    );
  }
}


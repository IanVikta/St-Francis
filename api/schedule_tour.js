const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const date = String(formData.get('date') || '').trim();
    const time = String(formData.get('time') || '').trim();

    if (!name || !email || !phone || !date || !time) {
      return Response.json(
        { success: false, message: 'Please fill in all required tour booking fields.' },
        { status: 400 }
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      return Response.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      message: `Thank you, ${name}! Your school tour request for ${date} at ${time} has been received. Our Admissions Office will confirm shortly.`
    });
  } catch {
    return Response.json(
      { success: false, message: 'Could not schedule tour. Please call +256-752-619-656.' },
      { status: 400 }
    );
  }
}


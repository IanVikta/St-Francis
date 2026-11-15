const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const formData = await request.formData();

    const requiredFields = [
      ['student_first_name', 'Student First Name'],
      ['student_last_name', 'Student Last Name'],
      ['student_dob', 'Date of Birth'],
      ['student_gender', 'Gender'],
      ['student_nationality', 'Nationality'],
      ['student_address', 'Home Address'],
      ['student_grade', 'Grade Level Applying For'],
      ['guardian1_fullname', 'Primary Guardian Full Name'],
      ['guardian1_relationship', 'Primary Guardian Relationship'],
      ['guardian1_phone_primary', 'Primary Guardian Phone Number'],
      ['guardian1_email', 'Primary Guardian Email'],
      ['emergency_fullname', 'Emergency Contact Name'],
      ['emergency_phone_primary', 'Emergency Contact Phone'],
      ['emergency_address', 'Emergency Contact Address'],
      ['immunization_status', 'Immunization Status'],
      ['parent_signature', 'Parent/Guardian Signature'],
      ['signature_date', 'Signature Date']
    ];

    const missing = [];
    for (const [key, label] of requiredFields) {
      const val = String(formData.get(key) || '').trim();
      if (!val) {
        missing.push(label);
      }
    }

    if (missing.length > 0) {
      return Response.json(
        {
          success: false,
          message: `Please complete all required fields: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}.`
        },
        { status: 400 }
      );
    }

    const email = String(formData.get('guardian1_email') || '').trim();
    if (!EMAIL_REGEX.test(email)) {
      return Response.json(
        { success: false, message: 'Please provide a valid email address for the primary guardian.' },
        { status: 400 }
      );
    }

    const firstName = String(formData.get('student_first_name') || '').trim();
    const lastName = String(formData.get('student_last_name') || '').trim();
    const grade = String(formData.get('student_grade') || '').trim();
    const year = new Date().getFullYear();
    const randomCode = String(Math.floor(10000 + Math.random() * 90000));
    const reference = `SFP-${year}-${randomCode}`;

    return Response.json({
      success: true,
      reference,
      message: `Application for ${firstName} ${lastName} (${grade}) submitted! Reference No: ${reference}. Please keep a PDF copy for your records.`
    });
  } catch {
    return Response.json(
      {
        success: false,
        message: 'Could not process your application at this time. Please use the Download PDF Copy button and contact +256-752-619-656.'
      },
      { status: 400 }
    );
  }
}


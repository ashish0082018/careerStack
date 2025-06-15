
import nodemailer from 'nodemailer';

interface ApiResponse {
  success: boolean;
  message: string;
}

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Set up the SMTP protocol using Sendinblue's SMTP relay
    const transport = nodemailer.createTransport({
      host: "smtp-relay.brevo.com", // Use Brevo (Sendinblue) SMTP relay
      port: 587, // Recommended port for STARTTLS
      secure: false, // Use STARTTLS, not SSL directly
      auth: {
        user: process.env.EMAIL_USER, // Your Sendinblue login email (not Gmail)
        pass: process.env.EMAIL_PASS // Your SMTP API key from Sendinblue
      }
    });

    const emailTemplate = `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 650px;
      margin: 30px auto;
      padding: 25px;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .header h1 {
      color: #3540a3;
      font-size: 32px;
      font-weight: 600;
      margin: 0;
    }
    .content {
      font-size: 16px;
      color: #555555;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .content p {
      margin-bottom: 20px;
    }
    .code {
      font-weight: 600;
      color: #ffffff;
      background-color: #3e48a4;
      padding: 12px 20px;
      font-size: 22px;
      border-radius: 8px;
      display: inline-block;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #777777;
      margin-top: 40px;
    }
    .footer a {
      color: #355196;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .button {
      display: inline-block;
      padding: 10px 25px;
      font-size: 16px;
      background-color: #4CAF50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 30px;
      margin-top: 20px;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    <div class="content">
      <p >Dear <strong>${username},</strong></p>
      <p>Thank you for registering with us! We're excited to have you on board. To complete your registration, please use the verification code below:</p>
      <p class="code">${verifyCode}</p>
      <p>This code will expire in 15 minutes. If you did not request this verification, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>If you need help, feel free to <a href="">contact our support team</a>.</p>
    </div>
   
  </div>
</body>
</html>

  `;

   
    const mailOptions = {
      from: process.env.EMAIL_FROM, // Use a verified email address here
      to: email,
      subject: "Verification Code",
      html: emailTemplate
    };

    await transport.sendMail(mailOptions);
    return { success: true, message: 'Verification email sent successfully.' };
    
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}

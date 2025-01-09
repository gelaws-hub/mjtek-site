import nodemailer from 'nodemailer';

// Konfigurasi transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Bisa diganti dengan SMTP lain
  auth: {
    user: process.env.EMAIL_USER,  // Email pengirim
    pass: process.env.EMAIL_PASS,  // Password atau App Password
  },
});

// Fungsi kirim email aktivasi
export const sendActivationEmail = async (email: string, activationLink: string) => {
  const mailOptions = {
    from: '"MJ Teknologi Semarang" <mjteknologi555@gmail.com>', // Pastikan email valid
    to: email,
    subject: 'Activate Your Account',
    html: `
      <h1>Welcome!</h1>
      <p>Thank you for registering. Please click the link below to activate your account:</p>
      <a href="${activationLink}" target="_blank">Activate Account</a>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Activation email sent:', info.response);
  } catch (error) {
    console.error('Failed to send activation email:', error);
    throw new Error('Failed to send activation email');
  }
};

// Fungsi kirim email reset password
export const sendResetPasswordEmail = async (email: string, resetLink: string) => {
  const mailOptions = {
    from: '"MJ Teknologi Semarang" <mjteknologi555@gmail.com>', // Pastikan email valid
    to: email,
    subject: 'Reset Your Password',
    html: `
      <h1>Reset Password</h1>
      <p>We received a request to reset your password. Click the link below to reset it:</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>
      <p>If you didn't request this, you can ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Reset password email sent:', info.response);
  } catch (error) {
    console.error('Failed to send reset password email:', error);
    throw new Error('Failed to send reset password email');
  }
};

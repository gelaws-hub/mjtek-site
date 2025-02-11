import nodemailer from "nodemailer";

const isDevelopment = process.env.NODE_ENV !== "production";

const devTransport = {
  name: "dev",
  version: "1.0.0",
  send: async (mail: any, callback: any) => {
    const info = {
      messageId: "dev_" + Math.random().toString(36).substring(7),
      envelope: mail.data.envelope || {
        from: mail.data.from,
        to: [mail.data.to],
      },
    };

    console.log("\n=========================");
    console.log("💌 Development Mode Email");
    console.log("=========================");
    console.log("📧 From:", mail.data.from);
    console.log("📫 To:", mail.data.to);
    console.log("📑 Subject:", mail.data.subject);
    console.log("📝 Content:\n", mail.data.html);
    console.log(
      "🔗 Activation Link:",
      mail.data.html.match(/href="([^"]*)/)[1]
    );
    console.log("=========================\n");

    callback(null, info);
  },
};

const transporter = isDevelopment
  ? nodemailer.createTransport(devTransport)
  : nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
// Konfigurasi transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail", // Bisa diganti dengan SMTP lain
//   auth: {
//     user: process.env.EMAIL_USER, // Email pengirim
//     pass: process.env.EMAIL_PASS, // Password atau App Password
//   },
// });

// Fungsi kirim email aktivasi
export const sendActivationEmail = async (
  email: string,
  activationLink: string
) => {
  const mailOptions = {
    from: `"MJ Teknologi Semarang" <${process.env.EMAIL_USER}>`, // Pastikan email valid
    to: email,
    subject: "Activate Your Account",
    html: `
      <h1>Welcome!</h1>
      <p>Thank you for registering. Please click the link below to activate your account:</p>
      <a href="${activationLink}" target="_blank">Activate Account</a>
      <p>If you didn't create an account, you can safely ignore this email.</p>
      <p>This link will expire in 24 hours.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Activation email sent:", info.response);
  } catch (error) {
    console.error("Failed to send activation email:", error);
    throw new Error("Failed to send activation email");
  }
};

// Fungsi kirim email reset password
export const sendResetPasswordEmail = async (
  email: string,
  resetLink: string
) => {
  console.log("Sending reset email to:", email, "with link:", resetLink);

  const mailOptions = {
    from: `"MJ Teknologi Semarang" <${process.env.EMAIL_USER}>`, // Pastikan email valid
    to: email,
    subject: "Reset Your Password",
    html: `
      <h1>Reset Password</h1>
      <p>We received a request to reset your password. Click the link below to reset it:</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Reset password email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Failed to send reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
  // try {
  //   const info = await transporter.sendMail(mailOptions);
  //   console.log("Reset password email sent:", info.response);
  // } catch (error) {
  //   console.error("Failed to send reset password email:", error);
  //   throw new Error("Failed to send reset password email");
  // }
  // try {
  //   console.log("Sending reset email to:", email, "with link:", resetLink); // Debugging log
  //   // Implementasi pengiriman email di sini
  // } catch (error: any) {
  //   console.error("Error sending email:", error.message);
  // }
};

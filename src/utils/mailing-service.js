import { createTransport } from 'nodemailer';
import config from '../config/config.js';

const transporter = createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: config.EMAIL,
    pass: config.PASSWORD,
  },
});

export const sendEmail = async (user) => {
  try {
    const { firstName, email } = user;
    const gmailOptions = {
      from: config.EMAIL,
      to: email,
      subject: `Welcome to our site ${firstName}!`,
      html: `Thank you for choosing us ${firstName}`,
    };
    await transporter.sendMail(gmailOptions);
    console.log('Email sent!');
  } catch (error) {
    console.log(error.message);
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const gmailOptions = {
      from: config.EMAIL,
      to: email,
      subject: 'Reset Your Password',
      html: `
        <p>Dear User,</p>
        <p>To reset your password, please click the following link:</p>
        <a href="${config.BASE_URL}/reset-password?token=${resetToken}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this password reset, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Your Website Team</p>
      `,
    };

    await transporter.sendMail(gmailOptions);
    console.log('Correo de restablecimiento de contraseña enviado a:', email);
  } catch (error) {
    console.error(
      'Error al enviar el correo de restablecimiento de contraseña:',
      error.message
    );
    throw error;
  }
};

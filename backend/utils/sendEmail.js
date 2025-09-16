const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS
    }
  });
};

// Send email notification to admin for new inquiry
const sendInquiryNotification = async (inquiry) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry from ${inquiry.name} - Anilife Healthcare`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; border-bottom: 2px solid #4a7c59; padding-bottom: 10px;">
            New Customer Inquiry
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c5530; margin-top: 0;">Customer Details:</h3>
            <p><strong>Name:</strong> ${inquiry.name}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            ${inquiry.subject ? `<p><strong>Subject:</strong> ${inquiry.subject}</p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #2c5530; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6;">${inquiry.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #5a6c57;">
              <strong>Time:</strong> ${new Date(inquiry.createdAt).toLocaleString()}
            </p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #5a6c57;">
              Please respond to this inquiry promptly through your admin dashboard.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Inquiry notification email sent successfully');
  } catch (error) {
    console.error('Error sending inquiry notification email:', error);
    // Don't throw error as email failure shouldn't break the inquiry submission
  }
};

// Send welcome email to new admin
const sendWelcomeEmail = async (admin) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: admin.email,
      subject: 'Welcome to Anilife Healthcare Admin Panel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530;">Welcome to Anilife Healthcare!</h2>
          <p>Hello ${admin.username},</p>
          <p>Your admin account has been successfully created. You can now access the admin dashboard to manage products and inquiries.</p>
          <p><strong>Your login details:</strong></p>
          <ul>
            <li><strong>Username:</strong> ${admin.username}</li>
            <li><strong>Email:</strong> ${admin.email}</li>
          </ul>
          <p>Please keep your login credentials secure.</p>
          <p>Best regards,<br>Anilife Healthcare Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

module.exports = {
  sendInquiryNotification,
  sendWelcomeEmail
};

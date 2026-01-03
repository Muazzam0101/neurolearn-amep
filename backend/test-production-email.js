const { Resend } = require('resend');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmailServices() {
  console.log('🧪 Testing Production Email Services...\n');
  
  const testEmail = 'test@example.com';
  const testResetLink = 'https://neurolearn-frontend.vercel.app/reset-password/test-token-123';
  
  // Test 1: Resend API
  console.log('1️⃣ Testing Resend API...');
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const result = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'NeuroLearn <noreply@neurolearn.com>',
        to: testEmail,
        subject: 'NeuroLearn Email Test - Resend',
        html: `
          <h2>Resend Test Email</h2>
          <p>This is a test email from NeuroLearn using Resend API.</p>
          <p>Reset link would be: <a href="${testResetLink}">${testResetLink}</a></p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        `
      });
      
      console.log('✅ Resend API working correctly');
      console.log(`📧 Test email ID: ${result.data?.id}`);
    } catch (error) {
      console.log('❌ Resend API failed:', error.message);
    }
  } else {
    console.log('⚠️ RESEND_API_KEY not configured');
  }
  
  console.log('\\n2️⃣ Testing SMTP Fallback...');
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      await transporter.verify();
      console.log('✅ SMTP connection verified');
      
      const result = await transporter.sendMail({
        from: process.env.EMAIL_FROM || `"NeuroLearn" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Send to self for testing
        subject: 'NeuroLearn Email Test - SMTP',
        html: `
          <h2>SMTP Test Email</h2>
          <p>This is a test email from NeuroLearn using SMTP.</p>
          <p>Reset link would be: <a href="${testResetLink}">${testResetLink}</a></p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        `
      });
      
      console.log('✅ SMTP email sent successfully');
      console.log(`📧 Message ID: ${result.messageId}`);
    } catch (error) {
      console.log('❌ SMTP failed:', error.message);
      console.log('💡 For Gmail: Enable 2FA and use App Password');
    }
  } else {
    console.log('⚠️ SMTP credentials not configured');
  }
  
  console.log('\\n3️⃣ Configuration Check...');
  console.log('Frontend URL:', process.env.FRONTEND_URL || 'https://neurolearn-frontend.vercel.app');
  console.log('Email From:', process.env.EMAIL_FROM || 'Not set');
  console.log('Resend API:', process.env.RESEND_API_KEY ? '✅ Configured' : '❌ Not set');
  console.log('SMTP User:', process.env.EMAIL_USER ? '✅ Configured' : '❌ Not set');
  console.log('SMTP Pass:', process.env.EMAIL_PASS ? '✅ Configured' : '❌ Not set');
  
  console.log('\\n🎯 Production Readiness:');
  if (process.env.RESEND_API_KEY) {
    console.log('✅ Ready for production with Resend API');
  } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log('⚠️ Using SMTP fallback (consider Resend for better deliverability)');
  } else {
    console.log('❌ No email service configured - emails will fail');
  }
}

testEmailServices().catch(console.error);
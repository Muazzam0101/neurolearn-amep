# 🚀 Production Environment Setup

## Required Environment Variables

Add these to your Render backend service:

```env
# Email Configuration (CRITICAL)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password

# Frontend URL (CRITICAL - NO LOCALHOST)
FRONTEND_URL=https://your-neurolearn-frontend.vercel.app

# Database & JWT
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
```

## ⚠️ CRITICAL: Gmail App Password Setup

1. Enable 2-Factor Authentication on Gmail
2. Go to: Google Account → Security → 2-Step Verification → App passwords
3. Generate app password for "Mail"
4. Use this 16-character password as EMAIL_PASS

## 🔧 Fixes Applied

✅ **Fixed Nodemailer API**: `createTransporter` → `createTransport`
✅ **Removed localhost**: No more hardcoded localhost:3000
✅ **Added SMTP verification**: Connection tested before sending
✅ **Enhanced error logging**: Detailed email failure logs
✅ **Secure error handling**: No stack traces exposed to frontend

## 🧪 Testing Commands

```bash
# Test email configuration
node test-email.js

# Verify API fixes
node verify-nodemailer-fix.js
```

## 📧 Expected Behavior

1. **Email sent successfully**: Console shows "✅ Password reset email sent successfully"
2. **Gmail delivery**: Email appears in recipient's Gmail inbox
3. **Correct reset link**: Link points to production frontend, not localhost
4. **Working reset flow**: Link opens NeuroLearn reset page and works end-to-end
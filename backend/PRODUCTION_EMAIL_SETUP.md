# 🚀 NeuroLearn Production Email Setup

## 📧 Email Service Configuration

### Option 1: Resend API (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to Render environment variables:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
EMAIL_FROM=NeuroLearn <noreply@yourdomain.com>
FRONTEND_URL=https://neurolearn-frontend.vercel.app
```

### Option 2: Gmail SMTP (Fallback)
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password: Google Account → Security → App passwords
3. Add to Render environment variables:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM=NeuroLearn <your-gmail@gmail.com>
FRONTEND_URL=https://neurolearn-frontend.vercel.app
```

## 🔧 Required Environment Variables (Render)

```env
# Core Configuration
FRONTEND_URL=https://neurolearn-frontend.vercel.app
JWT_SECRET=your-jwt-secret

# Primary Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
EMAIL_FROM=NeuroLearn <noreply@yourdomain.com>

# Fallback Email Service (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password

# Database (Auto-provided by Render)
DATABASE_URL=postgresql://...
```

## ✅ Verification Steps

1. **Deploy to Render** with environment variables
2. **Test email sending**:
   ```bash
   node test-production-email.js
   ```
3. **Test password reset flow**:
   - Go to: https://neurolearn-frontend.vercel.app/login
   - Click "Forgot Password?"
   - Enter your email
   - Check Gmail inbox/spam for reset email
   - Click reset link → should open NeuroLearn reset page

## 🎯 Expected Behavior

### Success Logs:
```
✅ Password reset email SENT to user@gmail.com via Resend
📧 Resend ID: 01234567-89ab-cdef-0123-456789abcdef
```

### Email Content:
- **Subject**: "Reset Your NeuroLearn Password"
- **From**: "NeuroLearn <noreply@yourdomain.com>"
- **Link**: https://neurolearn-frontend.vercel.app/reset-password/[token]
- **Professional HTML design** with NeuroLearn branding

### Reset Flow:
1. User receives email in Gmail
2. Clicks reset link
3. Opens: https://neurolearn-frontend.vercel.app/reset-password/[token]
4. User enters new password
5. Password updated successfully
6. User can login with new password

## 🚨 Troubleshooting

### Email Not Received:
- Check Render logs for "✅ Password reset email SENT"
- Check Gmail spam folder
- Verify RESEND_API_KEY or SMTP credentials
- Run test script: `node test-production-email.js`

### 404 on Reset Link:
- Verify FRONTEND_URL points to correct Vercel deployment
- Check frontend routing is configured for `/reset-password/:token`

### Email Service Errors:
- Resend: Check API key validity and domain verification
- Gmail: Ensure 2FA enabled and App Password used (not regular password)
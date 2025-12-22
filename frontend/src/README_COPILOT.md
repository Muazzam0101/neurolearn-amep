# GitHub Copilot Instructions – AMEP Frontend Setup

You are helping build the frontend of an EdTech platform called
"AMEP – Adaptive Mastery & Engagement Platform".

Your task is to:
1. Create a clean, professional directory structure
2. Build Login and Signup pages using a professional EdTech design language

--------------------------------
DIRECTORY STRUCTURE REQUIREMENTS
--------------------------------

Create the following structure under `src/`:

src/
├── pages/
│   └── Auth/
│       ├── Login.jsx
│       ├── Signup.jsx
│       └── Auth.css
├── components/
│   ├── InputField.jsx
│   ├── Button.jsx
│   └── RoleSelector.jsx
├── assets/
│   └── illustrations/
├── App.jsx

--------------------------------
DESIGN REQUIREMENTS (IMPORTANT)
--------------------------------

Design language:
- Professional EdTech / Institutional
- Clean, minimal, academic
- Not playful, not flashy

Color palette:
- Primary: Deep blue / indigo
- Secondary: Soft teal or green
- Background: White or light gray

Typography:
- Sans-serif (Inter / Roboto style)
- Clear hierarchy, high readability

--------------------------------
LOGIN & SIGNUP PAGE REQUIREMENTS
--------------------------------

Layout:
- Split screen layout
- Left: abstract academic / learning illustration placeholder
- Right: authentication form in a card

Common UI elements:
- Platform title:
  "AMEP – Adaptive Mastery & Engagement Platform"
- Tagline:
  "Turning classroom data into actionable learning intelligence"

Form fields:
- Email
- Password
- Role selector (Student / Teacher)

Buttons:
- Login page: "Sign In"
- Signup page: "Create Account"

Other:
- Link to switch between Login and Signup
- Professional spacing and alignment
- Responsive design
- Accessible input labels and focus states

--------------------------------
IMPLEMENTATION NOTES
--------------------------------

- Use React functional components
- Use basic CSS (no external UI libraries)
- Import Auth.css in both Login.jsx and Signup.jsx
- Keep code clean and readable
- Avoid unnecessary animations

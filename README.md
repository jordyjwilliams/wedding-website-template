# [Wedding Website Template](https://wedding-website-template.netlify.app/)

A [generic template](https://wedding-website-template.netlify.app/) to use for a wedding website. Aimed at being easy to customise for various differing use cases.

Built with:

[![Svelte](https://img.shields.io/badge/Svelte-5.14-FF3E00?logo=svelte)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn-svelte](https://img.shields.io/badge/shadcn--svelte-Components-000000?logo=svelte)](https://www.shadcn-svelte.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Functions-00C7B7?logo=netlify)](https://www.netlify.com/)

## 🔎 [Example](https://wedding-website-template.netlify.app/)

- 🧪 View this [example template here](https://wedding-website-template.netlify.app/).
- 🛝 Have a play around and see if you like the template.
- 🧠 Any thoughts/feedback/suggestions welcome.
  - 🗒️ Creating this for my upcoming wedding was a learning exercise for me and any feedback is welcomed!

> [!NOTE]
>
> - If you want to test this out the password for the template is the very-super-secure: `nullop-123` to showcase this template and it's functionality.
> - Obviously if you choose to deploy this as is, don't expose the password.
> - Nothing on the template as it's currently configured exposes any personal information.

## ✨ Features

- 🔒 **Authentication** - Server-side passcode verification
- 🎨 **Theming** - Modern design with beautiful animations
  - More optimizations and themeing/animations to come.
- 📱 **Responsive** - Optimized for mobile and desktop
- 🔆 **Light/Dark Mode Toggle** - Because why not 😂
- 📝 **RSVP System** - Google Sheets integration
  - WIP: Not currently tested yet
- 🚀 **Free Hosting** - [Deployed on Netlify](https://wedding-website-template.netlify.app/)
  - Deployed dummy template with placeholder/anon copy.

## 🚀 Quick Start

### 🥫 Prerequisites

- Node.js 24+ and npm 11+
- [Netlify CLI](https://docs.netlify.com/cli/get-started/): `npm install -g netlify-cli`

### ⌨️ Installation

```bash
# Clone the repository
git clone https://github.com/jordyjwilliams/wedding-website-template
cd wedding-website-template

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Required auth variables
# WEDDING_PASSCODE=YourSecretPasscode
# SESSION_SIGNING_SECRET=<generate with: openssl rand -hex 32>
```

#### Required Environment Variables

Set these in local `.env` and in Netlify dashboard:

- `WEDDING_PASSCODE`: passcode guests enter on the login screen.
- `SESSION_SIGNING_SECRET`: strong random signing secret used for HMAC session cookies.

Generate a strong signing secret on macOS:

```bash
openssl rand -hex 32
```

### 💻 Development

```bash
# Start development server with Netlify Functions
netlify dev
```

Visit [http://localhost:8888](http://localhost:8888)

> [!IMPORTANT]
>
> - Use `netlify dev` instead of `npm run dev` to enable Netlify Functions for passcode authentication.

### ✨ Make It **YOURS**...

#### 🖼️ Background images

> [!TIP]
>
> - All images in `static/images` are currently placeholder images/duplicates.
> - Replaces these with memorabale images that you'd like for your site.

#### ✍️ Copy

> [!WARNING]
>
> - Currently all placeholder/dummy text
> - Fill this out as you desire.

#### 💌 Google Sheets RSVP

- This is left as optinal within template currently.
- To set this up properly.

> [!NOTE]
>
> - This is yet to be properly tested.
> - Placeholder stubs for now.

## 🛠 Development Scripts

```bash
# Updating dependencies
npm run update-deps
npx npm-check-updates
# Run development server with functions
netlify dev

# Type checking
npm run check

# Build for production
npm run build

# Lint and format
npm run lint
npm run format

# Deploy to production
npm run deploy
```

# 🚀 Deployment

## 🔐 Authentication + Security

This template uses server-verified sessions:

- Passcode verification is handled server-side using Netlify Functions.
- Successful login sets a signed, HttpOnly cookie (`wedding_auth`).
- Session validity is checked server-side (`/.netlify/functions/check-session`).
- Logout clears the cookie server-side (`/.netlify/functions/logout-session`).
- Session lifetime is 24 hours (`SESSION_DURATION_SECONDS = 24 * 60 * 60`).

Security defaults:

- Cookies are sent with `SameSite=Lax` and `Secure` on HTTPS.
- Auth function responses set `Cache-Control: no-store` and hardening headers.
- Basic brute-force throttling is enabled: 5 attempts per 15 minutes.

> [!NOTE]
>
> **Known Limitation**
>
> - Rate limiting is in-memory in a serverless function, so it is best-effort across cold starts/scale-out.

> [!WARNING]
>
> - Currently I have only deployed the `template` version of this wedding website.
> - Still under active development.

# 💥🍀 TODOs/Planned

- 🐠 **Animataions**
  - 🔠 Initials to be animated in navbar
- 🎨 **Styling** General improvements.
  - 🛰️ Navbar underlines.
  - 📱 Enhance backgrounds on mobile.
  - 📌 Further optimize usage and usability in general.
- 🗃️ Test/Validate and linkup google sheets.

# 💒 Wedding Website - Jordy & Nicole

A wedding website built using [this public template](https://wedding-website-template.netlify.app/)

Built with:

[![Svelte](https://img.shields.io/badge/Svelte-5.14-FF3E00?logo=svelte)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn-svelte](https://img.shields.io/badge/shadcn--svelte-Components-000000?logo=svelte)](https://www.shadcn-svelte.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Functions-00C7B7?logo=netlify)](https://www.netlify.com/)

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

### Installation

```bash
# Clone the repository
git clone https://github.com/jordyjwilliams/wedding-website
cd wedding-website

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
> - Names kept consistent eg `{{page}}-bg.webp`.

> [!NOTE]
>
> - Use WebP for consistent rendering across pages.
> - `ffmpeg` can be used to convert.
> - Example command: `ffmpeg -i "$HOME/Downloads/example-image.jpg" -c:v libwebp -quality 76 -compression_level 6 -preset picture "$HOME/Downloads/{{page}}-bg.webp"`
>   - Can add `-vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080"` to attempt to automatically re-scale images.

Convert all files in `static/images` to normalized WebP outputs:

```bash
find static/images -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) -print0 |
while IFS= read -r -d '' f; do
  out="static/images/$(basename "${f%.*}").webp"
  ffmpeg -y -i "$f" \
    -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" \
    -c:v libwebp -quality 76 -compression_level 6 -preset picture \
    "$out"
done
```

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
  - 🖼️ Fix up all animations RE consistency/tweaking.
- 🎨 **Styling** General improvements.
  - ✅ 📌 Further optimize usage and usability in general.
  - 👓 Fix redability of text on all pages.
  - 🎨 Tweak all colors and theming.
  - 🔢 Replace numbers with days on `Wedding` page.
- 🗃️ Test/Validate and linkup google sheets.
  - 🔎 Once validated ensure only one submission per email (if already exists)
- ✍️ **Content**
  - 🙋 More data on FAQ page. Nicer rendering of cards from copy.
  - 📸 Add gallery to our story page.
- 🙋 **FAQs**
  - 🏖️ Summary/expanded view for each entry.
  - 🌴 Set each entry in grid baased on data in content.

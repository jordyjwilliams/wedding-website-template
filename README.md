# [Wedding Website Template](https://wedding-website-template.netlify.app/)

A [generic template](https://wedding-website-template.netlify.app/) to use for a wedding website. Aimed at being easy to customise for various differing use cases.

Built with:

[![Svelte](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjordyjwilliams%2Fwedding-website-template%2Fmain%2Fpackage.json&query=%24.devDependencies.svelte&label=Svelte&color=FF3E00&logo=svelte)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjordyjwilliams%2Fwedding-website-template%2Fmain%2Fpackage.json&query=%24.devDependencies.typescript&label=TypeScript&color=3178C6&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjordyjwilliams%2Fwedding-website-template%2Fmain%2Fpackage.json&query=%24.devDependencies.tailwindcss&label=Tailwind&color=38B2AC&logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn-svelte](https://img.shields.io/badge/shadcn--svelte-000000?logo=svelte)](https://www.shadcn-svelte.com/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/136fb0f2-b55b-429a-887f-595e9e6c6d72/deploy-status)](https://app.netlify.com/projects/wedding-website-template/deploys)

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

- Node.js 24+ and pnpm 10+
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)

### ⌨️ Installation

```bash
# Clone the repository
git clone https://github.com/jordyjwilliams/wedding-website-template
cd wedding-website-template

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Required auth variables
# WEDDING_PASSCODE=YourSecretPasscode
# SESSION_SIGNING_SECRET=<generate with: openssl rand -hex 32>
```

#### Environment Variables

Set these in local `.env` and in Netlify dashboard:

- `WEDDING_PASSCODE` (required): passcode guests enter on the login screen.
- `SESSION_SIGNING_SECRET` (required): strong random signing secret used for HMAC session cookies.
- `VITE_PUBLIC_SITE_URL` (optional): canonical site URL included in Google Calendar event details.
  - If left commented: Uses site origin (where deployed)

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
> - Use `netlify dev` instead of `pnpm run dev` to enable Netlify Functions for passcode authentication.

### 🧪 Testing

Unit tests with **Vitest**

```bash
# Watch mode
pnpm test

# With coverage
pnpm test:coverage
```

Structure split into `unit` and planning to add `ui`.

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

For the repeated Our Story cards (alternating left/right image layout):

- Recommended source/output format: WebP
- Recommended dimensions: `1200x1600` (3:4 portrait)
- Recommended quality: 72-80 (good quality with strong compression)

Resize one photo for an Our Story card:

```bash
ffmpeg -y -i "$HOME/Downloads/story-photo.jpg" \
  -vf "scale=1200:1600:force_original_aspect_ratio=increase,crop=1200:1600" \
  -c:v libwebp -quality 76 -compression_level 6 -preset picture \
  "static/images/our-story-scroll-placeholder.webp"
```

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
pnpm run update-deps
npx npm-check-updates
# Run development server with functions
netlify dev

# Type checking
pnpm run check

# Build for production
pnpm run build

# Lint and format
pnpm run lint
pnpm run format

# Deploy to production: cli (handled by Netlify repo integration)
pnpm run deploy
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
  - 🐳 Fix up all animations RE consistency/tweaking.
- 🎨 **Styling** General improvements.
  - ✅ 📌 Further optimize usage and usability in general.
  - 👓 Fix redability of text on all pages.
  - 🖼️ Our story page - consistant image / facts alignment.
  - 🎨 Tweak all colors and theming.
  - 🔢 Replace numbers with days on `Wedding` page.
- 🗃️ Test/Validate and linkup google sheets.
  - 🔎 Once validated ensure only one submission per email (if already exists)
- ✍️ **Content**
  - 🌐 Use existing `InlineLinkSegment` for all text from `COPY` and `CONTENT` where it makes sence.
- 🧪 **Unit Tests**
  - 🖥️ **@testing-library/svelte**: for ui tests.
  - 📈 Report coverage on ci.

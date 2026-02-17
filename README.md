# 💒 Wedding Website - Jordy & Nicole

A wedding website built with:

[![Svelte](https://img.shields.io/badge/Svelte-5.14-FF3E00?logo=svelte)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn-svelte](https://img.shields.io/badge/shadcn--svelte-Components-000000?logo=svelte)](https://www.shadcn-svelte.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Functions-00C7B7?logo=netlify)](https://www.netlify.com/)

## ✨ Features

- 🔒 **Authentication** - Server-side passcode verification
- 🎨 **Theming** - Modern design with beautiful animations
- 📱 **Responsive** - Optimized for mobile and desktop
- 📝 **RSVP System** - Google Sheets integration
- 🚀 **Free Hosting** - Deployed on Netlify: TODO

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm 10+
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

# Edit .env and set your passcode
# WEDDING_PASSCODE=YourSecretPasscode
```

### Development

```bash
# Start development server with Netlify Functions
netlify dev
```

Visit [http://localhost:8888](http://localhost:8888)

> **Important**: Use `netlify dev` instead of `npm run dev` to enable Netlify Functions for passcode authentication.

> [!NOTE]
>
> - This whole project is currently `WIP` and yet to be deployed.
> - Below is me setting out how I plan to implement this.

### TODOs

#### Copy

Currently placeholder text... To write and fill this out:

| Copy to write      | File                                       |
| ------------------ | ------------------------------------------ |
| Wedding semantics  | `src/lib/components/Hero.svelte`           |
| Our story          | `src/lib/components/AboutUs.svelte`        |
| Schedule           | `src/lib/components/WeddingDetails.svelte` |
| Venue details/FAQs | `src/lib/components/VenueInfo.svelte`      |

#### Google Sheets RSVP

- This is left as optinal within template currently.
- To set this up properly.

## 🛠 Development Scripts

```bash
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

## 📁 Project Structure

```
wedding-website/
├── src/
│   ├── routes/          # SvelteKit pages
│   │   ├── +page.svelte       # Login/passcode page
│   │   ├── +layout.svelte     # App layout with auth
│   │   ├── home/              # Home page (Hero + About)
│   │   ├── wedding/           # Wedding details page
│   │   └── rsvp/              # RSVP form page
│   ├── lib/
│   │   └── components/  # Svelte components
│   └── app.css          # Global styles
├── netlify/
│   └── functions/       # Serverless functions
│       └── verify-passcode.ts # Auth function
├── static/              # Static assets
└── .env.example         # Environment variables template
```

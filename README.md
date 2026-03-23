# Wedding Website Template

A wedding website built with:

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
- 📝 **RSVP System** - Google Sheets integration
    - WIP: Not currently tested yet
- 🚀 **Free Hosting** - Deployed on Netlify: TODO
    - WIP: Not currently tested yet
    - Deploy as you feel. I have set this up assuming will deploy with netlify.

## 🚀 Quick Start

### Prerequisites

- Node.js 24+ and npm 11+
- [Netlify CLI](https://docs.netlify.com/cli/get-started/): `npm install -g netlify-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/jordyjwilliams/wedding-website-template
cd wedding-website-template

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

> [!IMPORTANT] 
> * Use `netlify dev` instead of `npm run dev` to enable Netlify Functions for passcode authentication.

> [!NOTE]
>
> - This whole project is currently `WIP` and yet to be deployed.
> - Below is me setting out how I plan to implement this.

### TODO: To make it yours...

#### Background images

> [!TIP]
>
> - All images in `static/images` are currently placeholder images/duplicates.
> - Replaces these with memorabale images that you'd like for your site.

#### Copy

> [!WARNING]
>
> - Currently all placeholder/dummy text
> - Fill this out as you desire.

#### Google Sheets RSVP

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

> [!WARNING]
>
> - Again, currently in WIP format.
> - Yet to be deployed but should be straightforward.

# 🚀 Quick Setup Guide

## First Time Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and set your passcode
# Change YourSecretPasscode to your actual wedding passcode
```

Example `.env` file:

```bash
WEDDING_PASSCODE=YourActualPasscode2026
```

### 3. Start Development Server

```bash
netlify dev
```

Visit: http://localhost:8888

## Testing Passcode

1. Open http://localhost:8888 in your browser
2. Enter the passcode you set in `.env`
3. You should be able to access the wedding site

## Customization Checklist

- [ ] Set `WEDDING_PASSCODE` in `.env`
- [ ] Update names in `src/lib/components/Hero.svelte`
- [ ] Update wedding dates in `src/lib/components/Hero.svelte`
- [ ] Add your love story in `src/lib/components/AboutUs.svelte`
- [ ] Update wedding schedule in `src/lib/components/WeddingDetails.svelte`
- [ ] (Optional) Configure Google Sheets RSVP (see `google-apps-script.js`)

## Deploy to Netlify

### Option 1: Connect GitHub Repository

1. Push your code to GitHub
2. Go to [netlify.com](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Netlify auto-detects settings from `netlify.toml`
6. **Important**: Add `WEDDING_PASSCODE` in Site settings → Environment variables
7. Deploy!

### Option 2: Manual Deploy

```bash
npm run deploy
```

## Important Notes

### ⚠️ Never Commit `.env` File

The `.env` file is in `.gitignore` and should NEVER be committed to your repository. It contains your secret passcode.

### ✅ Production Environment Variables

When deploying to Netlify, you MUST set `WEDDING_PASSCODE` in the Netlify dashboard:

1. Go to your site in Netlify
2. Site settings → Environment variables
3. Add: `WEDDING_PASSCODE` = `YourActualPasscode`

### 📁 Local Documentation

The `todo/` directory contains detailed documentation but is not committed to the repository. Check there for:

- Detailed deployment guides
- Security best practices
- Development workflows
- Enhancement ideas

## Troubleshooting

### Passcode not working locally

- Make sure `.env` file exists
- Check `WEDDING_PASSCODE` is set correctly
- Restart `netlify dev` after changing `.env`

### Passcode not working in production

- Verify environment variable is set in Netlify dashboard
- Redeploy the site after adding environment variables
- Check function logs in Netlify dashboard

### Build errors

```bash
# Clear everything and reinstall
rm -rf node_modules .svelte-kit build
npm install
npm run build
```

## Need Help?

See the main [README.md](README.md) or check `todo/` directory for detailed documentation.

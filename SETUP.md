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
npm run dev
```

Visit: http://localhost:5173

## Testing Passcode

1. Open http://localhost:8888 in your browser
2. Enter the passcode you set in `.env`
3. You should be able to access the wedding site

## Customization Checklist

- [ ] Set `WEDDING_PASSCODE` in `.env`
- [ ] Update all copy in `src/lib/content.ts` and `src/lib/constants.ts`
- [ ] (Optional) Configure Google Sheets RSVP (see `google-apps-script.js`)
  - See note in readme. Yet to be tested

## Deploy to Vercel

### Option 1: Connect GitHub Repository

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project" → "Import Git Repository"
4. Select your GitHub repository
5. Vercel auto-detects SvelteKit from `svelte.config.js`
6. **Important**: Add environment variables in Project → Settings → Environment Variables:
   - `WEDDING_PASSCODE`
   - `SESSION_SIGNING_SECRET`
7. Deploy!

### Option 2: Manual Deploy via CLI

```bash
npm install -g vercel
npm run deploy
```

## Important Notes

### ⚠️ Never Commit `.env` File

The `.env` file is in `.gitignore` and should NEVER be committed to your repository. It contains your secret passcode.

### ✅ Production Environment Variables

When deploying to Vercel, you MUST set both variables in the Vercel dashboard:

1. Go to your project on vercel.com
2. Project Settings → Environment Variables
3. Add: `WEDDING_PASSCODE` = `YourActualPasscode`
4. Add: `SESSION_SIGNING_SECRET` = `<output of openssl rand -hex 32>`

### 📁 Local Documentation

- Currently I set this up such that the `todo/` directory contains internal and non-committed documentation.
- Use this if you require.
- I used this to store generic notes that I did not want comitted.

## Troubleshooting

### Passcode not working locally

- Make sure `.env` file exists
- Check `WEDDING_PASSCODE` and `SESSION_SIGNING_SECRET` are set correctly
- Restart `npm run dev` after changing `.env`

### Passcode not working in production

- Verify both environment variables are set in the Vercel dashboard
- Redeploy the site after adding environment variables
- Check function logs in Vercel dashboard (Project → Functions tab)

### Build errors

```bash
# Clear everything and reinstall
rm -rf node_modules .svelte-kit build
npm install
npm run build
```

## Need Help?

See the main [README.md](README.md).

# 🚀 Deployment Evaluation

> **TL;DR** — Stay on Netlify for this public template. For a **private production site**, migrate to **Vercel** (Hobby tier): it is the only option among these three that supports private personal repositories for free, has a more generous serverless function quota, and requires zero upfront cost.

---

## 📋 Context

This template is a SvelteKit app that requires:

- **Server-side functions** for passcode authentication (session signing/verification)
- **Custom domain** support for the production wedding site
- **Private repository** for the real (non-template) production deployment
- **Low traffic**: ~50–100 guests internationally, a handful of sessions concurrently at most
- **Zero or minimal cost** — free tier preferred

---

## 🔍 Platform Comparison

### Netlify (Current)

| Feature                 | Free (New)        | Legacy Free          |
| ----------------------- | ----------------- | -------------------- |
| Bandwidth               | 100 GB/month      | 100 GB/month         |
| Serverless functions    | 125,000 req/month | 125,000 req/month    |
| Build minutes           | 300/month         | 300/month            |
| Custom domain + SSL     | ✅                | ✅                   |
| **Private repo deploy** | ❌                | ❌                   |
| Cost                    | Free              | Free (grandfathered) |

> [!IMPORTANT]
>
> **Private repositories require a paid Netlify plan.** The Starter plan starts at ~$9/month and the Pro plan at ~$19/member/month. Neither legacy nor current free tiers support deploying from a private repo.

> [!NOTE]
>
> The legacy free plan (currently in use by this template) is being migrated to a new credit-based system. Once switched, the transition is irreversible. Limits remain the same but are now tracked as credits (300 credits/month on the free tier).

**Migration effort if staying on Netlify for private production repo:** You would need to upgrade to a paid plan (~$9+/month).

---

### Vercel (Hobby — Free)

| Feature                 | Hobby tier                              |
| ----------------------- | --------------------------------------- |
| Bandwidth               | 100 GB/month                            |
| Serverless functions    | **1,000,000 req/month**                 |
| Build minutes           | 6,000 minutes/month                     |
| Custom domain + SSL     | ✅ (up to 50 per project)               |
| **Private repo deploy** | ✅ (personal repos only, not org repos) |
| Commercial use          | ❌ (personal/non-commercial only)       |
| Cost                    | Free                                    |

> [!NOTE]
>
> Vercel's Hobby tier is explicitly for non-commercial use. A personal wedding website qualifies. If this were a commercial product, you'd need the Pro tier ($20/member/month).

> [!NOTE]
>
> Org/team repositories (e.g. a GitHub Organisation repo) require a paid Vercel Pro plan. Personal GitHub account private repos are supported for free.

**Migration effort to Vercel:** Medium. The Netlify Functions (`netlify/functions/*.ts`) use a Netlify-specific SDK and would need to be rewritten as SvelteKit API routes (`src/routes/api/*/+server.ts`), which are platform-agnostic and work with any adapter. The adapter would change from `@sveltejs/adapter-netlify` to `@sveltejs/adapter-vercel`. Security headers currently in `netlify.toml` would move to `vercel.json`.

---

### Cloudflare Pages (Free)

| Feature                 | Free tier           |
| ----------------------- | ------------------- |
| Bandwidth               | Unlimited           |
| Serverless functions    | 100,000 req/**day** |
| Build minutes           | 500/month           |
| Custom domain + SSL     | ✅                  |
| **Private repo deploy** | ✅                  |
| Commercial use          | ✅                  |
| Cost                    | Free                |

> [!WARNING]
>
> **Cloudflare Workers use a different runtime** — V8 isolates, not Node.js. This means `process.env` is unavailable; environment variables are injected via a `platform.env` object specific to the Cloudflare adapter. The existing serverless functions would need to be refactored for this runtime model. The free tier also imposes a strict **10ms CPU time per request**, which is tighter than Vercel's 10-second limit. For HMAC signing (used in the auth functions here), this should still be fine in practice, but it is a meaningful constraint.

**Migration effort to Cloudflare:** High. Requires rewriting all server-side functions to use the Cloudflare Workers `platform.env` API instead of `process.env`, swapping to `@sveltejs/adapter-cloudflare`, and testing in the Cloudflare runtime. The unlimited bandwidth is attractive, but the runtime differences add friction.

---

## 📊 Summary Table

|                         | **Netlify (current)** | **Vercel Hobby** | **Cloudflare Pages** |
| ----------------------- | --------------------- | ---------------- | -------------------- |
| Free tier               | ✅                    | ✅               | ✅                   |
| Bandwidth               | 100 GB/month          | 100 GB/month     | Unlimited            |
| Function quota          | 125k req/month        | **1M req/month** | 100k req/day         |
| Build minutes           | 300/month             | 6,000/month      | 500/month            |
| Custom domain (free)    | ✅                    | ✅               | ✅                   |
| **Private repo (free)** | ❌                    | ✅               | ✅                   |
| Standard Node.js env    | ✅                    | ✅               | ❌                   |
| SvelteKit adapter       | `adapter-netlify`     | `adapter-vercel` | `adapter-cloudflare` |
| Migration effort        | — (none)              | **Medium**       | High                 |
| Cost for private repo   | ~$9+/month            | Free             | Free                 |

---

## ✅ Recommendation

### For this public template repo → **Stay on Netlify**

No changes needed. The template deploys from a public repo and the free tier works fine. The 125k function invocations/month is more than enough for demo/template traffic. No reason to migrate.

### For the private production wedding site → **Migrate to Vercel**

Vercel is the clearest win for the production deployment:

1. **Private repos are free** — the single most important constraint is solved at zero cost.
2. **1M function invocations/month** — 8× more headroom than Netlify, while a wedding with 50–100 guests will use a tiny fraction of this.
3. **Standard Node.js runtime** — the existing TypeScript auth functions translate cleanly to SvelteKit API routes with minimal changes. No runtime surprises.
4. **No ongoing cost** — stays free for the lifetime of a personal wedding site.
5. **SvelteKit is well-supported** — `@sveltejs/adapter-vercel` is an official adapter maintained by the SvelteKit team.

Cloudflare Pages is free and has unlimited bandwidth, but the migration cost is higher (different runtime API, environment variable model, CPU time constraints) and the payoff for this specific use case (low traffic, no bandwidth concerns) is marginal.

---

## 🔧 Migration Path (Netlify → Vercel, for private production site)

If you choose to migrate the production site to Vercel, the key steps are:

1. **Replace the adapter**

   ```bash
   npm uninstall @sveltejs/adapter-netlify @netlify/functions
   npm install -D @sveltejs/adapter-vercel
   ```

2. **Update `svelte.config.js`**

   ```js
   import adapter from '@sveltejs/adapter-vercel';
   export default { kit: { adapter: adapter() } };
   ```

3. **Convert Netlify Functions → SvelteKit API routes**
   - `netlify/functions/verify-passcode.ts` → `src/routes/api/verify-passcode/+server.ts`
   - `netlify/functions/check-session.ts` → `src/routes/api/check-session/+server.ts`
   - `netlify/functions/logout-session.ts` → `src/routes/api/logout-session/+server.ts`
   - Update fetch URLs in `src/lib/auth.ts` and `src/routes/+page.svelte` from `/.netlify/functions/*` to `/api/*`

4. **Add `vercel.json`** for security headers (equivalent to `netlify.toml` headers block)

5. **Set environment variables** in the Vercel dashboard:
   - `WEDDING_PASSCODE`
   - `SESSION_SIGNING_SECRET`

6. **Connect your private GitHub repo** in the Vercel dashboard → deploy.

> [!NOTE]
>
> The SvelteKit API route format (`+server.ts` with `RequestHandler`) is entirely platform-agnostic — it works with Netlify, Vercel, Cloudflare, and Node adapters. Migrating away from the Netlify-SDK-specific function format is also a code quality improvement.

---

## 📚 References

- [Netlify Pricing](https://www.netlify.com/pricing/)
- [Netlify Legacy Plan Billing FAQ](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-legacy-plans/billing-faq-for-legacy-plans/)
- [Vercel Hobby Plan Docs](https://vercel.com/docs/plans/hobby)
- [Vercel Pricing](https://vercel.com/pricing)
- [Cloudflare Pages Pricing](https://developers.cloudflare.com/pages/platform/limits/)
- [SvelteKit — Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/)
- [`@sveltejs/adapter-vercel`](https://kit.svelte.dev/docs/adapter-vercel)
- [`@sveltejs/adapter-cloudflare`](https://kit.svelte.dev/docs/adapter-cloudflare)

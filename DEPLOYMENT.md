# 🚀 Deployment Evaluation

> **TL;DR** — Stay on Netlify. The legacy Starter plan **does** support personal private GitHub repos for free, making it viable for the private production site. Vercel Hobby is also free and more future-proof (no plan-migration risk, 8× the function quota). See the [Recommendation](#-recommendation) section for the full trade-off.

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

| Feature                          | Free (New)        | Legacy Starter       |
| -------------------------------- | ----------------- | -------------------- |
| Bandwidth                        | 100 GB/month      | 100 GB/month         |
| Serverless functions             | 125,000 req/month | 125,000 req/month    |
| Build minutes                    | 300/month         | 300/month            |
| Custom domain + SSL              | ✅                | ✅                   |
| **Personal private repo deploy** | ❌                | ✅                   |
| **Org private repo deploy**      | ❌                | ❌ (Pro+ required)   |
| Cost                             | Free              | Free (grandfathered) |

> [!NOTE]
>
> The legacy Starter plan (currently in use by this template) **does support deploying from personal private GitHub repositories** — i.e. repos owned by an individual GitHub account. Organisation-owned private repos require a Pro plan (~$19/member/month) on both legacy and new plans.

> [!IMPORTANT]
>
> The legacy free plan is being migrated to a new credit-based system. Once you switch, the change is **irreversible** — you lose legacy plan features including personal private repo support on the free tier. New accounts get the credit-based plan automatically, which does **not** include private repo support.

**Conclusion for staying on Netlify:** If your production site lives in a personal private repo on a legacy Starter account, you can stay on Netlify for free today. The main risk is that migrating away from the legacy plan (or creating a new account) loses this perk.

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

|                                    | **Netlify legacy Starter** | **Vercel Hobby** | **Cloudflare Pages** |
| ---------------------------------- | -------------------------- | ---------------- | -------------------- |
| Free tier                          | ✅                         | ✅               | ✅                   |
| Bandwidth                          | 100 GB/month               | 100 GB/month     | Unlimited            |
| Function quota                     | 125k req/month             | **1M req/month** | 100k req/day         |
| Build minutes                      | 300/month                  | 6,000/month      | 500/month            |
| Custom domain (free)               | ✅                         | ✅               | ✅                   |
| **Personal private repo (free)**   | ✅ (legacy only)           | ✅               | ✅                   |
| **Org private repo (free)**        | ❌                         | ❌               | ✅                   |
| Standard Node.js env               | ✅                         | ✅               | ❌                   |
| SvelteKit adapter                  | `adapter-netlify`          | `adapter-vercel` | `adapter-cloudflare` |
| Migration effort                   | — (none)                   | **Medium**       | High                 |
| Risk of losing private repo access | ⚠️ if plan switches        | None             | None                 |

---

## ✅ Recommendation

### For this public template repo → **Stay on Netlify**

No changes needed. The template deploys from a public repo and the free tier works fine. No reason to migrate.

### For the private production wedding site → **Netlify legacy Starter is fine, for now**

If you already have a legacy Netlify Starter account, you can deploy a personal private repo from it for free today. The limits (125k function invocations/month, 100 GB bandwidth) are more than sufficient for a ~50–100 guest wedding site.

**However**, there are two reasons to still consider Vercel:

1. **The legacy plan is a ticking clock.** If you ever create a new Netlify account (or are prompted to migrate), you lose personal private repo support on the free tier. Vercel's Hobby plan has no such fragility — private personal repos are a documented, stable feature of the tier.
2. **Vercel has 8× the function quota** (1M vs 125k/month) and 20× the build minutes (6,000 vs 300/month), for the same price: free.

If you are comfortable managing the Netlify legacy plan risk and want zero migration effort, **stay on Netlify**. If you want a more future-proof setup with headroom for growth, **migrate to Vercel**.

> [!NOTE]
>
> See the companion branch [`copilot/vercel-migration-example`](https://github.com/jordyjwilliams/wedding-website-template/compare/copilot/vercel-migration-example) for a fully working example of what the Vercel migration looks like in code.

Cloudflare Pages is free and has unlimited bandwidth and supports org repos, but the migration cost is higher (different runtime API, environment variable model) and the payoff for this specific use case is marginal.

---

## 🔧 Migration Path (Netlify → Vercel, optional)

If you decide to move the production site to Vercel, the key steps are:

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

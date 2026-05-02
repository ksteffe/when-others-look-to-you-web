# When Others Look to You (web)

Next.js (App Router) marketing site. Content and asset paths live in `lib/content.ts`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other useful commands:

```bash
npm run build   # production build (same as Vercel)
npm run start   # run production build locally
npm run lint
```

## Deploy to Vercel

1. Push the repo to GitHub (or GitLab / Bitbucket).
2. In [Vercel](https://vercel.com), click **Add New… → Project** and import the repository.
3. Leave the defaults: **Framework Preset** Next.js, **Build Command** `npm run build`, **Output** handled automatically.
4. No environment variables are required for the current build.

To deploy from the CLI: install the [Vercel CLI](https://vercel.com/docs/cli), run `vercel` in the project root, and follow the prompts.

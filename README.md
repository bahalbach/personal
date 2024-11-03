This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

## Deploy on Vercel

```bash
pnpm release
```

This command will collect the most up to date content on github and deploy it to www.benhalbach.com

Deploy the project to a preview build with the `vercel` command from the root directory:

```bash
vercel
```

add `--prod` to deploy to production

### Deploy from a local build

in one command, deploy local build to prod: `vercel build --prod && vercel deploy --prebuilt --prod`

```bash
vercel build
# to deploy locally
vercel deploy --prebuilt
# to deploy to production
vercel deploy --prebuilt --prod
# in one command, deploy local build to prod
vercel build --prod && vercel deploy --prebuilt --prod
```

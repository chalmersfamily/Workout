# Fall Training Tracker — Vercel deployment

This turns your tracker into a real shared web app: one URL, same checked-off
progress no matter which phone or computer you open it from.

## What's in here

- `index.html` — the tracker page (same one you already have, pointed at the API instead of local storage)
- `api/state.js` — a tiny serverless function that reads/writes your progress
- `package.json` — one dependency (`@vercel/kv`, Vercel's built-in Redis-like storage)

No build step, no framework — Vercel serves `index.html` as-is and auto-detects `api/` as serverless functions.

## Steps to deploy

**1. Install the Vercel CLI (one-time, on your computer)**
```
npm install -g vercel
```
(Needs Node.js installed — if you don't have it, get it from nodejs.org first.)

**2. Log in**
```
vercel login
```
Follow the prompts (it'll open a browser to confirm).

**3. Deploy from this folder**
```
cd vercel-tracker
vercel
```
Answer the prompts with defaults (set up and deploy → yes, link to existing project → no, project name → anything you like). It'll give you a URL right away — but the storage isn't connected yet, so skip ahead before using it.

**4. Add the KV storage**
- Go to your project on vercel.com → **Storage** tab → **Create Database** → choose **KV**.
- Follow the prompt to connect it to this project. Vercel automatically adds the right environment variables — you don't need to copy/paste any keys yourself.

**5. Redeploy so the new storage connection takes effect**
```
vercel --prod
```

**6. Open the URL it gives you on any device**
Same checked-off state everywhere, no login needed on your end.

## A couple of honest notes

- **No password protection built in.** Anyone with the exact URL could see and check off your tracker. That's a non-issue in practice (it's an obscure random URL, not something anyone will guess), but don't post the link publicly.
- **Free tier is plenty for this.** One person checking boxes a few times a day is nowhere near Vercel's free usage limits.
- **Add to your phone's home screen** the same way as before (Share → Add to Home Screen) once it's live — now it'll point at the real URL instead of a local file, so it'll sync.

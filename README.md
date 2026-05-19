# GroundUpp Landing Page

A premium Vite + React landing page for GroundUpp.co.uk.

## Local setup

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Vercel settings

- Framework Preset: Vite
- Install Command: npm install
- Build Command: npm run build
- Output Directory: dist
- Root Directory: ./ unless the files are inside a nested folder

## Domain setup

Use GroundUpp.co.uk for the landing page.
Use Grounduppapp.co.uk for the app.

In Vercel, add GroundUpp.co.uk under Project Settings > Domains, then follow Vercel's DNS instructions at your domain registrar.

## Waitlist form

The current waitlist form opens an email to hello@groundupp.co.uk. Later this can be swapped for Mailchimp, ConvertKit, Resend, Supabase, Airtable, HubSpot, or a custom database.

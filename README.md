# අකිඳු ඉමන්ත Portfolio

React + Vite portfolio template prepared for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

Run the backend in a second terminal. It handles contact emails, analytics, and local certificate uploads:

```bash
npm run server
```

Copy `.env.example` to `.env`, then set `SMTP_PASS` to a new Gmail app password.
Do not commit `.env`.

## Build

```bash
npm run build
```

## Certificate uploads

Open the private editor at `#grade-admin`, unlock it with the existing `ANALYTICS_ADMIN_TOKEN`, and use the Certificates panel. It accepts PDF, JPG, PNG, and WebP files up to 10 MB, shows a preview, and publishes uploaded certificates in the Education section. The app keeps a maximum of 30 certificates.

Certificate files uploaded in the private editor are saved to `public/upload`, with their course names and public URLs stored in `output/certificates.json`. Run both `npm run dev` and `npm run server` while uploading locally. Uploads support PDF, JPG, PNG, and WebP files up to 10 MB, with a 30-certificate limit. These files live on this computer and are not included in a GitHub Pages or Vercel deployment automatically; a deployed site needs a persistent server or object storage for shared uploads.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Open the repository on GitHub.
3. Go to `Settings > Pages`.
4. Under `Build and deployment`, choose `GitHub Actions`.
5. Push to the `main` branch.
6. GitHub will run `.github/workflows/deploy.yml` and publish the `dist` folder.

## Customize

- Update `src/App.jsx` with your real bio, projects, and contact links.
- Change styles in `src/styles.css`.
- Replace placeholder links before publishing.

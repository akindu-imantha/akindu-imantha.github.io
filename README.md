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

For local uploads, run both `npm run dev` and `npm run server`; files are saved to `public/upload` and listed in `output/certificates.json`. For GitHub Pages uploads, set the GitHub Actions variables `VITE_CERTIFICATES_API_URL` (for example, `https://your-api.vercel.app/api/certificates`) and `VITE_CERTIFICATE_UPLOAD_API_URL` (for example, `https://your-api.vercel.app/api/certificate-upload`). Configure `BLOB_READ_WRITE_TOKEN`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, and `ANALYTICS_ADMIN_TOKEN` in the Vercel API project's environment variables. Redeploy the Pages site after changing its variables. Uploads support PDF, JPG, PNG, and WebP files up to 10 MB, with a 30-certificate limit.

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

# අකිඳු ඉමන්ත Portfolio

React + Vite portfolio template prepared for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

Run the contact email server in a second terminal:

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

Certificate files are uploaded directly from the browser to a public Vercel Blob store; Redis stores the public certificate listing. Create a public Blob store in the Vercel project and add its `BLOB_READ_WRITE_TOKEN` to the API host environment, along with the existing Upstash Redis variables (`KV_REST_API_URL` and `KV_REST_API_TOKEN`, or the `UPSTASH_REDIS_REST_*` aliases) and `ANALYTICS_ADMIN_TOKEN`. Uploads support PDF, JPG, PNG, and WebP files up to 10 MB. Add the deployed portfolio origin to `CORS_ORIGIN` if it is not already included. `VITE_CERTIFICATES_API_URL` is optional when using the existing portfolio API deployment.

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

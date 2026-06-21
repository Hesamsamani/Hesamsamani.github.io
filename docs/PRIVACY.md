# Privacy notes (portfolio)

## Google Fonts (optional hardening)

The site currently loads **Fraunces** and **Source Sans 3** from `fonts.googleapis.com` in `src/layouts/BaseLayout.astro`. Visitors' browsers may send their IP to Google when fonts load.

To self-host (recommended for stricter privacy):

1. Download font files from [google-webfonts-helper](https://gwfh.mranftl.com/fonts) or Google Fonts.
2. Place `.woff2` files under `public/fonts/`.
3. Replace the `<link href="https://fonts.googleapis.com/...">` block with a local `@font-face` sheet in `src/styles/global.css`.
4. Remove `fonts.gstatic.com` preconnect if unused.

This is a **P3** improvement — no functional change to the portfolio.
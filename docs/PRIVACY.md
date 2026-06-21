# Privacy notes (portfolio)

## Fonts (self-hosted)

**Fraunces** and **Source Sans 3** are bundled via `@fontsource-variable/*` and imported in `src/styles/global.css`. No requests are sent to `fonts.googleapis.com` or `fonts.gstatic.com` at runtime.

To update fonts: bump the `@fontsource-variable/fraunces` and `@fontsource-variable/source-sans-3` packages in `package.json`, then run `npm install` and `npm run build`.
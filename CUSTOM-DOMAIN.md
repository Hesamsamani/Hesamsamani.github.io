# Custom domain: hesamsamani.me

This site is published with [GitHub Pages](https://docs.github.com/en/pages) (Actions workflow) and served at **https://hesamsamani.me**.

## Repository configuration

| Item | Location / value |
|------|------------------|
| Custom domain (GitHub Pages setting) | `hesamsamani.me` |
| CNAME file in build output | `public/CNAME` → copied to `dist/CNAME` by Astro |
| Site URL in Astro | `site: 'https://hesamsamani.me'` in `astro.config.mjs` |

Configure or update the Pages custom domain via CLI:

```bash
gh api repos/Hesamsamani/Hesamsamani.github.io/pages -X PUT \
  -f cname=hesamsamani.me \
  -F https_enforced=true
```

Verify:

```bash
gh api repos/Hesamsamani/Hesamsamani.github.io/pages
```

## DNS requirements (apex domain)

`hesamsamani.me` is an **apex** (root) domain. Use **A records**, not a CNAME at the apex.

### Required A records

Point the apex host to GitHub Pages:

| Type | Name / Host | Value |
|------|-------------|-------|
| A | `@` (or `hesamsamani.me`) | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

### www subdomain (optional)

Either:

| Type | Name / Host | Value |
|------|-------------|-------|
| CNAME | `www` | `hesamsamani.github.io` |

—or— four **A records** for `www` using the same four IPs as above.

### Domain verification (if GitHub requests it)

GitHub may ask for a TXT record to verify ownership:

| Type | Name / Host | Value |
|------|-------------|-------|
| TXT | `@` | *(value shown in repo **Settings → Pages → Custom domain**)* |

Or, for subdomain verification:

| Type | Name / Host | Value |
|------|-------------|-------|
| TXT | `_github-pages-challenge-<username>` | *(challenge token from GitHub)* |

## Check DNS propagation

```bash
# Apex A records
nslookup hesamsamani.me 8.8.8.8

# www (if configured)
nslookup www.hesamsamani.me 8.8.8.8
```

Expected apex result: four addresses in the `185.199.108–111.153` range.

## HTTPS certificate

After DNS is correct and the custom domain is set in GitHub Pages:

1. GitHub provisions a TLS certificate automatically (often within minutes, sometimes up to 24 hours).
2. Enable **Enforce HTTPS** in Pages settings, or via API: `-F https_enforced=true`.
3. If HTTPS returns 404 while HTTP works, trigger a redeploy:

   ```bash
   gh workflow run deploy.yml --repo Hesamsamani/Hesamsamani.github.io
   ```

## Troubleshooting

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| `hesamsamani.github.io` works, custom domain 404 | Custom domain not set in Pages settings | Run `gh api .../pages -X PUT -f cname=hesamsamani.me` |
| HTTP works, HTTPS 404 | Certificate or CDN cache still updating | Wait; redeploy; confirm `https_enforced` |
| Domain does not resolve | Missing or wrong A records | Add the four GitHub Pages A records at your registrar |
| Certificate stuck on "pending" | DNS not propagated | Re-check A records; wait up to 24–48 h |

## Registrar

DNS is managed wherever `hesamsamani.me` is registered. Update records in that provider's DNS panel (not in this repository).
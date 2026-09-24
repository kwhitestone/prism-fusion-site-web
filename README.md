# Prism Fusion Site Web

Independent Vue frontend extracted from `kwhitestone/prism-fusion-site`
commit `5442b593c769aa9c857c7f39efa165e87d0f182e`, originally `app/src/admin`.
Business addons, public assets and production settings are retained.
Framework sources are vendored locally; no parent checkout or framework
workspace is required. See `src/vendor/prism-fusion-web/VENDORED.md`.

## Development

Use Node 22.13+ (or 20.19+) and pnpm 9.15.4.

```sh
pnpm install --frozen-lockfile
pnpm dev
npx eslint src --ext .js,.ts,.vue --max-warnings 0
npx vue-tsc --noEmit
pnpm test
pnpm build
```

The dev server listens on port 3288 and proxies `/api` to localhost:3280.
Set `VITE_API_UPSTREAM` in `.env.local` to change the development backend.
Production uses same-origin `/api/` requests.

## Container

```sh
docker build -t prism-fusion-site-web .
docker run --rm -p 3288:80 \
  -e API_UPSTREAM=http://host.docker.internal:3280 prism-fusion-site-web
```

`API_UPSTREAM` is rendered by nginx at container startup, without rebuilding
the bundle. The external TLS proxy must pass `X-Forwarded-Proto`.
The backend and frontend images are built and deployed independently.

# Touch Share

Dynamic public share pages for `app.touch.dophera.tech`.

The static landing site remains at `web.touch.dophera.tech`. This app is intended for Vercel and serves exact community post URLs:

```text
/c/{communityId}/p/{postId}
```

## Environment variables

Copy `.env.example` to `.env.local` for local development. Set the same values in Vercel:

- `BACKEND_URL`: deployed Touch backend URL.
- `NEXT_PUBLIC_SITE_URL`: `https://app.touch.dophera.tech`.
- `NEXT_PUBLIC_APP_DEEP_LINK_PREFIX`: normally `touch://community`.

The backend share-metadata endpoint must return metadata only for public published posts. Private posts should return `404`.

## Commands

```bash
npm install
npm test
npm run build
```

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
- `NEXT_PUBLIC_IOS_APP_STORE_URL`: the public App Store URL for Touch. Set this before deploying the install fallback.
- `NEXT_PUBLIC_ANDROID_PLAY_STORE_URL`: the public Google Play URL for Touch.
- `ANDROID_APPLICATION_ID`: Android package name used by App Links (default `roy.ij.touch`).
- `ANDROID_SHA256_CERT_FINGERPRINTS`: optional comma-separated SHA-256 certificate fingerprints. The app's current release certificate is included by default; set this when Play App Signing or another release certificate is used. This powers `/.well-known/assetlinks.json` so HTTPS post links open directly in the installed Android app.

The app also serves `/.well-known/apple-app-site-association` for iOS Universal Links. It associates `app.touch.dophera.tech/c/*` with `com.pandittalk.touch`.

The backend share-metadata endpoint returns full metadata for public published posts. For published posts in members-only communities, it returns redacted metadata with empty text and no media so this app can serve the generic Touch OG image without exposing private content. Missing or unpublished posts return `404`.

## Commands

```bash
npm install
npm test
npm run build
```

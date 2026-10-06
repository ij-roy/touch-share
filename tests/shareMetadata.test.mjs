import assert from 'node:assert/strict';
import test from 'node:test';

test('share app uses the Vercel app domain by default', async () => {
  const source = await (await import('node:fs/promises')).readFile('lib/config.ts', 'utf8');
  assert.match(source, /https:\/\/app\.touch\.dophera\.tech/);
});

test('share metadata uses the supplied Touch fallback image', async () => {
  const source = await (await import('node:fs/promises')).readFile('lib/config.ts', 'utf8');
  assert.match(source, /FALLBACK_OG_IMAGE_URL/);
  assert.match(source, /og-image\.jpg/);
});

test('share route keeps exact community and post identifiers', async () => {
  const source = await (await import('node:fs/promises')).readFile('app/c/[id]/p/[postId]/page.tsx', 'utf8');
  assert.match(source, /buildPostPath\(id, postId\)/);
  assert.match(source, /buildAppDeepLink\(id, postId\)/);
});

import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';

async function loadPostMetadata(fetchImpl) {
  const source = await readFile('lib/postMetadata.ts', 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022},
  }).outputText;
  const module = {exports: {}};
  const require = id => {
    if (id === './config') return {BACKEND_URL: 'https://backend.example'};
    throw new Error(`Unexpected dependency: ${id}`);
  };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  Function('require', 'module', 'exports', compiled)(require, module, module.exports);
  return {
    getShareMetadata: module.exports.getShareMetadata,
    restore: () => { globalThis.fetch = originalFetch; },
  };
}

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

test('share metadata is fetched without caching privacy-sensitive visibility', async () => {
  const requests = [];
  const loaded = await loadPostMetadata(async (...args) => {
    requests.push(args);
    return {ok: true, json: async () => ({community: {}, post: {}})};
  });
  try {
    await loaded.getShareMetadata('community 1', 'post/2');
  } finally {
    loaded.restore();
  }

  assert.deepEqual(requests, [[
    'https://backend.example/communities/community%201/content/post%2F2/share-metadata',
    {cache: 'no-store'},
  ]]);
});

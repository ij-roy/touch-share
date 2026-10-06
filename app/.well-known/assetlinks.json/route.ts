import {NextResponse} from 'next/server';

const packageName = process.env.ANDROID_APPLICATION_ID || 'roy.ij.touch';

export function GET() {
  const fingerprints = (process.env.ANDROID_SHA256_CERT_FINGERPRINTS || '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);

  return NextResponse.json([
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: packageName,
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ]);
}

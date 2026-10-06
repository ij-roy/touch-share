import {NextResponse} from 'next/server';

const packageName = process.env.ANDROID_APPLICATION_ID || 'roy.ij.touch';
const defaultFingerprint = '85:8B:1C:C8:15:A5:65:8C:3F:FC:7F:D4:35:67:C1:02:71:7F:09:4E:A6:33:F9:7C:BF:8F:78:A8:3E:EE:95:D4';

export function GET() {
  const fingerprints = (process.env.ANDROID_SHA256_CERT_FINGERPRINTS || defaultFingerprint)
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

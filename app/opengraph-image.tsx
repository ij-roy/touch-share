import {ImageResponse} from 'next/og';

export const runtime = 'edge';
export const alt = 'Touch';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff3f6', color: '#32111f', fontSize: 100, fontWeight: 800}}>
      Touch
    </div>,
    size,
  );
}

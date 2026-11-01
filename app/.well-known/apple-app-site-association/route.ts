import {NextResponse} from 'next/server';

const appleTeamId = 'K54M9H3JQG';
const bundleId = 'com.pandittalk.touch';

export function GET() {
  return NextResponse.json({
    applinks: {
      details: [
        {
          appIDs: [`${appleTeamId}.${bundleId}`],
          components: [{'/': '/c/*'}],
        },
      ],
    },
  });
}

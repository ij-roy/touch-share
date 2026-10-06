import {BACKEND_URL} from './config';

export type ShareMetadata = {
  community: {name: string; contentVisibility: 'public' | 'members'};
  post: {alias: string; text: string; media: {type: 'image'; url: string} | null};
};

export async function getShareMetadata(communityId: string, postId: string): Promise<ShareMetadata | null> {
  const response = await fetch(
    `${BACKEND_URL}/communities/${encodeURIComponent(communityId)}/content/${encodeURIComponent(postId)}/share-metadata`,
    {next: {revalidate: 300}},
  );
  if (!response.ok) return null;
  return response.json() as Promise<ShareMetadata>;
}

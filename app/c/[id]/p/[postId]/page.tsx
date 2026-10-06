import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {APP_DEEP_LINK_PREFIX, FALLBACK_OG_IMAGE_URL, SITE_URL, buildAppDeepLink, buildPostPath} from '@/lib/config';
import {getShareMetadata} from '@/lib/postMetadata';

type Props = {params: Promise<{id: string; postId: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id, postId} = await params;
  const data = await getShareMetadata(id, postId);
  const fallback = FALLBACK_OG_IMAGE_URL;
  if (!data) return {title: 'Touch community post', description: 'Read this community post on Touch.', openGraph: {images: [fallback]}};
  const image = data.post.media?.url || fallback;
  const description = data.post.text.trim().replace(/\s+/g, ' ').slice(0, 160);
  const url = `${SITE_URL}${buildPostPath(id, postId)}`;
  return {
    title: `${data.post.alias || 'Anonymous'} on ${data.community.name || 'Touch'}`,
    description,
    openGraph: {type: 'article', url, images: [image]},
    twitter: {card: 'summary_large_image', images: [image]},
  };
}

export default async function Page({params}: Props) {
  const {id, postId} = await params;
  const data = await getShareMetadata(id, postId);
  if (!data) notFound();
  const appLink = buildAppDeepLink(id, postId);
  return (
    <main>
      <div className="brand">Touch</div>
      <article className="card">
        {data.post.media?.url ? <img className="media" src={data.post.media.url} alt="Shared Touch post" /> : null}
        <div className="content">
          <div className="alias">{data.post.alias || 'Anonymous'}</div>
          <p className="muted">Community post on Touch</p>
          <p className="text">{data.post.text}</p>
          <a className="button" href={appLink}>Open in Touch</a>
          <p className="muted">App link prefix: {APP_DEEP_LINK_PREFIX}</p>
        </div>
      </article>
    </main>
  );
}

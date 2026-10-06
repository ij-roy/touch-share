import type {Metadata} from 'next';
import {APP_DEEP_LINK_PREFIX, FALLBACK_OG_IMAGE_URL, SITE_URL, buildAppDeepLink, buildPostPath} from '@/lib/config';
import {getShareMetadata} from '@/lib/postMetadata';

const SHARE_EXCERPT_LIMIT = 120;

function truncateExcerpt(text: string) {
  const normalized = text.trim().replace(/\s+/g, ' ');
  return normalized.length > SHARE_EXCERPT_LIMIT
    ? `${normalized.slice(0, SHARE_EXCERPT_LIMIT - 1).trimEnd()}…`
    : normalized;
}

type Props = {params: Promise<{id: string; postId: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id, postId} = await params;
  const data = await getShareMetadata(id, postId);
  const fallback = FALLBACK_OG_IMAGE_URL;
  if (!data) return {title: 'Touch community post', description: 'Read this community post on Touch.', openGraph: {images: [fallback]}};
  const isPublic = data.community.contentVisibility === 'public';
  const image = isPublic && data.post.media?.url ? data.post.media.url : fallback;
  const description = isPublic ? truncateExcerpt(data.post.text) : 'See this latest post on Touch.';
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
  const appLink = buildAppDeepLink(id, postId);

  if (!data) {
    return (
      <main>
        <div className="brand">Touch</div>
        <article className="card">
          <img className="media" src={FALLBACK_OG_IMAGE_URL} alt="Touch" />
          <div className="content">
            <div className="alias">Touch community post</div>
            <p className="text">This post is unavailable or private. Open it in the Touch app.</p>
            <a className="button" href={appLink}>Open in Touch</a>
          </div>
        </article>
      </main>
    );
  }

  const isPublic = data.community.contentVisibility === 'public';
  const image = isPublic && data.post.media?.url ? data.post.media.url : FALLBACK_OG_IMAGE_URL;
  return (
    <main>
      <div className="brand">Touch</div>
      <article className="card">
        <img className="media" src={image} alt={isPublic ? 'Shared Touch post' : 'Touch'} />
        <div className="content">
          <div className="alias">{data.post.alias || 'Anonymous'}</div>
          <p className="muted">Community post on Touch</p>
          {data.community.contentVisibility === 'public' ? <p className="text">{data.post.text}</p> : <p className="text">This post is available to community members in the Touch app.</p>}
          <a className="button" href={appLink}>Open in Touch</a>
          <p className="muted">App link prefix: {APP_DEEP_LINK_PREFIX}</p>
        </div>
      </article>
    </main>
  );
}

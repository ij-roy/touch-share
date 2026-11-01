export const BACKEND_URL = process.env.BACKEND_URL || 'https://touch-backend-j4mm.onrender.com';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.touch.dophera.tech';
export const FALLBACK_OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;
export const APP_DEEP_LINK_PREFIX = process.env.NEXT_PUBLIC_APP_DEEP_LINK_PREFIX || 'touch://community';
export const IOS_APP_STORE_URL = process.env.NEXT_PUBLIC_IOS_APP_STORE_URL || '';
export const ANDROID_PLAY_STORE_URL = process.env.NEXT_PUBLIC_ANDROID_PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=roy.ij.touch';

export function buildPostPath(communityId: string, postId: string) {
  return `/c/${encodeURIComponent(communityId)}/p/${encodeURIComponent(postId)}`;
}

export function buildAppDeepLink(communityId: string, postId: string) {
  return `${APP_DEEP_LINK_PREFIX}/${encodeURIComponent(communityId)}/post/${encodeURIComponent(postId)}`;
}

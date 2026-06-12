const PLACEHOLDER_COVER = '/images/placeholder-cover.jpg';
const PLACEHOLDER_AVATAR = '/images/placeholder-avatar.jpg';

export function isBrokenMediaUrl(url?: string | null): boolean {
  if (!url?.trim()) return true;

  const lower = url.trim().toLowerCase();
  return (
    lower.includes('localhost') ||
    lower.includes('127.0.0.1') ||
    lower.includes('0.0.0.0')
  );
}

export function resolveMediaUrl(
  url?: string | null,
  fallback: string = PLACEHOLDER_COVER,
): string {
  if (isBrokenMediaUrl(url)) return fallback;
  return url!.trim();
}

export { PLACEHOLDER_AVATAR, PLACEHOLDER_COVER };

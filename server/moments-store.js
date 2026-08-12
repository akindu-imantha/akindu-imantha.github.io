const MOMENTS_KEY = 'portfolio:moments';

function getRedisConfig() {
  return {
    url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN,
  };
}

export function isMomentsStorageConfigured() {
  const { url, token } = getRedisConfig();
  return Boolean(url && token);
}

async function redisPipeline(commands) {
  const { url, token } = getRedisConfig();
  if (!url || !token) throw new Error('Portfolio moments storage is not configured.');

  const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!response.ok) throw new Error(`Portfolio moments storage failed with ${response.status}.`);
  return response.json();
}

function validItem(item) {
  return item && typeof item === 'object' &&
    typeof item.src === 'string' && item.src.length > 0 && item.src.length <= 900000 &&
    typeof item.label === 'string' && item.label.length > 0 && item.label.length <= 80 &&
    typeof item.alt === 'string' && item.alt.length <= 220;
}

function validGallery(item) {
  const gallery = item.gallery ?? [{ src: item.src, alt: item.alt }];
  return Array.isArray(gallery) && gallery.length >= 1 && gallery.length <= 3 &&
    gallery.every((image) => image && typeof image.src === 'string' && image.src.length > 0 && image.src.length <= 900000 && typeof image.alt === 'string' && image.alt.length <= 220);
}

function validMoments(imageBar) {
  return imageBar && typeof imageBar === 'object' &&
    typeof imageBar.title === 'string' && imageBar.title.length <= 100 &&
    typeof imageBar.text === 'string' && imageBar.text.length <= 280 &&
    Array.isArray(imageBar.items) && imageBar.items.length === 4 &&
    imageBar.items.every((item) => validItem(item) && validGallery(item));
}

export async function getStoredMoments() {
  if (!isMomentsStorageConfigured()) return null;
  const result = await redisPipeline([['GET', MOMENTS_KEY]]);
  try {
    const imageBar = JSON.parse(result[0]?.result ?? 'null');
    return validMoments(imageBar) ? imageBar : null;
  } catch { return null; }
}

export async function saveStoredMoments(imageBar) {
  if (!validMoments(imageBar)) {
    const error = new Error('Invalid portfolio moments format.');
    error.status = 400;
    throw error;
  }
  await redisPipeline([['SET', MOMENTS_KEY, JSON.stringify(imageBar)]]);
  return { ok: true, imageBar };
}

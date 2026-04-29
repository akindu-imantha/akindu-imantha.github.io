const contributionCache = new Map();

function setCorsHeaders(request, response) {
  const allowedOrigin = process.env.CORS_ORIGIN;
  const origin = request.headers.origin;

  if (!allowedOrigin || !origin || origin !== allowedOrigin) {
    return;
  }

  response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(response, status, data) {
  response.status(status).json(data);
}

export default async function handler(request, response) {
  setCorsHeaders(request, response);

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  if (request.method !== 'GET') {
    sendJson(response, 405, { message: 'Method not allowed.' });
    return;
  }

  const username = String(request.query.username ?? process.env.GITHUB_USERNAME ?? '').trim();
  const year = Number(request.query.year ?? new Date().getFullYear());

  if (!username || !process.env.GITHUB_TOKEN) {
    sendJson(response, 500, { message: 'GitHub contributions are not configured.' });
    return;
  }

  if (!Number.isInteger(year) || year < 2008 || year > 2100) {
    sendJson(response, 400, { message: 'Invalid contribution year.' });
    return;
  }

  const cacheKey = `${username}-${year}`;
  const cached = contributionCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    sendJson(response, 200, cached.data);
    return;
  }

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  try {
    const githubResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query Contributions($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { username, from, to },
      }),
    });

    const payload = await githubResponse.json();

    if (!githubResponse.ok || payload.errors?.length) {
      sendJson(response, 502, { message: 'GitHub contributions could not be loaded.' });
      return;
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      sendJson(response, 404, { message: 'GitHub user contributions were not found.' });
      return;
    }

    const data = {
      username,
      year,
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };

    contributionCache.set(cacheKey, {
      data,
      expiresAt: Date.now() + 1000 * 60 * 60,
    });

    sendJson(response, 200, data);
  } catch (error) {
    console.error('GitHub contributions failed:', error);
    sendJson(response, 500, { message: 'GitHub contributions could not be loaded.' });
  }
}

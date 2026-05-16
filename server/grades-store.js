const GRADES_KEY = 'portfolio:academic-grades';

function getRedisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  return { url, token };
}

export function isGradesStorageConfigured() {
  const { url, token } = getRedisConfig();
  return Boolean(url && token);
}

async function redisPipeline(commands) {
  const { url, token } = getRedisConfig();

  if (!url || !token) {
    throw new Error('Grades storage is not configured.');
  }

  const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  });

  if (!response.ok) {
    throw new Error(`Grades storage failed with ${response.status}.`);
  }

  return response.json();
}

function validateSubject(subject) {
  return Boolean(
    subject &&
      typeof subject === 'object' &&
      typeof subject.name === 'string' &&
      typeof subject.grade === 'string',
  );
}

function validateAcademicGrades(grades) {
  return Array.isArray(grades) && grades.every((group) => {
    if (!group || typeof group !== 'object') return false;
    if (typeof group.id !== 'string' || typeof group.program !== 'string') return false;
    if (!Array.isArray(group.subjects)) return false;

    const subjectsAreValid = group.subjects.every(validateSubject);
    const semestersAreValid = !group.semesters || (
      Array.isArray(group.semesters) &&
      group.semesters.every((semester) =>
        semester &&
        typeof semester.title === 'string' &&
        Array.isArray(semester.subjects) &&
        semester.subjects.every(validateSubject)
      )
    );

    return subjectsAreValid && semestersAreValid;
  });
}

export async function getStoredAcademicGrades() {
  if (!isGradesStorageConfigured()) {
    return null;
  }

  const results = await redisPipeline([['GET', GRADES_KEY]]);
  const rawGrades = results[0]?.result;

  if (!rawGrades) {
    return null;
  }

  try {
    const grades = JSON.parse(rawGrades);
    return validateAcademicGrades(grades) ? grades : null;
  } catch {
    return null;
  }
}

export async function saveStoredAcademicGrades(grades) {
  if (!validateAcademicGrades(grades)) {
    const error = new Error('Invalid academic grades format.');
    error.status = 400;
    throw error;
  }

  await redisPipeline([['SET', GRADES_KEY, JSON.stringify(grades)]]);

  return { ok: true, academicGrades: grades };
}

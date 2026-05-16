const DEFAULT_ENDPOINT = 'https://akindu-portfolio-api.vercel.app/api/grades';

function getGradesEndpoint() {
  return import.meta.env.VITE_GRADES_API_URL || DEFAULT_ENDPOINT;
}

export async function fetchStoredAcademicGrades() {
  const response = await fetch(getGradesEndpoint());
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Grades could not be loaded.');
  }

  return data.academicGrades ?? null;
}

export async function saveStoredAcademicGrades(token, academicGrades) {
  const response = await fetch(getGradesEndpoint(), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ academicGrades }),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Grades could not be saved.');
  }

  return data.academicGrades;
}

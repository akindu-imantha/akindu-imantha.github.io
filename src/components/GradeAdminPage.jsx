import { ArrowLeft, GraduationCap, Lock, Plus, RefreshCw, Save, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { academicGrades } from '../data/portfolioData';
import { fetchStoredAcademicGrades, saveStoredAcademicGrades } from '../utils/grades';

const TOKEN_KEY = 'portfolio-analytics-token';
const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F', 'Pending'];

function cloneGrades(grades) {
  return JSON.parse(JSON.stringify(grades));
}

function normalizeGrades(grades) {
  return grades.map((group) => ({
    ...group,
    subjects: (group.subjects ?? []).map(normalizeSubject),
    semesters: group.semesters?.map((semester) => ({
      ...semester,
      subjects: (semester.subjects ?? []).map(normalizeSubject),
    })),
  }));
}

function normalizeSubject(subject) {
  const credits = String(subject.credits ?? '').trim();

  return {
    ...subject,
    code: String(subject.code ?? '').trim(),
    name: String(subject.name ?? '').trim(),
    grade: String(subject.grade ?? 'Pending').trim() || 'Pending',
    credits: credits === '' ? '' : Number(credits),
  };
}

function getSubjects(group, semesterTitle) {
  if (!group) return [];

  if (group.semesters?.length) {
    return group.semesters.find((semester) => semester.title === semesterTitle)?.subjects ?? [];
  }

  return group.subjects ?? [];
}

export default function GradeAdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) ?? '');
  const [tokenInput, setTokenInput] = useState(token);
  const [grades, setGrades] = useState(() => cloneGrades(academicGrades));
  const [selectedGroupId, setSelectedGroupId] = useState(academicGrades[0]?.id ?? '');
  const [selectedSemesterTitle, setSelectedSemesterTitle] = useState(academicGrades[0]?.semesters?.[0]?.title ?? '');
  const [status, setStatus] = useState(token ? 'loading' : 'locked');
  const [message, setMessage] = useState('');

  const activeGroupIndex = grades.findIndex((group) => group.id === selectedGroupId);
  const activeGroup = grades[activeGroupIndex] ?? grades[0];
  const activeSemesterTitle = activeGroup?.semesters?.length ? selectedSemesterTitle || activeGroup.semesters[0].title : '';
  const subjects = useMemo(() => getSubjects(activeGroup, activeSemesterTitle), [activeGroup, activeSemesterTitle]);

  const loadGrades = async () => {
    setStatus('loading');
    setMessage('');

    try {
      const storedGrades = await fetchStoredAcademicGrades();
      const nextGrades = cloneGrades(storedGrades?.length ? storedGrades : academicGrades);
      setGrades(nextGrades);
      setSelectedGroupId((currentId) => nextGrades.some((group) => group.id === currentId) ? currentId : nextGrades[0]?.id ?? '');
      setStatus('ready');
      setMessage(storedGrades?.length ? 'Loaded saved website grades.' : 'No saved data yet. Using current portfolio grades.');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadGrades();
    }
  }, []);

  useEffect(() => {
    if (!activeGroup?.semesters?.length) {
      setSelectedSemesterTitle('');
      return;
    }

    const hasSemester = activeGroup.semesters.some((semester) => semester.title === selectedSemesterTitle);

    if (!hasSemester) {
      setSelectedSemesterTitle(activeGroup.semesters[0].title);
    }
  }, [activeGroup, selectedSemesterTitle]);

  const handleUnlock = (event) => {
    event.preventDefault();
    const nextToken = tokenInput.trim();
    setToken(nextToken);
    sessionStorage.setItem(TOKEN_KEY, nextToken);
    loadGrades();
  };

  const updateActiveGroup = (field, value) => {
    setGrades((currentGrades) =>
      currentGrades.map((group) =>
        group.id === selectedGroupId ? { ...group, [field]: value } : group,
      ),
    );
  };

  const updateSubject = (subjectIndex, field, value) => {
    setGrades((currentGrades) =>
      currentGrades.map((group) => {
        if (group.id !== selectedGroupId) return group;

        if (group.semesters?.length) {
          return {
            ...group,
            semesters: group.semesters.map((semester) =>
              semester.title === activeSemesterTitle
                ? {
                    ...semester,
                    subjects: semester.subjects.map((subject, index) =>
                      index === subjectIndex ? { ...subject, [field]: value } : subject,
                    ),
                  }
                : semester,
            ),
          };
        }

        return {
          ...group,
          subjects: group.subjects.map((subject, index) =>
            index === subjectIndex ? { ...subject, [field]: value } : subject,
          ),
        };
      }),
    );
  };

  const addSubject = () => {
    setGrades((currentGrades) =>
      currentGrades.map((group) => {
        if (group.id !== selectedGroupId) return group;

        const nextSubject = { code: '', name: '', grade: 'Pending', credits: group.semesters?.length ? 3 : '' };

        if (group.semesters?.length) {
          return {
            ...group,
            semesters: group.semesters.map((semester) =>
              semester.title === activeSemesterTitle
                ? { ...semester, subjects: [...semester.subjects, nextSubject] }
                : semester,
            ),
          };
        }

        return { ...group, subjects: [...group.subjects, nextSubject] };
      }),
    );
  };

  const removeSubject = (subjectIndex) => {
    setGrades((currentGrades) =>
      currentGrades.map((group) => {
        if (group.id !== selectedGroupId) return group;

        if (group.semesters?.length) {
          return {
            ...group,
            semesters: group.semesters.map((semester) =>
              semester.title === activeSemesterTitle
                ? { ...semester, subjects: semester.subjects.filter((_, index) => index !== subjectIndex) }
                : semester,
            ),
          };
        }

        return { ...group, subjects: group.subjects.filter((_, index) => index !== subjectIndex) };
      }),
    );
  };

  const resetToFileData = () => {
    const nextGrades = cloneGrades(academicGrades);
    setGrades(nextGrades);
    setSelectedGroupId(nextGrades[0]?.id ?? '');
    setSelectedSemesterTitle(nextGrades[0]?.semesters?.[0]?.title ?? '');
    setStatus('ready');
    setMessage('Reset editor to current file data. Save to publish it.');
  };

  const saveGrades = async () => {
    if (!token) {
      setStatus('error');
      setMessage('Admin token is required.');
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      const savedGrades = await saveStoredAcademicGrades(token, normalizeGrades(grades));
      setGrades(cloneGrades(savedGrades));
      setStatus('ready');
      setMessage('Grades saved. Public grade pages now use this table data.');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <main className="grade-admin-page">
      <header className="grade-admin-header">
        <div className="grade-admin-nav">
          <a href="#analytics" className="secondary-button">
            <ArrowLeft size={17} />
            <span>Analytics</span>
          </a>
          <a href="#grades" className="secondary-button">
            <GraduationCap size={17} />
            <span>Public grades</span>
          </a>
        </div>
        <div>
          <p className="eyebrow">Private grade editor</p>
          <h1>Website Degree Grades</h1>
          <p>Update module codes, titles, credits, and grades using table fields instead of editing JSON.</p>
        </div>
      </header>

      <form className="analytics-auth grade-admin-auth" onSubmit={handleUnlock}>
        <Lock size={18} />
        <input
          type="password"
          value={tokenInput}
          onChange={(event) => setTokenInput(event.target.value)}
          placeholder="Admin token"
          aria-label="Admin token"
        />
        <button type="submit" className="primary-button">
          Unlock
        </button>
        <button type="button" className="secondary-button" onClick={loadGrades} disabled={status === 'loading' || status === 'saving'}>
          <RefreshCw size={16} />
          <span>Load</span>
        </button>
      </form>

      {message ? (
        <p className={`analytics-state${status === 'error' ? ' analytics-state--error' : ''}`}>
          {message}
        </p>
      ) : null}

      <section className="grade-admin-workspace">
        <aside className="grade-admin-sidebar">
          <label>
            <span>Degree / qualification</span>
            <select value={selectedGroupId} onChange={(event) => setSelectedGroupId(event.target.value)}>
              {grades.map((group) => (
                <option value={group.id} key={group.id}>
                  {group.program}
                </option>
              ))}
            </select>
          </label>

          {activeGroup?.semesters?.length ? (
            <label>
              <span>Semester</span>
              <select value={activeSemesterTitle} onChange={(event) => setSelectedSemesterTitle(event.target.value)}>
                {activeGroup.semesters.map((semester) => (
                  <option value={semester.title} key={semester.title}>
                    {semester.title}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <label>
            <span>Status</span>
            <input value={activeGroup?.status ?? ''} onChange={(event) => updateActiveGroup('status', event.target.value)} />
          </label>
          <label>
            <span>Summary</span>
            <textarea value={activeGroup?.summary ?? ''} onChange={(event) => updateActiveGroup('summary', event.target.value)} />
          </label>
        </aside>

        <section className="grade-admin-table-panel">
          <div className="grade-admin-table-heading">
            <div>
              <p className="eyebrow">{activeGroup?.institution}</p>
              <h2>{activeGroup?.program}</h2>
            </div>
            <div className="grade-admin-actions">
              <button type="button" className="secondary-button" onClick={addSubject}>
                <Plus size={16} />
                <span>Add row</span>
              </button>
              <button type="button" className="secondary-button" onClick={resetToFileData} disabled={status === 'saving'}>
                Reset
              </button>
              <button type="button" className="primary-button" onClick={saveGrades} disabled={status === 'saving'}>
                <Save size={16} />
                <span>{status === 'saving' ? 'Saving...' : 'Save website grades'}</span>
              </button>
            </div>
          </div>

          <div className="grade-admin-table-wrap">
            <table className="grade-admin-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Module / subject</th>
                  <th>Grade</th>
                  <th>Credits</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={`${activeSemesterTitle || selectedGroupId}-${index}`}>
                    <td>
                      <input value={subject.code ?? ''} onChange={(event) => updateSubject(index, 'code', event.target.value)} />
                    </td>
                    <td>
                      <input value={subject.name ?? ''} onChange={(event) => updateSubject(index, 'name', event.target.value)} />
                    </td>
                    <td>
                      <select value={subject.grade ?? 'Pending'} onChange={(event) => updateSubject(index, 'grade', event.target.value)}>
                        {gradeOptions.map((grade) => (
                          <option value={grade} key={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={subject.credits ?? ''}
                        onChange={(event) => updateSubject(index, 'credits', event.target.value)}
                      />
                    </td>
                    <td>
                      <button type="button" className="grade-admin-icon-button" onClick={() => removeSubject(index)} aria-label="Remove row">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

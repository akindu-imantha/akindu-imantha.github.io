import { ArrowLeft, FileText, GraduationCap, Image as ImageIcon, Lock, Plus, RefreshCw, Save, Trash2, Upload } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { academicGrades, certifications } from '../data/portfolioData';
import { fetchAnalyticsSummary } from '../utils/analytics';
import { fetchStoredAcademicGrades, saveStoredAcademicGrades } from '../utils/grades';
import { deleteStoredCertificate, fetchStoredCertificates, uploadStoredCertificate } from '../utils/certificates';

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
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [certificateDrafts, setCertificateDrafts] = useState({});
  const [certificateMessage, setCertificateMessage] = useState('');
  const [certificateStatus, setCertificateStatus] = useState('idle');

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

  const loadCertificates = async () => {
    setCertificateStatus('saving');
    setCertificateMessage('Loading certificates…');
    try {
      const result = await fetchStoredCertificates();
      setCertificates(result.certificates ?? []);
      setCertificateStatus('ready');
      setCertificateMessage('');
    } catch (error) {
      setCertificateMessage(error.message);
      setCertificateStatus('error');
    }
  };

  const unlockEditor = async (nextToken) => {
    if (!nextToken) {
      setIsUnlocked(false);
      setStatus('locked');
      setMessage('Admin token is required before editing grades.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      await fetchAnalyticsSummary(nextToken);
      setToken(nextToken);
      setIsUnlocked(true);
      sessionStorage.setItem(TOKEN_KEY, nextToken);
      await loadGrades();
      await loadCertificates();
    } catch (error) {
      setIsUnlocked(false);
      sessionStorage.removeItem(TOKEN_KEY);
      setToken('');
      setStatus('error');
      setMessage(error.message || 'Invalid admin token.');
    }
  };

  useEffect(() => {
    if (token) {
      unlockEditor(token);
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
    unlockEditor(nextToken);
  };

  const selectCertificateFile = (courseName, event) => {
    const file = event.target.files?.[0];
    setCertificateDrafts((current) => ({ ...current, [courseName]: { file: null, preview: '', isPdf: false } }));
    if (!file) return;
    if (!['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setCertificateMessage(`Choose a PDF, JPG, PNG, or WebP file for ${courseName}.`);
      setCertificateStatus('error');
      event.target.value = '';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setCertificateMessage('Each certificate must be 10 MB or smaller.');
      setCertificateStatus('error');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result ?? '');
      setCertificateDrafts((current) => ({ ...current, [courseName]: { file, preview: dataUrl, isPdf: file.type === 'application/pdf' } }));
      setCertificateMessage(`Preview ready for ${courseName}. Upload it when ready.`);
      setCertificateStatus('ready');
    };
    reader.onerror = () => {
      setCertificateMessage('The selected file could not be read.');
      setCertificateStatus('error');
    };
    reader.readAsDataURL(file);
  };

  const uploadCertificate = async (courseName, event) => {
    event.preventDefault();
    const draft = certificateDrafts[courseName];
    if (!isUnlocked || !draft?.file) return;
    setCertificateStatus('saving');
    setCertificateMessage(`Uploading ${courseName} certificate…`);
    try {
      const result = await uploadStoredCertificate(token, courseName, draft.file);
      setCertificates(result.certificates ?? []);
      setCertificateDrafts((current) => ({ ...current, [courseName]: { file: null, preview: '', isPdf: false } }));
      setCertificateMessage(`${courseName} certificate uploaded and added to the public Education section.`);
      setCertificateStatus('ready');
      const fileInput = document.getElementById(`certificate-file-${certifications.findIndex((course) => course.name === courseName)}`);
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setCertificateMessage(error.message);
      setCertificateStatus('error');
    }
  };

  const removeCertificate = async (id) => {
    setCertificateStatus('saving');
    setCertificateMessage('Removing certificate…');
    try {
      const result = await deleteStoredCertificate(token, id);
      setCertificates(result.certificates ?? []);
      setCertificateMessage('Certificate removed.');
      setCertificateStatus('ready');
    } catch (error) {
      setCertificateMessage(error.message);
      setCertificateStatus('error');
    }
  };

  const updateActiveGroup = (field, value) => {
    if (!isUnlocked) return;

    setGrades((currentGrades) =>
      currentGrades.map((group) =>
        group.id === selectedGroupId ? { ...group, [field]: value } : group,
      ),
    );
  };

  const updateSubject = (subjectIndex, field, value) => {
    if (!isUnlocked) return;

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
    if (!isUnlocked) return;

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
    if (!isUnlocked) return;

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
    if (!isUnlocked) return;

    const nextGrades = cloneGrades(academicGrades);
    setGrades(nextGrades);
    setSelectedGroupId(nextGrades[0]?.id ?? '');
    setSelectedSemesterTitle(nextGrades[0]?.semesters?.[0]?.title ?? '');
    setStatus('ready');
    setMessage('Reset editor to current file data. Save to publish it.');
  };

  const saveGrades = async () => {
    if (!isUnlocked || !token) {
      setStatus('error');
      setMessage('Unlock the grade editor before saving changes.');
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
          <a href="#education" className="secondary-button">
            <ImageIcon size={17} />
            <span>Education</span>
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
        <button type="button" className="secondary-button" onClick={loadGrades} disabled={!isUnlocked || status === 'loading' || status === 'saving'}>
          <RefreshCw size={16} />
          <span>Load</span>
        </button>
      </form>

      {!isUnlocked ? (
        <p className="grade-admin-locked">
          Unlock with the admin token to edit or save grade data.
        </p>
      ) : null}

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
            <input disabled={!isUnlocked} value={activeGroup?.status ?? ''} onChange={(event) => updateActiveGroup('status', event.target.value)} />
          </label>
          <label>
            <span>Summary</span>
            <textarea disabled={!isUnlocked} value={activeGroup?.summary ?? ''} onChange={(event) => updateActiveGroup('summary', event.target.value)} />
          </label>
        </aside>

        <section className="grade-admin-table-panel">
          <div className="grade-admin-table-heading">
            <div>
              <p className="eyebrow">{activeGroup?.institution}</p>
              <h2>{activeGroup?.program}</h2>
            </div>
            <div className="grade-admin-actions">
              <button type="button" className="secondary-button" onClick={addSubject} disabled={!isUnlocked}>
                <Plus size={16} />
                <span>Add row</span>
              </button>
              <button type="button" className="secondary-button" onClick={resetToFileData} disabled={!isUnlocked || status === 'saving'}>
                Reset
              </button>
              <button type="button" className="primary-button" onClick={saveGrades} disabled={!isUnlocked || status === 'saving'}>
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
                    <td data-label="Code">
                      <input disabled={!isUnlocked} value={subject.code ?? ''} onChange={(event) => updateSubject(index, 'code', event.target.value)} />
                    </td>
                    <td data-label="Module">
                      <input disabled={!isUnlocked} value={subject.name ?? ''} onChange={(event) => updateSubject(index, 'name', event.target.value)} />
                    </td>
                    <td data-label="Grade">
                      <select disabled={!isUnlocked} value={subject.grade ?? 'Pending'} onChange={(event) => updateSubject(index, 'grade', event.target.value)}>
                        {gradeOptions.map((grade) => (
                          <option value={grade} key={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td data-label="Credits">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={subject.credits ?? ''}
                        disabled={!isUnlocked}
                        onChange={(event) => updateSubject(index, 'credits', event.target.value)}
                      />
                    </td>
                    <td data-label="Remove">
                      <button type="button" className="grade-admin-icon-button" onClick={() => removeSubject(index)} disabled={!isUnlocked} aria-label="Remove row">
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

      <section className="certificate-admin-panel" aria-labelledby="certificate-admin-title">
        <div className="grade-admin-table-heading">
          <div>
            <p className="eyebrow">Academic documents</p>
            <h2 id="certificate-admin-title">Certificates</h2>
            <p>Upload a PDF or image (up to 10 MB). Files are stored in the portfolio cloud folder.</p>
          </div>
          <button type="button" className="secondary-button" onClick={loadCertificates} disabled={!isUnlocked || certificateStatus === 'saving'}>
            <RefreshCw size={16} />
            <span>Load certificates</span>
          </button>
        </div>
        <div className="certificate-upload-grid">
          {certifications.map((course, index) => {
            const existing = certificates.find((certificate) => certificate.name === course.name);
            const draft = certificateDrafts[course.name];
            const fileId = `certificate-file-${index}`;
            return (
              <form className="certificate-course-upload" key={course.name} onSubmit={(event) => uploadCertificate(course.name, event)}>
                <div className="certificate-course-heading">
                  <span className="certificate-course-number">{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{course.name}</h3><p>{existing ? 'Certificate uploaded' : 'Certificate placeholder'}</p></div>
                </div>
                <input id={fileId} type="file" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={(event) => selectCertificateFile(course.name, event)} disabled={!isUnlocked || certificateStatus === 'saving'} />
                <label className="certificate-file-label" htmlFor={fileId}><Upload size={17} /> {draft?.file ? 'Choose another file' : 'Choose certificate file'}</label>
                {draft?.preview ? <div className="certificate-upload-preview">{draft.isPdf ? <iframe src={draft.preview} title={`${course.name} certificate preview`} /> : <img src={draft.preview} alt={`${course.name} certificate preview`} />}</div> : existing ? <a className="certificate-existing-preview" href={existing.url} target="_blank" rel="noreferrer">{existing.type === 'image' ? <img src={existing.url} alt={`${course.name} certificate`} /> : <span><FileText size={30} /> Preview PDF</span>}</a> : <div className="certificate-placeholder"><FileText size={28} /><span>Certificate preview will appear here</span></div>}
                <button type="submit" className="primary-button" disabled={!isUnlocked || !draft?.file || certificateStatus === 'saving'}><Upload size={16} /><span>Upload certificate</span></button>
              </form>
            );
          })}
        </div>
        {certificateMessage ? <p className={`analytics-state${certificateStatus === 'error' ? ' analytics-state--error' : ''}`} role="status">{certificateMessage}</p> : null}
        <div className="certificate-admin-list">
          {certificates.filter((certificate) => !certifications.some((course) => course.name === certificate.name)).map((certificate) => (
            <article className="certificate-admin-item" key={certificate.id}>
              {certificate.type === 'image' ? <img src={certificate.url} alt="" /> : <FileText size={28} aria-hidden="true" />}
              <div><h3>{certificate.name}</h3><a href={certificate.url} target="_blank" rel="noreferrer">Open certificate</a></div>
              <button type="button" className="grade-admin-icon-button" onClick={() => removeCertificate(certificate.id)} disabled={certificateStatus === 'saving'} aria-label={`Delete ${certificate.name}`}><Trash2 size={16} /></button>
            </article>
          ))}
          {isUnlocked && certificateStatus === 'ready' && certificates.length === 0 ? <p className="analytics-empty">No certificates have been uploaded yet.</p> : null}
        </div>
      </section>
    </main>
  );
}

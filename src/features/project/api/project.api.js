import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../../shared/services/firebase';

function currentUserId() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Sign in to access your projects.');
  return uid;
}

function projectCollection(uid = currentUserId()) {
  return collection(db, 'users', uid, 'projects');
}

function toProject(snapshot, uid = currentUserId()) {
  const data = snapshot.data();
  const subjectArea = data.subjectArea ?? data.subjectAreaId ?? '';
  const keywords = Array.isArray(data.keywords) ? data.keywords : [];
  const createdAt = data.createdAt?.toDate?.()?.toISOString() || data.createdAt || null;
  const updatedAt = data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt || null;
  return {
    id: snapshot.id,
    project_id: snapshot.id,
    owner_id: uid,
    title: data.title,
    subjectArea,
    subject_area: { name: subjectArea },
    keywords,
    watch_keywords: keywords.map((keyword) => ({ keyword })),
    status: String(data.status || 'draft').toUpperCase(),
    analysisStatus: data.analysisStatus || 'not_started',
    analysisSummary: data.analysisSummary || null,
    createdAt,
    created_at: createdAt,
    updatedAt,
    updated_at: updatedAt,
  };
}

export async function getProjectsApi() {
  const uid = currentUserId();
  const projectsQuery = query(projectCollection(uid), orderBy('createdAt', 'desc'));
  const result = await getDocs(projectsQuery);
  return result.docs.map((snapshot) => toProject(snapshot, uid));
}

export async function createProjectApi(data) {
  const uid = currentUserId();
  const reference = doc(projectCollection(uid));
  const now = serverTimestamp();
  const project = {
    title: data.title.trim(),
    subjectArea: data.subjectArea.trim(),
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    status: 'active',
    analysisStatus: 'not_started',
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(reference, project);
  const created = await getDoc(reference);
  return toProject(created, uid);
}

export async function getProjectByIdApi(id) {
  const uid = currentUserId();
  const snapshot = await getDoc(doc(db, 'users', uid, 'projects', String(id)));
  if (!snapshot.exists()) throw new Error('Project not found.');
  return toProject(snapshot, uid);
}

export async function updateProjectApi(id, data) {
  const uid = currentUserId();
  const reference = doc(db, 'users', uid, 'projects', String(id));
  const updates = {
    updatedAt: serverTimestamp(),
  };
  if (typeof data.title === 'string') updates.title = data.title.trim();
  if (typeof data.subjectArea === 'string') updates.subjectArea = data.subjectArea.trim();
  if (Array.isArray(data.keywords)) updates.keywords = data.keywords;

  await updateDoc(reference, updates);
  return getProjectByIdApi(id);
}

export async function saveProjectAnalysisApi(id, analysisSummary) {
  const uid = currentUserId();
  const reference = doc(db, 'users', uid, 'projects', String(id));
  await updateDoc(reference, {
    analysisStatus: analysisSummary.status || 'complete',
    analysisSummary,
    updatedAt: serverTimestamp(),
  });
  return getProjectByIdApi(id);
}

export async function deleteProjectApi(id) {
  const uid = currentUserId();
  await deleteDoc(doc(db, 'users', uid, 'projects', String(id)));
  return { id: String(id) };
}

// Legacy screens still import these names; their old-only features are not migrated yet.
export const getProjectOverviewApi = () => Promise.reject(new Error('Project overview is not migrated yet.'));
export const getRelatedArticlesApi = () => Promise.reject(new Error('Related articles are not migrated yet.'));
export const getProjectAnalyticsApi = () => Promise.reject(new Error('Project analytics is not migrated yet.'));
export const getTrendingKeywordsApi = () => Promise.reject(new Error('Trending keywords are not migrated yet.'));
export const getWatchedKeywordArticlesApi = () => Promise.reject(new Error('Watched keyword articles are not migrated yet.'));
export const watchKeywordsApi = () => Promise.reject(new Error('Keyword tracking is not migrated yet.'));
export const updateWatchedKeywordsApi = () => Promise.reject(new Error('Keyword tracking is not migrated yet.'));
export const unwatchKeywordApi = () => Promise.reject(new Error('Keyword tracking is not migrated yet.'));
export const restoreProjectApi = () => Promise.reject(new Error('Project restore is not supported.'));
export const activateProjectApi = () => Promise.reject(new Error('Project activation is not migrated yet.'));
export const getProjectMembersApi = () => Promise.reject(new Error('Project members are not migrated yet.'));
export const inviteProjectMemberApi = () => Promise.reject(new Error('Project invitations are not migrated yet.'));
export const updateProjectMemberRoleApi = () => Promise.reject(new Error('Project members are not migrated yet.'));
export const removeProjectMemberApi = () => Promise.reject(new Error('Project members are not migrated yet.'));
export const acceptProjectInviteApi = () => Promise.reject(new Error('Project invitations are not migrated yet.'));

import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { LeaderboardEntry } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
}

const COLLECTION_PATH = 'leaderboard';

// Default friendly peer records so leaderboard is engaging immediately
export const INITIAL_PEER_ENTRIES: LeaderboardEntry[] = [
  {
    id: 'seed-1',
    userName: '김별하 (5학년)',
    score: 850,
    wordsMastered: 48,
    quizzesSolved: 12,
    streak: 7,
    tier: '👑 영어 마스터',
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'seed-2',
    userName: '이하준 (6학년)',
    score: 720,
    wordsMastered: 42,
    quizzesSolved: 10,
    streak: 5,
    tier: '🌟 쑥쑥 모험가',
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'seed-3',
    userName: '영어꿈나무지우',
    score: 580,
    wordsMastered: 35,
    quizzesSolved: 8,
    streak: 4,
    tier: '🌱 무럭무럭 새싹',
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'seed-4',
    userName: '레벨업민수',
    score: 450,
    wordsMastered: 28,
    quizzesSolved: 6,
    streak: 3,
    tier: '🌱 무럭무럭 새싹',
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'seed-5',
    userName: '단어왕서연 (5학년)',
    score: 320,
    wordsMastered: 20,
    quizzesSolved: 5,
    streak: 2,
    tier: '🐣 첫걸음 탐험대',
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

/**
 * Subscribe to real-time leaderboard entries from Google Firestore
 */
export function subscribeToLeaderboard(
  onUpdate: (entries: LeaderboardEntry[]) => void,
  onError?: (err: Error) => void
): () => void {
  try {
    const q = query(
      collection(db, COLLECTION_PATH),
      orderBy('score', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          // If Firestore is still empty, show initial peer records
          onUpdate(INITIAL_PEER_ENTRIES);
          return;
        }

        const entries: LeaderboardEntry[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          entries.push({
            id: docSnap.id,
            userName: data.userName || '알 수 없음',
            score: typeof data.score === 'number' ? data.score : 0,
            wordsMastered: typeof data.wordsMastered === 'number' ? data.wordsMastered : 0,
            quizzesSolved: typeof data.quizzesSolved === 'number' ? data.quizzesSolved : 0,
            streak: typeof data.streak === 'number' ? data.streak : 1,
            tier: data.tier || '새싹 탐험대',
            updatedAt: data.updatedAt || new Date().toISOString(),
            userId: data.userId
          });
        });

        // Ensure peers are included if count is low for lively experience
        if (entries.length < INITIAL_PEER_ENTRIES.length) {
          const existingIds = new Set(entries.map((e) => e.id));
          const combined = [
            ...entries,
            ...INITIAL_PEER_ENTRIES.filter((p) => !existingIds.has(p.id))
          ].sort((a, b) => b.score - a.score);
          onUpdate(combined);
        } else {
          onUpdate(entries);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, COLLECTION_PATH);
        // Fallback to local peers on network wait
        onUpdate(INITIAL_PEER_ENTRIES);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, COLLECTION_PATH);
    onUpdate(INITIAL_PEER_ENTRIES);
    return () => {};
  }
}

/**
 * Register or update a student's score in real-time Firestore database
 */
export async function saveLeaderboardEntry(entry: LeaderboardEntry): Promise<boolean> {
  const docId = entry.id || `student-${Date.now()}`;
  const path = `${COLLECTION_PATH}/${docId}`;

  try {
    const payload = {
      id: docId,
      userName: entry.userName.trim().slice(0, 30),
      score: Math.min(Math.max(entry.score, 0), 100000),
      wordsMastered: Math.max(entry.wordsMastered, 0),
      quizzesSolved: Math.max(entry.quizzesSolved, 0),
      streak: Math.max(entry.streak, 1),
      tier: (entry.tier || '새싹 탐험대').slice(0, 30),
      updatedAt: new Date().toISOString(),
      ...(auth.currentUser?.uid ? { userId: auth.currentUser.uid } : {})
    };

    await setDoc(doc(db, COLLECTION_PATH, docId), payload, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return false;
  }
}

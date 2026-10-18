import type { LoginDto, SessionUser } from '@/api/auth/types';
import type { TaskDto } from '@/api/tasks/types';
import { canViewTask } from '@/lib/auth/permissions';
import { clearAuthSession, saveAuthSession } from '@/lib/auth/session';
import { sessionStorageAccess } from '@/lib/storage';

import { demoAccounts } from '../fixtures/accounts';

const key = 'virgo-pro.mock-tokens';
type RecordEntry = { userId: string; expiresAt: string };

let tokens: Record<string, RecordEntry> = {};
let memoryOnly = false;

function readTokens() {
  if (memoryOnly) return tokens;

  try {
    const stored = sessionStorageAccess.get(key);

    if (!stored.ok) return tokens;

    const saved = JSON.parse(stored.value ?? '{}');

    if (saved && typeof saved === 'object' && !Array.isArray(saved)) tokens = saved;
  } catch {}

  return tokens;
}

function saveTokens() {
  const saved =
    Object.keys(tokens).length === 0
      ? sessionStorageAccess.remove(key)
      : sessionStorageAccess.set(key, JSON.stringify(tokens));

  memoryOnly = !saved;
}

export function createSession(user: SessionUser): LoginDto {
  readTokens();

  const accessToken = `virgo-demo-${crypto.randomUUID()}`;
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
  tokens[accessToken] = { userId: user.id, expiresAt };
  saveTokens();

  return { authenticated: true, user, accessToken, expiresAt };
}

export function requestUser(request: Request): SessionUser | undefined {
  const authorization = request.headers.get('authorization');

  if (!authorization?.startsWith('Bearer ')) return undefined;

  const record = readTokens()[authorization.slice(7)];

  if (
    !record ||
    !Number.isFinite(Date.parse(record.expiresAt)) ||
    Date.parse(record.expiresAt) <= Date.now()
  )
    return undefined;

  return demoAccounts.find((user) => user.id === record.userId);
}

export function revokeSession(request?: Request) {
  if (request) {
    readTokens();
    delete tokens[(request.headers.get('authorization') ?? '').slice(7)];
  } else tokens = {};

  saveTokens();
}

export function resetSession() {
  revokeSession();
  clearAuthSession();
  const session = createSession(demoAccounts[0]!);
  saveAuthSession(session);

  return session;
}

export const scopedTasks = (tasks: readonly TaskDto[], request: Request) =>
  tasks.filter((task) => canViewTask(requestUser(request), task));

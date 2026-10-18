import 'server-only';

import type { LoginDto, SessionUser } from '@/api/auth/types';
import type { TaskDto } from '@/api/tasks/types';
import { canViewTask } from '@/lib/auth/permissions';

import { demoAccounts } from '../fixtures/accounts';
import { getDemoSandbox } from '../runtime/context';

export function createSession(user: SessionUser): LoginDto {
  const { tokens } = getDemoSandbox();
  for (const [token, record] of tokens)
    if (Date.parse(record.expiresAt) <= Date.now()) tokens.delete(token);
  const accessToken = `virgo-demo-${crypto.randomUUID()}`;
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
  tokens.set(accessToken, { userId: user.id, expiresAt });
  return { authenticated: true, user, accessToken, expiresAt };
}

export function requestUser(request: Request): SessionUser | undefined {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) return undefined;
  const record = getDemoSandbox().tokens.get(authorization.slice(7));
  if (
    !record ||
    !Number.isFinite(Date.parse(record.expiresAt)) ||
    Date.parse(record.expiresAt) <= Date.now()
  )
    return undefined;
  return demoAccounts.find((user) => user.id === record.userId);
}

export function revokeSession(request?: Request) {
  const { tokens } = getDemoSandbox();
  if (request) tokens.delete((request.headers.get('authorization') ?? '').slice(7));
  else tokens.clear();
}

export const scopedTasks = (tasks: readonly TaskDto[], request: Request) =>
  tasks.filter((task) => canViewTask(requestUser(request), task));

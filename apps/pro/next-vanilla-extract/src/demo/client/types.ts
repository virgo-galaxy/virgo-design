import type { SessionUser } from '@/api/auth/types';

export interface DemoAccountsDto {
  accounts: SessionUser[];
  password: string;
}

import { createContext, useContext } from 'react';

import type { LoginRequest } from '@/api/auth/types';

export const LoginFormContext = createContext<{
  credentials: LoginRequest;
  pending: boolean;
  setCredentials: (credentials: LoginRequest) => void;
} | null>(null);

export function useLoginForm() {
  const form = useContext(LoginFormContext);

  if (!form) throw new Error('Login form content must be inside LoginForm');

  return form;
}

import type { API_ERROR_CODES } from './constants';

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

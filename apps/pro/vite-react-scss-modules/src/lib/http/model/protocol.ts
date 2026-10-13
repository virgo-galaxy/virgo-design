export const API_SUCCESS_CODE = 0;
export const API_SUCCESS_MSG = 'success';
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}
export interface ApiErrorData {
  detail: string;
  fields?: Record<string, string[]>;
  source?: { file?: string; function?: string; line?: number };
  timestamp: string;
}
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function isApiResponse(value: unknown): value is ApiResponse<unknown> {
  return (
    isRecord(value) &&
    Number.isInteger(value.code) &&
    typeof value.msg === 'string' &&
    Object.hasOwn(value, 'data')
  );
}
export function isApiErrorData(value: unknown): value is ApiErrorData {
  if (
    !isRecord(value) ||
    typeof value.detail !== 'string' ||
    typeof value.timestamp !== 'string' ||
    !Number.isFinite(Date.parse(value.timestamp))
  )
    return false;
  if (
    value.fields !== undefined &&
    (!isRecord(value.fields) ||
      !Object.values(value.fields).every(
        (v) => Array.isArray(v) && v.every((message) => typeof message === 'string'),
      ))
  )
    return false;
  if (value.source !== undefined) {
    if (!isRecord(value.source)) return false;
    const source = value.source;
    if (
      (source.file !== undefined && typeof source.file !== 'string') ||
      (source.function !== undefined && typeof source.function !== 'string') ||
      (source.line !== undefined && (!Number.isInteger(source.line) || Number(source.line) < 0))
    )
      return false;
  }
  return true;
}
